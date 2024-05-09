import Loader from "@/components/Loader";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SiMonkeytie } from "react-icons/si";
import { useMutation } from "@apollo/client";
import { REQUEST_PASSWORD_RESET_MUTATION } from "@/graphql/mutation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import useRedirectToHomeIfAuthenticated from "@/hooks/withAuth";
import BouncingLoader from "@/components/BouncingLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: session } = useSession();
  const { token } = useSelector((state: any) => state.user);
  console.log({ session, token });

  const [requestPasswordReset] = useMutation(REQUEST_PASSWORD_RESET_MUTATION);

  const router = useRouter();

  const isLoading = useRedirectToHomeIfAuthenticated();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email) {
      return;
    }

    try {
      setLoading(true);
      await requestPasswordReset({
        variables: { email },
      });
      router.push({
        pathname: "/password-reset-link",
        query: { email },
      });
      setLoading(false);
    } catch (error: any) {
      window.scrollTo(0, 0);
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
    setLoading(false);
  };
  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <BouncingLoader />
      </div>
    );
  }
  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <div className="w-[60px] mx-auto mt-16 h-[60px] bg-neutral-200 rounded-[50%] flex items-center justify-center">
          <SiMonkeytie color="#4338ca" size={30} />
        </div>
        <h2 className="mt-3 mb-2  flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot Password?
        </h2>
        {errorMessage && (
          <div className="flex max-w-md mx-auto my-3 rounded-lg bg-red-50 border border-red-400 text-red-700 dark:text-white dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-4 hover:translate-y-[-2px]">
            <span className="block sm:inline">
              {errorMessage && errorMessage}
            </span>
          </div>
        )}
        <p className="text-center mb-10 text-neutral-700 dark:text-neutral-300">
          No worries, we&apos;ll send you reset instructions
        </p>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                className="mt-1"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <ButtonPrimary type="submit">
              {" "}
              {loading ? <Loader /> : "Reset password"}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link href="/signup" className="font-semibold underline">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
