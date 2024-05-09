import React from "react";
import logoImg from "@/images/logo.png";
import logoLightImg from "@/images/logo-light.png";
import LogoSvgLight from "./LogoSvgLight";
import Link from "next/link";
import { StaticImageData } from "next/image";


export interface LogoProps {

  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = "w-24",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      <LogoSvgLight />


    </Link>
  );
};

export default Logo;
