import React from "react";

interface ErrorProps {
  error: string;
  onClose: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, onClose }) => {
  return (
    <div className="flex max-w-md mx-auto my-3 rounded-lg bg-red-50 border border-red-400 text-red-500 dark:bg-neutral-800 px-4 py-2 transform transition-transform sm:px-6 hover:translate-y-[-2px]">
      <strong className="font-bold">{error}</strong>
      <button
        className="ml-auto focus:outline-none"
        onClick={onClose}
        aria-label="Close"
        title="Close"
      >
        <div className="">
          <svg
            className="w-5 h-5 text-red-700 hover:text-red-900 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default Error;
