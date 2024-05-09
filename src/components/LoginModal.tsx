import React, { FC, useEffect, useRef, useState } from "react";
import jwtDecode from "jwt-decode";
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { setSession, setToken } from "@/features/user/userSlice";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/graphql/mutation";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { fetchUserProperties, useAppDispatch } from "@/features/user/userApi";
import SignUpModal from "./SignUpModal";

export interface PageLoginProps {
  onClose: () => void;
  handleClickSave: () => void;
}

const LoginModal: FC<PageLoginProps> = ({ onClose, handleClickSave }) => {
  const { token } = useSelector((state: any) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const decodedToken = token && (jwtDecode(token) as { id: string });
  const userId = decodedToken?.id;
  const { status } = useSession();

  console.log({ userId });

  const userInfo = useSelector((state: any) => state.user);

  console.log({ userInfo });

  const topOfModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errorMessage && topOfModalRef.current) {
      topOfModalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [errorMessage]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProperties(userId));
      onClose();
    }
  }, [userId, dispatch]);

  const [loginUser] = useMutation(LOGIN_MUTATION, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  const handleSigninWithGoogle = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn("google", {
      callbackUrl: window.location.href,
    });

    handleClickSave();
  };

  const handleSigninWithFacebook = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn("facebook", {
      callbackUrl: "/",
    });
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(false);
    try {
      setLoading(true);
      const { data } = await loginUser({ variables: { email, password } });
      dispatch(setToken(data.loginUser));
      router.push(router.asPath);
      setLoading(false);
      handleClickSave();
    } catch (error: any) {
      window.scrollTo(0, 0);
      if (error.message === "data and hash arguments required") {
        setShowModal(true);
      } else {
        setErrorMessage(error.message);
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 7000);
    }
    setLoading(false);
  };

  if (showSignupModal)
    return (
      <SignUpModal
        setShowSignupModal={setShowSignupModal}
        handleClickSave={handleClickSave}
      />
    );

  return (
    <div>
      <div className={`nc-PageLogin`}>
        <div ref={topOfModalRef} />

        <div className="container mb-24 lg:mb-10">
          <h2 className="mt-10 mb-6 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Login
          </h2>
          {errorMessage && (
            <div className="flex max-w-md mx-auto my-3 rounded-lg bg-red-100 border border-red-400 text-red-700 dark:text-white dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-4 hover:translate-y-[-2px]">
              {/* <strong className="font-bold">Error! </strong> */}
              <span className="block sm:inline">
                {errorMessage && errorMessage}
              </span>
            </div>
          )}
          <div className="max-w-md mx-auto space-y-6">
            <div className="grid gap-3">
              <Link
                onClick={handleSigninWithGoogle}
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
            </div>
            {/* OR */}
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
                  Email address
                </span>
                <Input
                  type="email"
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Password
                  <Link
                    href="/password-recovery"
                    className="text-sm underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </span>
                <Input
                  type="password"
                  className="mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <ButtonPrimary type="submit">
                {" "}
                {loading ? <Loader /> : "Login"}
              </ButtonPrimary>
            </form>

            {/* ==== */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              New user? {` `}
              <span
                className="font-semibold underline cursor-pointer"
                onClick={() => setShowSignupModal(true)}
              >
                Create an account
              </span>
            </span>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 max-w-[400px] rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sorry, it seems like you registered using social login, which
              doesn&apos;t require a password. Please sign in using the same
              social provider you used for registration.
            </p>

            <div className="flex mt-3 justify-between">
              <div></div>
              <ButtonPrimary
                className="w-[120px]"
                onClick={() => setShowModal(false)}
              >
                Close
              </ButtonPrimary>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
