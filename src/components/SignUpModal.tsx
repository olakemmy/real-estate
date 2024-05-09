import React, { FC, useEffect, useRef, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSession, signIn } from "next-auth/react";
import { setCurrentUser } from "@/features/user/userSlice";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@/graphql/mutation";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import useRedirectToHomeIfAuthenticated from "@/hooks/withAuth";
import BouncingLoader from "@/components/BouncingLoader";
import successfulRegistrationImage from "@/images/success2.jpg";

export interface PageSignUpProps {
  setShowSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickSave: () => void;
}

const SignUpModal: FC<PageSignUpProps> = ({
  setShowSignupModal,
  handleClickSave,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useMutation(REGISTER_MUTATION);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isLoading = useRedirectToHomeIfAuthenticated();
  const [verifyMessage, setVerifyMessage] = useState(false);

  const topOfModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errorMessage && topOfModalRef.current) {
      topOfModalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [errorMessage]);

  useEffect(() => {
    if (verifyMessage && topOfModalRef.current) {
      topOfModalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [verifyMessage]);

  const handleSignin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn("google");
  };
  const handleSigninf = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn("facebook");
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await registerUser({
        variables: { email, password, name },
      });
      console.log(data.registerUser);
      dispatch(setCurrentUser(data.registerUser));

      setVerifyMessage(true);
      handleClickSave();
    } catch (error: any) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
    setLoading(false);
  };

  if (verifyMessage) {
    return (
      <div className="flex flex-col items-center">
        <div ref={topOfModalRef} />

        <h1 className="text-[20px] md:text-[30px] max-w-[600px] leading-[30px] md:leading-[50px] mt-9 font-semibold  text-center">
          Thanks for creating an account with Ogle
        </h1>
        <Image
          src={successfulRegistrationImage}
          alt="Successful Registration"
          width={400}
          height={300}
        />
        <h3 className="text-center mb-6 text-[20px] px-3 font-medium">
          You&apos;re almost finished
        </h3>
        <p className="text-center px-3">
          We&apos;ve sent an account verification link to you at &quot;{email}
          &quot;
        </p>
        <p className="text-center px-3">
          Head over to your inbox and click the &quot;Verify Email&quot; button
          to validate your email address.
        </p>

        <div className="mt-3">
          click{" "}
          <span
            onClick={() => setShowSignupModal(false)}
            className="text-primary-500 cursor-pointer underline underline-offset-1"
          >
            here
          </span>{" "}
          to login after Verifying your email address
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <BouncingLoader />
      </div>
    );
  }

  return (
    <div className={`nc-PageSignUp  `}>
      <div ref={topOfModalRef} />
      <div className="container mb-8 ">
        <h2 className="mb-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        {errorMessage && (
          <div className="flex max-w-md mx-auto my-3 rounded-lg bg-red-100 border border-red-400 text-red-700 dark:text-white  dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-4 hover:translate-y-[-2px]">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            <Link
              onClick={handleSignin}
              href=""
              className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
            >
              <Image
                className="flex-shrink-0"
                src={googleSvg}
                alt="Continue with Google"
              />
              <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                Continue with Google
              </h3>
            </Link>
            {/* <Link
              onClick={handleSigninf}
              href=""
              className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
            >
              <Image
                className="flex-shrink-0"
                src={facebookSvg}
                alt="Continue with Google"
              />
              <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                Continue with Facebook
              </h3>
            </Link> */}
          </div>

          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Full name
              </span>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <ButtonPrimary
              type="submit"
              disabled={
                loading || email === "" || password === "" || name === ""
              }
            >
              {" "}
              {loading ? <Loader /> : "Register"}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <span
              className="font-semibold underline cursor-pointer"
              onClick={() => setShowSignupModal(false)}
            >
              Sign in
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
