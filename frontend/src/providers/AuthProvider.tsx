import FullpageLoader from "@/components/FullpageLoader";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
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
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const token = await getToken();
        if (!isMounted) return;

        updateApiToken(token);

        if (token) {
          await checkAdminStatus();
          // init socket
          if (userId) initSocket(userId);
        }
      } catch (error) {
        if (!isMounted) return;
        updateApiToken(null);
        console.log("Error in auth provider", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();
    // clean up
    return () => {
      isMounted = false;
      disconnectSocket();
    };
  }, [checkAdminStatus, disconnectSocket, getToken, initSocket, userId]);

  if (loading) return <FullpageLoader />;

  return <div>{children}</div>;
};

export default AuthProvider;
