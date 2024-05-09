import React from "react";
import logo from "../images/ogle-logo.jpeg";
import Image from "next/image";

const LogoSvgLight = () => {
  return <Image src={logo} alt="nav-log" style={{ objectFit: "cover", width: "50px" }} />;
};

export default LogoSvgLight;
