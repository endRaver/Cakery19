import FullpageLoader from "@/components/FullpageLoader";
import { useUserStore } from "@/stores/useUserStore";
import { ReactNode, useEffect, useRef } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { handleCheckAuth, checkingAuth } = useUserStore();
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    if (!hasCheckedAuth.current) {
      handleCheckAuth();
      hasCheckedAuth.current = true;
    }
  }, [handleCheckAuth]);

  useEffect(() => {
    if (checkingAuth) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function to ensure scroll is re-enabled if component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [checkingAuth]);

  if (checkingAuth) return <FullpageLoader />;

  return <div>{children}</div>;
};

export default AuthProvider;
