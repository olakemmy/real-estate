import React, { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import { VERITY_EMAIL_MUTATION } from "@/graphql/mutation";
import VerificationImage from "@/images/verify.png";

const VerifyEmailPage: FC = () => {
  const router = useRouter();
  const { email, token } = router.query;

  const [verifyEmail] = useMutation(VERITY_EMAIL_MUTATION);

  const handleVerifyEmail = async () => {
    try {
      await verifyEmail({
        variables: { email, token },
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center   min-h-screen ">
      <div className="mt-9">
        <Image
          src={VerificationImage}
          alt="Successful Registration Image"
          width={200}
          height={200}
        />
      </div>

      <h1 className="text-[50px] max-w-[600px] leading-[50px] mt-9 font-semibold mb-6 text-center">
        Verify Email
      </h1>
      <p className="text-center px-3">
        Thanks for signing up, please click the &quot;Confirm&quot; button to
        verify your email
      </p>
      <button
        className="bg-primary-500 py-[8px] mt-5 text-white rounded px-[24px]"
        onClick={handleVerifyEmail}
      >
        Confirm
      </button>
    </div>
  );
};

export default VerifyEmailPage;
