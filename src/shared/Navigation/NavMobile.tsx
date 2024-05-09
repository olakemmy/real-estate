import React, { useEffect } from "react";
import ButtonClose from "@/shared/ButtonClose";
import Logo from "@/shared/Logo";
import { Disclosure } from "@headlessui/react";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO } from "@/data/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setToken } from "@/features/user/userSlice";
import { useSelector } from "react-redux";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ onClickClose }) => {
  const { token } = useSelector((state: any) => state.user);
  const { data: session } = useSession();


  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (token) {
        dispatch(setToken(null));
        await signOut();
        router.push("/");
      } else if (session && session.user) {
        await signOut({ callbackUrl: "/" });
      }
    } catch (error) {
      console.error("Error during log out:", error);
    }
  };

  const data = NAVIGATION_DEMO;

  useEffect(() => {
    const closeOnClick = () => {
      onClickClose && onClickClose();
    };

    const navigationLinks = document.querySelectorAll(".nav-link");
    navigationLinks.forEach((link) => {
      link.addEventListener("click", closeOnClick);
    });

    return () => {
      navigationLinks.forEach((link) => {
        link.removeEventListener("click", closeOnClick);
      });
    };
  }, [onClickClose]);

  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <Link
              href={{
                pathname: i.href || undefined,
              }}
              className="flex px-4 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5"
            >
              <span
                className={`py-2.5 pr-3 ${!i.children ? "block w-full" : ""}`}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex-1 flex"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="py-2.5 flex justify-end flex-1"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <Link
          className="flex w-full px-4 font-medium nav-link uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={`py-2.5 pr-3 ${!item.children ? "block w-full" : ""}`}
          >
            {item.name}
          </span>
          {item.children && (
            <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
              <Disclosure.Button
                as="span"
                className="py-2.5 flex items-center justify-end flex-1 "
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </Link>

        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          {/* <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them
          </span> */}


        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {/* {data.map(_renderItem)} */}
        <Link
          className="flex w-full px-4 font-medium nav-link  tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href="/"
        >
          <span className={`py-2.5 pr-3 block w-full"`}> Home</span>
        </Link>

        <Link
          className="flex w-full px-4 font-medium nav-link  tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href="/account"
        >
          <span className={`py-2.5 pr-3 block w-full"`}> My account</span>
        </Link>

        <Link
          className="flex w-full px-4 font-medium nav-link  tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href="/my-listings"
        >
          <span className={`py-2.5 pr-3 block w-full"`}> My listings</span>
        </Link>
        <Link
          className="flex w-full px-4 font-medium nav-link  tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href="/account-savelists"
        >
          <span className={`py-2.5 pr-3 block w-full"`}> Wishlist</span>
        </Link>

        {token || session ? (
          <Link
            className="flex w-full px-4 font-medium nav-link  tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            href="/create-listing"
          >
            <span className={`py-2.5 pr-3 block w-full"`}>Create listing</span>
          </Link>
        ) : null}

        {token || session ? (
          <Link
            className="flex w-full px-4 font-medium nav-link  tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            href="/"
            onClick={handleLogOut}
          >
            <span className={`py-2.5 pr-3 block w-full"`}>Logout</span>
          </Link>
        ) : null}

        {!token && !session && (
          <Link
            className="flex w-full px-4 font-medium nav-link  tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            href="/login"
          >
            <span className={`py-2.5 pr-3 block w-full"`}>Log in</span>
          </Link>
        )}
      </ul>
      <div className="flex items-center justify-between py-6 px-5">
        <a
          className="inline-block"
          href="https://themeforest.net/item/chisfis-online-booking-nextjs-template/43399526"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </div>
    </div>
  );
};

export default NavMobile;
