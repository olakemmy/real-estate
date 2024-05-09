import { PathName } from "@/routers/types";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  href?: PathName;
  address?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonSubmit: FC<Props> = ({ address, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={!address}
      className={`${
        !address
          ? "bg-gray-600 hover:bg-gray-600"
          : "bg-primary-500 hover:bg-primary-700"
      } h-14   w-14 rounded-full text-center   flex items-center justify-center text-neutral-50 focus:outline-none`}
    >
      <span className="mr-3 md:hidden pl-2">Search</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  );
};

export default ButtonSubmit;
