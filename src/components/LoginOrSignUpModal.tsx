import React, { FC, useEffect, useRef } from "react";
import LoginModal from "./LoginModal";
import { RxCross2 } from "react-icons/rx";
export interface LoginOrSignUpModalProps {
  onClose: () => void;
  handleClickSave: () => void;
}

const LoginOrSignUpModal: FC<LoginOrSignUpModalProps> = ({ onClose, handleClickSave }) => {
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
    // Hide the scroll bar when the modal is open
    document.body.style.overflowY = "hidden";

    return () => {
      // Restore the scroll bar when the modal is closed
      document.body.style.overflowY = "auto";
    };
  }, []);


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#0e131f]  my-2 p-6 w-[600px] h-[600px] rounded-lg overflow-hidden"
      >
        <div className="flex justify-between mb-7">
          <div></div>
          <button
            className="text-gray-600 border flex items-center justify-center p-3 rounded-lg hover:text-gray-800"
            onClick={onClose}
          >
            <RxCross2 size={27} />
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 h-[450px]">
          <LoginModal onClose={onClose} handleClickSave={handleClickSave} />
        </div>
      </div>
    </div>
  );
};

export default LoginOrSignUpModal;
