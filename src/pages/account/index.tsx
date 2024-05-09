import React, { FC, useEffect, useState } from "react";
import Label from "@/components/Label";
import Avatar from "@/shared/Avatar";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "@/shared/Select";
import Textarea from "@/shared/Textarea";
import { useDispatch } from "react-redux";
import {
  setCurrentUser,
  setSession,
  setToken,
} from "@/features/user/userSlice";
import { gql, useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "@/graphql/mutation";
import CommonLayout from "@/components/account-pages/layout";
import { useSelector } from "react-redux";
import Button from "@/shared/Button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import axios from "axios";
import Image from "next/image";
import { fetchUserProperties, useAppDispatch } from "@/features/user/userApi";
import AccountAvatar from "@/shared/AccountAvatar";
import PrivateRoute from "@/hooks/PrivateRoute";

export interface AccountPageProps {}

const AccountPage = () => {
  const { data: session } = useSession();

  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );

  const { userInfo } = useSelector((state: any) => state.user);
  const currentUser = userInfo?.user;
  const userId = userInfo?.user?.id || userInfo?.id;
  const dispatch = useAppDispatch();
  const [name, setName] = useState(currentUser?.name ?? "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber || ""
  );
  const [about, setAbout] = useState(currentUser?.about || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    currentUser?.dateOfBirth || ""
  );
  const [gender, setGender] = useState(currentUser?.gender || "");
  const [website, setWebsite] = useState(currentUser?.website || "");
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [successMessage, setSuccessMessage] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [previewFiles, setPreviewFiles] = useState<
    { file: File; base64: string }[]
  >([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log({ errorMessages });

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserProperties(userId));
    }
  }, [dispatch, currentUser]);

  console.log({ currentUser });

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const router = useRouter();

  const { token } = useSelector((state: any) => state.user);

  const handleLogOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (token) {
        dispatch(setToken(null));

        router.push("/");
      } else {
        await signOut({ callbackUrl: "/" });
        dispatch(setSession(null));
      }
    } catch (error) {
      console.error("Error during log out:", error);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        setPreviewFiles([{ file, base64: fileReader.result as string }]);
      });
    } else {
      setPreviewFiles([]);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const newErrorMessages: Record<string, string> = {};

    if (!name) {
      newErrorMessages.name = "Please enter your full name.";
    }
    if (!email) {
      newErrorMessages.email = "Please enter your email address.";
    }
    if (!address) {
      newErrorMessages.address = "Please enter your address.";
    }
    if (!phoneNumber) {
      newErrorMessages.phoneNumber = "Please enter your phone number.";
    }
    if (!dateOfBirth) {
      newErrorMessages.dateOfBirth = "Please enter your date of birth.";
    }
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      newErrorMessages.email = "Please enter a valid email address.";
    }

    const phonePattern = /^\+?[0-9\b]+$/;
    const maxPhoneNumberDigits = 13;

    if (!phonePattern.test(phoneNumber)) {
      newErrorMessages.phoneNumber = "Please enter a valid phone number.";
    } else if (phoneNumber.replace(/\D/g, "").length > maxPhoneNumberDigits) {
      newErrorMessages.phoneNumber = "Phone number cannot exceed 11 digits.";
    }
    if (Object.keys(errorMessages).length > 0) {
      window.scrollTo(0, 0);
    }
    setErrorMessages(newErrorMessages);

    if (Object.keys(newErrorMessages).length > 0) {
      return;
    }

    let profilePictureUrl = currentUser?.profilePictureUrl || null;

    if (previewFiles.length > 0) {
      const dataUrls: string[] = [];
      const fileNames: string[] = [];
      const { file }: { file: File } = previewFiles[0];
      fileNames.push(file.name);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      await new Promise<void>((resolve) => {
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            dataUrls.push(reader.result);
          }
          resolve();
        };
      });

      try {
        setLoading(true);
        const { data } = await axios.post<{ urls: string[] }>(
          "/api/media/upload",
          {
            dataUrls,
            fileNames,
          }
        );
        console.log("imageUrls", data.urls);
        profilePictureUrl = data.urls[0];
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      const variables = {
        id: `${currentUser.id}`,
        email,
        phoneNumber,
        about,
        address,
        dateOfBirth,
        gender,
        name,
        website,
        profilePictureUrl,
      };
      const { data } = await updateUser({ variables });
      dispatch(setCurrentUser(data.updateUser));
      dispatch(fetchUserProperties(userId));

      setLoading(false);
      window.scrollTo(0, 0);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <CommonLayout>
        <ToastContainer />
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-3xl font-semibold">Account infomation</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                {previewFiles.length > 0 ? (
                  <img
                    src={previewFiles[0].base64}
                    alt="Selected preview"
                    style={{
                      maxWidth: "200px",
                      width: "128px",
                      height: "128px",
                      objectFit: "cover",
                      inset: 0,
                    }}
                  />
                ) : (
                  <AccountAvatar sizeClass="w-32 h-32" />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                <input
                  type="file"
                  onChange={handleImageFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>{" "}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6"
            >
              {Object.keys(errorMessages).length > 0 && (
                <p className="text-red-500 mb-3">
                  Please note that the fields marked with an asterisk (*) are
                  mandatory.
                </p>
              )}
              {successMessage && (
                <div
                  className="bg-green-100 text-green-800 border border-green-400 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline">
                    {" "}
                    Your information has been updated.
                  </span>
                  <span
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    onClick={() => setSuccessMessage(false)}
                  >
                    <svg
                      className="fill-current h-6 w-6 text-green-700"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 6.066 4.652a1 1 0 00-1.414 1.414L8.586 10l-3.934 3.934a1 1 0 001.414 1.414L10 11.414l3.934 3.934a1 1 0 001.414-1.414L11.414 10l3.934-3.934a1 1 0 000-1.414z" />
                    </svg>
                  </span>
                </div>
              )}
              <div>
                <Label>
                  Full name <span className="text-red-500">*</span>
                </Label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`mt-1.5 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 h-11 px-4 py-3 text-sm font-normal rounded-2xl`}
                />
                {errorMessages.name && (
                  <div className="text-red-500 text-sm pt-1">
                    {errorMessages.name}
                  </div>
                )}
              </div>
              {/* ---- */}
              <div>
                <Label>Gender</Label>
                <Select
                  className="mt-1.5"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">-- Please select --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              <div>
                <Label>
                  Email <span className="text-red-500">*</span>
                </Label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1.5 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 h-11 px-4 py-3 text-sm font-normal rounded-2xl`}
                />
                {errorMessages.email && (
                  <div className="text-red-500 text-sm pt-1">
                    {errorMessages.email}
                  </div>
                )}{" "}
              </div>
              {/* ---- */}
              <div className="">
                <Label>
                  Date of birth <span className="text-red-500">*</span>
                </Label>
                <input
                  // type={dateOfBirth ? "" : "date"}
                  type={"date"}
                  value={dateOfBirth}
                  placeholder="dd/mm/yyyy"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className={`mt-1.5 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 h-11 px-4 py-3 text-sm font-normal rounded-2xl`}
                />
                {errorMessages.dateOfBirth && (
                  <div className="text-red-500 text-sm pt-1">
                    {errorMessages.dateOfBirth}
                  </div>
                )}{" "}
              </div>
              {/* ---- */}
              <div>
                <Label>
                  Address <span className="text-red-500">*</span>
                </Label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`mt-1.5 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 h-11 px-4 py-3 text-sm font-normal rounded-2xl`}
                />
                {errorMessages.address && (
                  <div className="text-red-500 text-sm pt-1">
                    {errorMessages.address}
                  </div>
                )}{" "}
              </div>
              {/* ---- */}
              <div>
                <Label>
                  Phone number <span className="text-red-500">*</span>
                </Label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onKeyDown={(e) => {
                    const numericRegex = /^[0-9\b+]+$/;
                    const specialKeyCodes = [8, 9, 13, 46];

                    if (
                      !numericRegex.test(e.key) &&
                      !specialKeyCodes.includes(e.keyCode)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number "
                  className={`mt-1.5 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 h-11 px-4 py-3 text-sm font-normal rounded-2xl`}
                />
                {errorMessages.phoneNumber && (
                  <div className="text-red-500 text-sm pt-1">
                    {errorMessages.phoneNumber}
                  </div>
                )}{" "}
              </div>
              {/* ---- */}

              <div>
                <Label>Website</Label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className={`mt-1.5 block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 h-11 px-4 py-3 text-sm font-normal rounded-2xl`}
                />
              </div>
              <div>
                <Label>About you</Label>

                <textarea
                  maxLength={50}
                  value={about}
                  rows={4}
                  onChange={(e) => setAbout(e.target.value)}
                  className={`mt-1.5 block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 `}
                />
              </div>
              <div className="pt-2 w-full flex justify-between pb-[40px]">
                <div className="w-sm">
                  <ButtonPrimary className="w-[150px]" type="submit">
                    {loading ? <Loader /> : "Update info"}{" "}
                  </ButtonPrimary>
                </div>
              </div>
            </form>
          </div>
        </div>
      </CommonLayout>
    </PrivateRoute>
  );
};

export default AccountPage;
