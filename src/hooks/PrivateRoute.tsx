import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BouncingLoader from "@/components/BouncingLoader";
import { useSession } from "next-auth/react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useSelector((state: any) => state.user.token);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && !token && !session) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(
        router.asPath
      )}`;
      console.log({ redirectUrl, status });

      router.replace(redirectUrl, undefined, { shallow: true });
    } else {
      setLoading(false);
    }
  }, [token, session, router, status]);


  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <BouncingLoader />
      </div>
    );
  }
  return <>{children}</>;
};

export default PrivateRoute;
