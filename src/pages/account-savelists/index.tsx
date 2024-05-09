import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import CommonLayout from "@/components/account-pages/layout";
import { useSelector } from "react-redux";
import { fetchUserProperties, useAppDispatch } from "@/features/user/userApi";
import WishlistCard from "@/components/WishListCard";

const AccountSavelists = () => {
  let [categories] = useState(["Buy", "Rent"]);
  const { userInfo } = useSelector((state: any) => state.user);
  const userId = userInfo?.user?.id || userInfo?.id;

  console.log({ userInfo });

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProperties(userId));
    }
  }, [dispatch, userId]);
  const renderSection1 = () => {
    const hasBuyProperties = userInfo?.user?.wishlist?.some(
      (property: { listingType: string }) => property?.listingType === "BUY"
    );

    const hasRentProperties = userInfo?.user?.wishlist?.some(
      (property: { listingType: string }) => property?.listingType === "RENT"
    );

    return (
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-3xl font-semibold">Wishlists</h2>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

          <div>
            <Tab.Group>
              <Tab.List className="flex space-x-1 overflow-x-auto">
                {categories.map((item) => (
                  <Tab key={item} as={Fragment}>
                    {({ selected }) => (
                      <button
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
                <Tab.Panel className="mt-8">
                  {!hasBuyProperties ? (
                    <p>No properties on your wishlist.</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {userInfo?.user?.wishlist
                        ?.filter(
                          (property: { listingType: string }) =>
                            property?.listingType === "BUY"
                        )
                        .map((property: any, index: number) => (
                          <WishlistCard key={index} property={property} />
                        ))}
                    </div>
                  )}
                </Tab.Panel>
                <Tab.Panel className="mt-8">
                  {!hasRentProperties ? (
                    <p>No properties on your wishlist.</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {userInfo?.user?.wishlist
                        ?.filter(
                          (property: { listingType: string }) =>
                            property?.listingType === "RENT"
                        )
                        .map((property: any, index: number) => (
                          <WishlistCard key={index} property={property} />
                        ))}
                    </div>
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </CommonLayout>
    );
  };

  return renderSection1();
};

export default AccountSavelists;