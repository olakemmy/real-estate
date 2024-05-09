import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";

import GalleryModal from "./GalleryModal";

export interface GallerySliderProps {
  className?: string;
  galleryImgs: (StaticImageData | string)[];
  ratioClass?: string;
  uniqueID: string;
  imageClass?: string;
  galleryClass?: string;
  navigation?: boolean;
  available?: boolean;
}

export default function BigGallerySlider({
  className = "",
  galleryImgs,
  ratioClass = "aspect-w-4 aspect-h-3",
  imageClass = "",
  uniqueID = "uniqueID",
  galleryClass = "rounded-xl",

  navigation = true,
}: GallerySliderProps) {
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = galleryImgs;


  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setIndex(newVal);
  }
  function onNext() {
    if (index < images.length - 1) {
      changePhotoId(index + 1);
    } else {
      changePhotoId(0); // wrap around to first image
    }
  }

  function onPrev() {
    if (index > 0) {
      changePhotoId(index - 1);
    } else {
      changePhotoId(images.length - 1); // wrap around to last image
    }
  }
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  let currentImage = images[index];

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className={`relative group group/cardGallerySlider ${className} `}
        {...handlers}
      >
        {/* Main image */}
        <div
          className={`w-full overflow-hidden ${galleryClass}`}
          onClick={() => {
            setIsModalOpen(true);
            document.body.classList.add("modal-open");
          }}
        >
          <div>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants(200, 1)}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={currentImage || ""}
                  fill
                  alt="listing card gallery"
                  className={`object-cover ${imageClass}`}
                  onLoadingComplete={() => setLoaded(true)}
                //   sizes="(max-width: 1025px) 100vw, 300px"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <>
          {/* Buttons */}
          {loaded && navigation && (
            <div className="opacity-0 group-hover/cardGallerySlider:opacity-100 transition-opacity ">
              {index > 0 && (
                <button
                  className="absolute w-8 h-8 left-3 top-[calc(50%-16px)] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  onClick={() => changePhotoId(index - 1)}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
              )}
              {index + 1 < images.length && (
                <button
                  className="absolute w-8 h-8 right-3 top-[calc(50%-16px)] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  onClick={() => changePhotoId(index + 1)}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {/* Bottom Nav bar */}
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-neutral-900 opacity-50 rounded-b-lg"></div>
          <div className="flex items-center justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-1.5">
            {images.map((_, i) => (
              <button
                className={`w-1.5 h-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/60 "
                  }`}
                onClick={() => changePhotoId(i)}
                key={i}
              />
            ))}
          </div>

          {isModalOpen && (
            <div className="z-50">
              <GalleryModal
                image={currentImage}
                onClose={() => {
                  setIsModalOpen(false);
                  document.body.classList.remove("modal-open");
                }}
                onNext={onNext}
                onPrev={onPrev}
                currentImageNumber={index + 1}
                totalImages={images.length}
              />
            </div>
          )}
        </>
      </div>
    </MotionConfig>
  );
}
