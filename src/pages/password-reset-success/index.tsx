import Loader from "@/components/Loader";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const PasswordResetSuccess = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <div className="w-[60px] mx-auto mt-20 h-[60px] bg-neutral-200 rounded-[50%] flex items-center justify-center">
          <IoMdCheckmarkCircleOutline color="#4338ca" size={30} />
        </div>
        <h2 className="mt-3 mb-2 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Password reset
        </h2>
        <p className="text-center  text-neutral-700 dark:text-neutral-300">
          Your password has been successfully reset.
        </p>
        <p className="text-center mb-6 text-neutral-700 dark:text-neutral-300">
          Click below to log in
        </p>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <ButtonPrimary type="submit">
              {" "}
              {loading ? <Loader /> : "Login"}
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
