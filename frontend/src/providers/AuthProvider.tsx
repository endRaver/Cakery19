import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { ReactNode, useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);

        if (token) {
          // TODO: update user profile
        }
      } catch (error) {
        updateApiToken(null);
        console.log("Error in auth provider", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [getToken]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-ping rounded-full bg-primary-500 p-8 duration-1000">
          <img src="/images/cakery_logo_light.svg" className="size-20" alt="logo" />
        </div>
      </div>
    );

  return <div>{children}</div>;
};

export default AuthProvider;
