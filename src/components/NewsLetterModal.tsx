import React, { FC, useEffect, useRef } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

export interface NewsLetterModalModalProps {
  onClose: () => void;
  message: string;
}
const NewsLetterModal: FC<NewsLetterModalModalProps> = ({
  onClose,
  message,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#0e131f] my-2 w-[400px] rounded-lg overflow-hidden relative" // Added relative position
      >
        <button
          className="text-gray-600 border absolute top-0 right-0 mt-2 mr-2 p-3 rounded-lg hover:text-gray-800" // Positioning for top right corner
          onClick={onClose}
        >
          <RxCross2 size={27} />
        </button>

        <div className="container mb-10">
          <div className="w-[60px] mx-auto mt-10 h-[60px] bg-neutral-200 rounded-[50%] flex items-center justify-center">
            <IoMdCheckmarkCircleOutline size={27} color="3270FC"/>
          </div>
          <h2 className="mt-3 mb-2 text-center flex items-center text-2xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Thank you for joining our newsletter!
          </h2>
          <p className="text-center  text-neutral-700 dark:text-neutral-300">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterModal;
