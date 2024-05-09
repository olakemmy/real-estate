import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Nav = () => {
  const pathname = usePathname();

  const listNav = [
    "/account",
    "/account-savelists",
    "/account-password",
  ];

  return (
    <div className="container">
      <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
        {listNav.map((item) => {
          const isActive = pathname === item;
          let linkText = item.replace("-", " ").replace("/", " ");

          // Replace "account-savelists" with "wishlist"
          if (item === "/account-savelists") {
            linkText = "wishlists";
          }
          if (item === "/account-password") {
            linkText = "password reset";
          }

          return (
            <Link
              key={item}
              href={item}
              className={`block py-5 md:py-8 border-b-2 flex-shrink-0 capitalize ${isActive
                ? "border-primary-500 font-medium"
                : "border-transparent"
                }`}
            >
              {linkText}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
