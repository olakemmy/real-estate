import React, { FC, useEffect, useState, useRef } from "react";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  fetchProperty,
  useAppDispatch,
} from "@/features/properties/propertiesApi";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import DetailLayout from "@/components/listing-detail/layout";
import BigGallerySlider from "@/components/BigGallerySlider";
import BouncingLoader from "@/components/BouncingLoader";
import { geocodeAddressWithNominatim } from "@/hooks/geocodeAddress";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  fetchUserProperties,
  useAppDispatch as userDispatch,
} from "@/features/user/userApi";
import UserPropertyAvatar from "@/components/UserPropertyAvatar";
import { useSession } from "next-auth/react";
import { formatRelativeDate } from "@/utils/formattedDate";

import { avatarColors } from "@/contains/contants";
import { amenityLabels } from "@/config/config";

export interface ListingStayDetailPageProps {}

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({}) => {
  const dispatch = useAppDispatch();
  const userD = userDispatch();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();
  const createdListing = useSelector((state: any) => state.properties.property);
  const { userInfo } = useSelector((state: any) => state.user);
  const userId = userInfo?.user?.id || userInfo?.id;
  const { token } = useSelector((state: any) => state.user);
  const { property: propertyData } = useSelector(
    (state: any) => state.properties
  );
  const [inputValue, setInputValue] = useState("");
  const userProperties = userInfo?.user?.properties;
  let isOwner = false;
  if ((session || token) && userProperties) {
    isOwner = userProperties.some(
      (userProperty: { id: string }) => userProperty.id === createdListing?.id
    );
  }

  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(
      name?.charCodeAt(0) % avatarColors.length
    );
    return avatarColors[backgroundIndex];
  };

  const profileUrl = session?.user?.image || userInfo?.user?.profilePictureUrl;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const thisPathname = usePathname();

  const id = thisPathname?.split("/")[3];

  const listingOnwer = createdListing?.user?.id;

  useEffect(() => {
    userD(fetchUserProperties(userId));
  }, [dispatch, userId, createdListing]);

  const [coordinates, setCoordinates] = useState<number[] | null>(null);
  const a = `${createdListing?.address}`;
  // const apiKey =
  //   "AqJ5GWDsY6KxhiIkeK9AuBiokhRk7fDCjuPQx4_HZ4WY9sWByaUiSm2TsfysesMR";

  const address = `${createdListing?.detailedAddress?.street},${createdListing?.detailedAddress?.city},${createdListing?.detailedAddress?.state}`;
  useEffect(() => {
    if (address) {
      geocodeAddressWithNominatim(a)
        .then((coordinates) => {
          setCoordinates(coordinates);
        })
        .catch((error) => {
          setCoordinates(null);
        });
    }
  }, [a]);

  useEffect(() => {
    const loadMap = () => {
      if (mapContainerRef.current && coordinates && coordinates.length === 2) {
        mapboxgl.accessToken = process.env.mapbox_key || "";
        const [longitude, latitude] = coordinates;

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [longitude, latitude],
          zoom: 12,
          dragPan: true,
        });

        new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, "top-right");
        map.addControl(new mapboxgl.FullscreenControl());
      }
    };

    loadMap();
  }, [coordinates]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProperty(id));
    }
  }, [id, dispatch, createdListing]);

  const handleWhatsAppClick = () => {
    const phone = "+447735750274";
    const message = "Welcome to Ogle";
    const whatsappUrl = getWhatsAppUrl(phone, message);
    window.open(whatsappUrl, "_blank", "noreferrer");
  };

  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const renderSidebar = () => {
    if (
      !createdListing?.user?.name &&
      !createdListing?.user?.address &&
      !createdListing?.user?.website &&
      !createdListing?.user?.phoneNumber &&
      !createdListing?.user?.email
    ) {
      return null;
    }
    return (
      <>
        <div className="listingSectionSidebar__wrap ">
          <div className="flex flex-col space-y-4">
            {createdListing?.user?.name ? (
              <div className=" text-neutral-6000 dark:text-neutral-300">
                <span className="text-lg font-bold">Name : </span>
                <span>{createdListing?.user?.name}</span>
              </div>
            ) : null}
            {createdListing?.user?.phoneNumber ? (
              <div className=" text-neutral-6000 dark:text-neutral-300">
                <span className="text-lg font-bold">Phone number : </span>
                <span>{createdListing?.user?.phoneNumber}</span>
              </div>
            ) : null}

            {createdListing?.user?.email ? (
              <div className=" text-neutral-6000 dark:text-neutral-300">
                <span className="text-lg font-bold">Email : </span>
                <span>{createdListing?.user?.email}</span>
              </div>
            ) : null}
            {createdListing?.user?.address ? (
              <div className="text-neutral-6000 dark:text-neutral-300">
                <span className="text-lg font-bold">Address : </span>
                <span>{createdListing?.user?.address}</span>
              </div>
            ) : null}

            {createdListing?.user?.website ? (
              <div className=" text-neutral-6000 dark:text-neutral-300">
                <span className="text-lg font-bold capitalize">website : </span>
                <span>
                  <Link href={createdListing?.user?.website}>
                    {createdListing?.user?.website}
                  </Link>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  };

  return (
    <DetailLayout>
      <div>
        <div className="nc-ListingStayDetailPage">
          {/* MAIN */}

          <main className=" relative  mt-1 flex flex-col lg:flex-row ">
            {/* CONTENT */}
            <div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pr-10 xl:w-2/3">
              <div className="h-[500px] w-[100%] ">
                {/* <ImageSlider slides={createdListing?.propertyImageList} /> */}
                {createdListing?.propertyImageList &&
                createdListing.propertyImageList.length > 0 ? (
                  <BigGallerySlider
                    ratioClass="aspect-w-1 aspect-h-1"
                    galleryImgs={createdListing.propertyImageList}
                    className="h-full w-full overflow-hidden rounded-2xl"
                    uniqueID={`PropertyCardH_${createdListing?.id}`}
                  />
                ) : (
                  // Render a fallback UI here
                  <BouncingLoader />
                )}
              </div>
              <div className="listingSection__wrap !space-y-6">
                {/* 1 */}
                <div className="flex items-center justify-between">
                  <div className="nc-Badge inline-flex rounded-full bg-primary-500 px-2.5 py-1 text-xs font-medium text-white  transition-colors duration-300 hover:text-white">
                    {createdListing?.listingType}
                  </div>

                  <div className="flex items-center gap-4">
                    <LikeSaveBtns property={createdListing} />
                  </div>
                </div>

                {/* 2 */}
                <div className="items-center justify-between md:flex ">
                  <h2 className="mb-2 text-2xl font-semibold sm:text-3xl md:mb-0 lg:text-4xl">
                    {createdListing?.title}
                  </h2>
                  <span className="block text-xl font-semibold ">
                    {createdListing?.listingType === "RENT"
                      ? ` ₦${createdListing?.priceForRent?.toLocaleString(
                          "en-US"
                        )}`
                      : ` ₦${createdListing?.priceForBuy?.toLocaleString(
                          "en-US"
                        )}`}

                    {createdListing?.listingType === "RENT" && (
                      <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
                        /year
                      </span>
                    )}
                  </span>
                </div>

                {/* 3 */}
                <div className="flex items-center space-x-4">
                  <span>
                    <i className="las la-map-marker-alt"></i>
                    <span className="ml-1"> {createdListing?.address}</span>
                  </span>
                </div>

                <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

                <div className="text-sm text-neutral-700 dark:text-neutral-300   md:flex md:items-center md:justify-between md:space-x-8 xl:space-x-12">
                  <div className="flex items-center justify-between space-x-8 text-sm xl:justify-start xl:space-x-12">
                    <div className="flex items-center space-x-3">
                      <i className=" las la-bed text-2xl"></i>
                      <span className=" ">
                        {`${createdListing?.propertyAttributes?.numberOfBedrooms} `}
                        <span className="hidden sm:inline-block"> beds</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className=" las la-bath text-2xl"></i>
                      <span className=" ">
                        {`${createdListing?.propertyAttributes?.numberOfBathrooms} `}
                        <span className="hidden sm:inline-block">baths</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className=" las la-door-open text-2xl"></i>
                      <span className=" ">
                        {`${
                          createdListing?.propertyAttributes?.numberOfGarages
                            ? createdListing?.propertyAttributes
                                ?.numberOfGarages
                            : 0
                        } `}
                        <span className="hidden sm:inline-block"> garages</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 md:mt-0">
                    Listed {formatRelativeDate(createdListing?.createdAt)}
                  </div>
                </div>
              </div>
              <div className="listingSection__wrap">
                <h2 className="text-2xl font-semibold">Property information</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div
                  className="text-neutral-6000 dark:text-neutral-300"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {createdListing?.description}
                </div>
              </div>
              <div className="listingSection__wrap">
                <div>
                  <h2 className="text-2xl font-semibold">Amenities </h2>
                  <span className="mt-2 block text-neutral-500 dark:text-neutral-400">
                    {` About the property's amenities and services`}
                  </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* 6 */}
                <div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3 ">
                  {createdListing?.amenities?.map(
                    (
                      item: {
                        icon: string;
                        name: string;
                      },
                      index: React.Key | null | undefined
                    ) => (
                      <div key={index} className="flex items-center space-x-3">
                        {amenityLabels[item.icon] && (
                          <>
                            <i className={`las text-3xl ${item.icon}`}></i>
                            <span className=" ">
                              {amenityLabels[item.icon]}
                            </span>
                          </>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="listingSection__wrap">
                {/* HEADING */}
                <div>
                  <h2 className="text-2xl font-semibold">Location</h2>
                  <span className="mt-2 block text-neutral-500 dark:text-neutral-400">
                    {`${createdListing?.detailedAddress?.street}, ${createdListing?.detailedAddress?.city}, ${createdListing?.detailedAddress?.state}`}
                  </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

                {/* MAP */}
                <div className="aspect-h-5 aspect-w-5 z-0 rounded-xl ring-1 ring-black/10 sm:aspect-h-3">
                  <div className="z-0 overflow-hidden rounded-xl">
                    <iframe
                      width="100%"
                      height="100%"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=${createdListing?.detailedAddress?.street},${createdListing?.detailedAddress?.city},${createdListing?.detailedAddress?.state}`}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="mt-14 hidden flex-grow lg:mt-0 lg:block">
              <div className="">{renderSidebar()}</div>
            </div>
            <div className="mt-14 block flex-grow lg:mt-0 lg:hidden">
              <div className="">{renderSidebar()}</div>
            </div>
          </main>
        </div>
      </div>
    </DetailLayout>
  );
};

export default ListingStayDetailPage;
