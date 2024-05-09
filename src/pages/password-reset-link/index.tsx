import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";

const PasswordResetLink = () => {
  const router = useRouter();
  const { email } = router.query;

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <div className="w-[60px] mx-auto mt-20 h-[60px] bg-neutral-200 rounded-[50%] flex items-center justify-center">
          <HiOutlineMailOpen color="#4338ca" size={30} />
        </div>
        <h2 className="mt-3 mb-2 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Check your email
        </h2>
        <p className="text-center  text-neutral-700 dark:text-neutral-300">
          We sent a password reset link to
        </p>
        <p className="text-center mb-6 text-neutral-700 dark:text-neutral-300 font-bold">
          &quot;{email}&quot;
        </p>
        <p className="text-center px-3">
          Head over to your inbox and click the &quot;Reset password&quot;
          button to reset your password.
        </p>
      </div>
    </div>
  );
};

export default PasswordResetLink;
