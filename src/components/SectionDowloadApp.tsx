import BackgroundSection from "@/components/BackgroundSection";
import React from "react";
import appRightImg from "@/images/appRightImg.png";
import btnIosPng from "@/images/btn-ios.png";
import btnAndroidPng from "@/images/btn-android.png";
import Image from "next/image";

const SectionDowloadApp = () => {
  return (
    <div className="relative pb-0 pt-24 lg:py-32 xl:py-40 2xl:py-48">
      <BackgroundSection className="bg-neutral-100 bg-opacity-80 dark:bg-opacity-100 ">

        <div className="hidden lg:block absolute right-0 bottom-0 max-w-xl xl:max-w-2xl rounded-3xl overflow-hidden">
          <Image src={appRightImg} alt="" />
        </div>


      </BackgroundSection>

      <div className="relative inline-block ">
        <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold text-neutral-800">
          Mobile Apps
        </h2>
        <span className="block mt-7 max-w-md text-neutral-6000">
          We&apos;re working hard on our mobile app, and they&apos;re coming soon to the
          Play Store and App Store. Stay connected for updates!
        </span>
        <div className="flex space-x-3 mt-10 sm:mt-14">
          <a href="##" target="_blank" rel="noopener noreferrer">
            <Image src={btnIosPng} alt="" />
          </a>
          <a href="##" target="_blank" rel="noopener noreferrer">
            <Image src={btnAndroidPng} alt="" />
          </a>
        </div>

        <div className="block lg:hidden mt-10 max-w-2xl rounded-3xl overflow-hidden">
          <Image src={appRightImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SectionDowloadApp;



