import React, { ReactNode } from "react";
import BackgroundSection from "@/components/BackgroundSection";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const DetailLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    router.push(`${thisPathname}/?${params.toString()}`);
  };


  return (
    <div className="ListingDetailPage">

      <div className="container ListingDetailPage__content">{children}</div>

      <div className=" py-10" />


    </div>
  );
};

export default DetailLayout;
