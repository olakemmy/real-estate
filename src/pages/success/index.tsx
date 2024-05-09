import React, { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import successfulRegistrationImage from "@/images/success2.jpg"; 

const SuccessEmailPage: FC = () => {
  const router = useRouter();
  const { email } = router.query;

  return (
    <div className="flex flex-col items-center  min-h-screen">
      <h1 className="text-[30px] md:text-[50px] max-w-[600px] leading-[30px] md:leading-[50px] mt-9 font-semibold mb-6 text-center">
        Thanks for creating an account with Ogle
      </h1>
      <Image
        src={successfulRegistrationImage}
        alt="Successful Registration"
        width={400}
        height={300}
      />
      <h3 className="text-center my-6 text-[20px] px-3 font-medium">
        You&apos;re almost finished
      </h3>
      <p className="text-center px-3">
        We&apos;ve sent an account verification link to you at &quot;{email}
        &quot;
      </p>
      <p className="text-center px-3">
        Head over to your inbox and click the &quot;Verify Email&quot; button to
        validate your email address.
      </p>
    </div>
  );
};

export default SuccessEmailPage;
