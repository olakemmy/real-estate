import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

const useRedirectToHomeIfAuthenticated = () => {
  const { data: session } = useSession();
  const { token } = useSelector((state: any) => state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session || token) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [session, token, router]);

  return isLoading;
};
export default useRedirectToHomeIfAuthenticated;
