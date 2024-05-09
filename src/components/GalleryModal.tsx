import Image, { StaticImageData } from "next/image";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  image: StaticImageData | string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentImageNumber: number;
  totalImages: number;
}

export default function GalleryModal({
  image,
  onClose,
  onNext,
  onPrev,
  currentImageNumber,
  totalImages,
}: ModalProps) {
  const [direction, setDirection] = useState(0);

  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(({ swipe: [swipeX], movement: [mx], last }) => {
    if (swipeX === -1) handleNext();
    if (swipeX === 1) handlePrev();
    api.start({ x: mx });
    if (last) api.start({ x: 0 });
  });

  function handleNext() {
    setDirection(1);
    onNext();
  }

  function handlePrev() {
    setDirection(-1);
    onPrev();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full flex flex-col justify-between z-50 py-4  h-full bg-black">
        <div className="flex justify-between items-center px-[20px] ">
          <button
            onClick={(event) => {
              onClose();
            }}
          >
            <ArrowLeftIcon className="w-6 h-6 text-white" />{" "}
          </button>
          <div className="text-[12px] text-white w-16 rounded-3xl mx-auto h-4 left-0 right-0 flex justify-center items-center p-4">
            <p className=" text-white font-semibold">
              {currentImageNumber}/{totalImages}
            </p>
          </div>
          <div></div>
        </div>
        <div className="flex justify-center items-center ">
          <button
            className="absolute text-black hidden md:block left-10 z-50 active:scale-90 transition duration-150 text-[24px] bg-white rounded-md box-shadow w-8 h-12"
            onClick={(event) => {
              event.stopPropagation(); // stop event propagation
              handlePrev();
            }}
          >
            ❰
          </button>
          <div
            {...bind()}
            className="w-[700px] h-[290px] md:h-[450px] relative"
          >
            <animated.div
              style={{ x }}
              key={currentImageNumber}
              className="w-full h-full"
            >
              <div>
                <Image
                  src={image}
                  alt="modal image"
                  className="rounded object-cover w-full "
                  fill
                />
              </div>
            </animated.div>
          </div>
          <button
            className="absolute text-black hidden md:block right-10 active:scale-90 transition duration-150 text-[24px] bg-white rounded-md box-shadow w-8 h-12"
            onClick={(event) => {
              event.stopPropagation(); // stop event propagation
              handleNext();
            }}
          >
            ❱
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
