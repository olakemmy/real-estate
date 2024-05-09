import { Tab } from "@headlessui/react";

import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StayCard2 from "@/components/StayCard2";
import moment from "moment";
import {
  fetchAuthorInfo,
  useAppDispatch,
} from "@/features/user/userApi";
import PrivateRoute from "@/hooks/PrivateRoute";
import { useRouter } from "next/router";
import AuthorAvatar from "@/shared/AuthorAvatar";

export interface AuthorPageProps { }

const AuthorPage: FC<AuthorPageProps> = ({ }) => {
  const dispatch = useAppDispatch();
  const { authorInfo } = useSelector((state: any) => state.user);

  console.log({ authorInfo });

  const [visibleListings, setVisibleListings] = useState(2);
  const increment = 4;
  const [lazyLoading, setLazyLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const fetchData = useCallback(() => {
    if (typeof id === "string") {
      dispatch(fetchAuthorInfo(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatCreatedAt = (createdAt: string) => {
    const date = moment(createdAt);
    const formattedDate = date.format("MMMM YYYY");
    return formattedDate;
  };

  let [categories] = useState(["Buy", "Rent"]);
  const [listingType, setListingType] = useState("");

  const visibleProperties = authorInfo?.user?.properties.slice(
    0,
    visibleListings
  );

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.scrollY;

      if (windowBottom >= docHeight - 80 && !lazyLoading) {
        setLazyLoading(true);
        setVisibleListings(
          (prevVisibleListings) => prevVisibleListings + increment
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lazyLoading]);

  useEffect(() => {
    setLazyLoading(false);
  }, [visibleListings]);

  const renderSidebar = () => {
    return (
      <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <AuthorAvatar
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
        />

        {/* ---- */}
        <div className="space-y-3 text-center flex flex-col items-center">
          {authorInfo?.user?.name && (
            <h2 className="text-3xl font-semibold">{authorInfo?.user?.name}</h2>
          )}
        </div>

        {/* ---- */}
        {authorInfo?.user?.about && (
          <p className="text-neutral-500 dark:text-neutral-400">
            {authorInfo?.user?.about}
          </p>
        )}



        {/* ---- */}
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

        {/* ---- */}
        <div className="space-y-4">
          {authorInfo?.user?.address && (
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>

              <span className="text-neutral-6000 dark:text-neutral-300">
                {authorInfo.user?.address}
              </span>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              Joined in {formatCreatedAt(authorInfo?.user?.createdAt)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection1 = () => {
    const hasBuyProperties = authorInfo?.user?.properties?.some(
      (property: { listingType: string }) => property.listingType === "BUY"
    );

    const hasRentProperties = authorInfo?.user?.properties?.some(
      (property: { listingType: string }) => property.listingType === "RENT"
    );

    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">{`${authorInfo?.user?.name}'s Listings`}</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      onClick={() => setListingType(item)}
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${selected
                        ? "bg-primary-500 text-secondary-50 "
                        : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="">
                <div>
                  {!hasBuyProperties ? (
                    <p className="mt-8">No listings available.</p>
                  ) : (
                    <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                      {visibleProperties
                        ?.filter(
                          (property: { listingType: string }) =>
                            property.listingType === "BUY"
                        )
                        .map((property: any, index: number) => (
                          <StayCard2 key={index} property={property} />
                        ))}
                    </div>
                  )}
                </div>


              </Tab.Panel>
              <Tab.Panel className="">
                <div>
                  {!hasRentProperties ? (
                    <p className="mt-8">No listings available.</p>
                  ) : (
                    <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                      {visibleProperties
                        ?.filter(
                          (property: { listingType: string }) =>
                            property.listingType === "RENT"
                        )
                        .map((property: any, index: number) => (
                          <StayCard2 key={index} property={property} />
                        ))}
                    </div>
                  )}
                </div>

              </Tab.Panel>

            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>


      </div>
    );
  };

  return (
    <PrivateRoute>
      <div className={`nc-AuthorPage `}>
        <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
          <div className="block flex-grow mb-24 lg:mb-0">
            <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
          </div>
          <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
            {renderSection1()}

            {listingType === "Short Let" ? renderSection2() : ""}
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
};

export default AuthorPage;