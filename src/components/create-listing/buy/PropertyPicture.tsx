import { formData } from "@/interfaces/property";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  addImage,
  removeImage,
  setChanges,
} from "@/features/images/imageSlice";

export interface PageAddListing7Props {
  formData: formData;
  onNextPage: (data: formData) => void;
  onPreviousPage: (data: formData) => void;
}

interface PreviewFile {
  file: File;
  base64: string | ArrayBuffer | null;
}

const PropertyPicture: FC<PageAddListing7Props> = ({
  formData,
  onNextPage,
  onPreviousPage,
}) => {

  const previewFiles = useSelector((state: any) => state.images?.previewFiles);
  const hasChanges = useSelector((state: any) => state.images.hasChanges);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDeletePreview = (indexToDelete: number) => {
    dispatch(removeImage(indexToDelete));
    dispatch(setChanges(true));
  };

  console.log(hasChanges);

  const handleNext = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const dataUrls: string[] = [];
    const fileNames: string[] = [];
    console.log(hasChanges);

    console.log({ previewFiles });


    if (hasChanges) {
      if (previewFiles.length === 0) {
        setLoading(false);
        window.scrollTo(0, 0);
        setError("Please select  pictures of property");
        return;
      }
      console.log(hasChanges);

      for (let i = 0; i < previewFiles.length; i++) {
        const { file }: { file: File } = previewFiles[i];
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
      }

      try {
        setLoading(true);
        const { data } = await axios.post<{ urls: string[] }>(
          "/api/media/uploadImage",
          {
            dataUrls,
            fileNames,
          }
        );
        console.log("imageUrls", data.urls);

        setLoading(false);
        const updatedFormData: formData = {
          ...formData,
          propertyImageList: data.urls,
        };

        onNextPage(updatedFormData);
        dispatch(setChanges(false));
      } catch (err) {
        console.error(err);
      }
    } else {
      onNextPage(formData);
    }
  };

  function handlePrevious() {
    const data: formData = {
      ...formData,
    };
    onPreviousPage(data);
  }

  const handleCloseError = () => {
    setError("");
  };

  console.log({ previewFiles });

  const handleImageFiles = (files: FileList) => {
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
          const base64 = event.target?.result as string;
          const imageFile = { file, base64 };
          dispatch(addImage(imageFile));

          // Check if all files have been read
          if (i === files.length - 1) {
            dispatch(setChanges(true));
          }
        };

        fileReader.readAsDataURL(file);
      }
    }
  };

  const handleMultipleImageFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      handleImageFiles(files);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    handleImageFiles(droppedFiles); // Use the helper function
  };

  const onDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleImageFiles(files); // Use the helper function
    }
  };


  return (
    <div>
      {error && <Error error={error} onClose={handleCloseError} />}

      <div>
        <div className="flex">
          <h2 className="text-2xl font-semibold">Pictures of the place</h2>{" "}
          <span className="text-red-500">*</span>
        </div>{" "}
        <span className="block my-3 text-neutral-500 dark:text-neutral-400">
          A few beautiful photos will help customers have more sympathy for your
          property.
        </span>
      </div>

      <div className="w-14 mb-3 border-b border-neutral-200 dark:border-neutral-700"></div>

      <div
        className="space-y-8"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          navigation={true}
          slidesPerView={2}
        >
          {previewFiles?.map(
            (
              preview: {
                file: { name: React.Key | null | undefined };
                base64: string;
              },
              index: number
            ) => (
              <SwiperSlide key={preview.file.name} className="relative">
                <div className="flex justify-center items-center">
                  <div className="relative ">
                    <img
                      src={preview.base64 as string}
                      alt="Preview"
                      className="object-cover  h-[200px]"
                    />
                    <button
                      className="absolute top-2 right-2 p-1 bg-white rounded-full"
                      onClick={() => handleDeletePreview(index)}
                    >
                      <RiDeleteBin6Line size={22} color="red" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
        <div>
          <div className="mt-5 ">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
              <div className="mt-1 flex justify-center"></div>
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                  <label
                    htmlFor="file-upload-2"
                    className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <input
                      type="file"
                      name="propertyImageList"
                      accept="image/*"
                      id="file-upload-2"
                      multiple
                      onChange={handleMultipleImageFilesChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-5 justify-between">
        <div></div>
        <div className="space-x-4 ">
          <button
            type="button"
            className="ttnc-ButtonSecondary px-6 py-3 rounded-full font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={handlePrevious}
          >
            Go Back
          </button>

          <button
            type="button"
            className="ttnc-ButtonPrimary px-6 py-3 rounded-full disabled:bg-opacity-70 bg-primary-500 hover:bg-primary-700 text-neutral-50 "
            onClick={handleNext}
          >
            {loading ? "Uploading..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyPicture;
