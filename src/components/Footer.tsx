import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import React from "react";
import FooterNav from "./FooterNav";
import Link from "next/link";
import { useRouter } from "next/router";

export interface WidgetFooterMenu {
  id: string;
  title: string;
}



const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  const router = useRouter();
  const isMessagesPage = router.pathname === "/messages";
 
  return (
    <>
      <FooterNav />

      <div
        className={`${isMessagesPage ? "hidden" : ""
          } nc-Footer  relative  pt-8 pb-14 md:pb-0 border-t border-neutral-200 dark:border-neutral-700`}
      >
        <div className="container grid md:pb-2 grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div>
          </div>
          <Link
            href="/account"
            className="font-semibold flex items-end text-neutral-700 dark:text-neutral-200"
          >
            My account
          </Link>{" "}
          <Link
            href="/my-listings"
            className="font-semibold flex items-end text-neutral-700 dark:text-neutral-200"
          >
            My listings
          </Link>{" "}
          <Link
            href="/account-savelists"
            className="font-semibold flex items-end text-neutral-700 dark:text-neutral-200"
          >
            Wishlist
          </Link>{" "}
          <Link
            href="/create-listing"
            className="font-semibold flex items-end text-neutral-700 dark:text-neutral-200"
          >
            Create listing
          </Link>
        </div>
        <div className="py-4  border-t text-center ">
          <p>&copy; {currentYear} Ogle Limited. All rights reserved.</p>{" "}
        </div>
      </div>
    </>
  );
};

export default Footer;
