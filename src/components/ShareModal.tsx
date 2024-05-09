import React, { useEffect, useRef } from "react";

interface ShareModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ children, onClose }) => {
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

  // useEffect(() => {
  //   // Hide the scroll bar when the modal is open
  //   document.body.style.overflowY = "hidden";

  //   return () => {
  //     // Restore the scroll bar when the modal is closed
  //     document.body.style.overflowY = "auto";
  //   };
  // }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity">
      <div
        ref={modalRef}
        style={{ overflowY: "auto" }}
        className="w-full mx-10 bg-white px-4  pt-5 pb-4 sm:p-6 sm:pb-4 transform transition-transform"
      >
        <div className="sm:flex sm:items-start md:block">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div className="mt-2 mb-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
