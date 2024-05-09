import { Fragment, useState } from "react";
import Image from "next/image";
import listingImage from "@/images/listingimage2.jpg";
// import listingImage from "@/images/create_listing.jpg";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import PrivateRoute from "@/hooks/PrivateRoute";
import { useSession } from "next-auth/react";

const ListingTypes = [
  { name: "Select listing type" },
  { name: "Rent" },
  { name: "Buy" },
];

const CreateListing = () => {
  const [listingType, setListingType] = useState("");
  const [selected, setSelected] = useState(ListingTypes[0]);
  const { data: session } = useSession();

  const route = useRouter();

  console.log("listingType", { listingType, selected });

  const handleListingTypeChange = (event: any) => {
    setListingType(event.target.value);
  };

  const handleRoute = () => {
    if (selected.name === "Rent") {
      route.push("/create-listing/rent");
    }
    if (selected.name === "Buy") {
      route.push("/create-listing/buy");
    }
  };
  return (
    <PrivateRoute>
      <div className=" h-[80vh] w-full space-y-10  md:h-fit ">
        <div className="mx-auto mt-10 flex w-96 flex-col justify-center px-5">
          <h1 className="mb-8  text-3xl dark:text-[#fff]">Create a Listing</h1>

          <div className="w-72">
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="border relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-[#0e131f] sm:text-sm">
                  <span className="block truncate dark:text-[#fff]">
                    {selected.name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white   text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {ListingTypes.map((ListingType, ListingTypeIdx) => (
                      <Listbox.Option
                        key={ListingTypeIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-primary-500 text-[#fff]"
                              : "text-gray-900"
                          }  ${
                            ListingType.name === "Select listing type"
                              ? "bg-[#626468] text-[#fff]"
                              : null
                          }`
                        }
                        value={ListingType}
                        disabled={ListingType.name === "Select listing type"}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {ListingType.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#fff]">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className="mt-5">
            <button
              disabled={selected.name === "Select listing type"}
              className={`rounded-md bg-primary-500 px-4 py-1 text-[14px] text-white transition duration-150 disabled:cursor-not-allowed disabled:bg-[#4b5563]`}
              onClick={handleRoute}
            >
              Continue
            </button>
          </div>
        </div>

        <div className="hidden  md:block">
          <div className="">
            <Image
              src={listingImage}
              alt="listing_image"
              className="mx-auto"
              style={{ objectFit: "cover", width: "700px", height: "500px" }}
            />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default CreateListing;
