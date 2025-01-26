import FullpageLoader from "@/components/FullpageLoader";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const syncAttempted = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempted.current) return;

      try {
        syncAttempted.current = true;

        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log("Error in auth callback", error);
      } finally {
        navigate("/", { replace: true });
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);

  return <FullpageLoader />;
};

export default AuthCallbackPage;
