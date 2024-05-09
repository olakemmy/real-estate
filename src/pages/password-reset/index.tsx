import Loader from "@/components/Loader";
import { RESET_PASSWORD_MUTATION } from "@/graphql/mutation";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SiMonkeytie } from "react-icons/si";
import jwt_decode from "jwt-decode";
import BouncingLoader from "@/components/BouncingLoader";
import useRedirectToHomeIfAuthenticated from "@/hooks/withAuth";

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const router = useRouter();
  const { email, token } = router.query;

  const isLoading = useRedirectToHomeIfAuthenticated();

  useEffect(() => {
    const isTokenExpired = () => {
      if (token) {
        try {
          const decodedToken: any = jwt_decode(token as string);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            setTokenExpired(true);
            setErrorMessage(
              "Your password reset link has expired. Please request a new one."
            );
          }
        } catch (error) {
          setErrorMessage("Invalid password reset link.");
        }
      }
    };
    isTokenExpired();
  }, [token]);

  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    try {
      setLoading(true);

      if (token) {
        const decodedToken: any = jwt_decode(token as string);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setErrorMessage(
            "Your password reset link has expired. Please request a new one."
          );
          setLoading(false);
          setTokenExpired(true);

          return;
        }
      }

      await resetPassword({
        variables: { email, password, confirmPassword },
      });

      router.push("/password-reset-success");
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
          <SiMonkeytie color="#3270FC" size={30} />
        </div>
        <h2 className="mt-3 mb-6  flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          {tokenExpired ? "Password reset" : "Set new password"}
        </h2>
        {errorMessage && (
          <div className="flex flex-col max-w-md mx-auto my-3 rounded-lg bg-red-50 border border-red-500 text-red-800 dark:text-white dark:bg-red-800 px-4 py-3 transform transition-transform sm:px-4 hover:translate-y-[-2px]">
            <span className="block sm:inline font-semibold">
              {errorMessage}
            </span>
          </div>
        )}

        {!tokenExpired && (
          <div className="max-w-md mx-auto space-y-6">
            {/* FORM */}
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              {/* Form inputs */}
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Password{" "}
                </span>
                <Input
                  type="password"
                  className="mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Confirm password{" "}
                </span>
                <Input
                  type="password"
                  className="mt-1"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <ButtonPrimary type="submit" disabled={errorMessage !== ""}>
                {" "}
                {loading ? <Loader /> : "Reset password"}
              </ButtonPrimary>
            </form>
          </div>
        )}

        {tokenExpired && (
          <div className="max-w-md flex items-center justify-center mx-auto space-y-6">
            <button className="bg-primary-500 px-4 py-3 sm:px-6 text-sm sm:text-base font-medium nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-white">
              <Link href="/password-recovery" className="">
                Request a new password reset
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
