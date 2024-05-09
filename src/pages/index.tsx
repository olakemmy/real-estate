import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import BackgroundSection from "@/components/BackgroundSection";
import {
  AppDispatch,
  fetchProperties,
  useAppDispatch,
} from "@/features/properties/propertiesApi";
import SectionGridFeatureProperty from "@/components/SectionGridFeatureProperty";
import SectionDowloadApp from "@/components/SectionDowloadApp";
import SectionHero2 from "@/components/SectionHero2";
import { useSession } from "next-auth/react";
import { fetchUserProperties } from "@/features/user/userApi";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER_MUTATION } from "@/graphql/mutation";
import { setCurrentUser } from "@/features/user/userSlice";

interface CustomUser {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

let socket: any;

function PageHome2() {
  const { data, loading, error, wishlist } = useSelector(
    (state: any) => state.properties
  );

  const { userInfo } = useSelector((state: any) => state.user);
  const currentUser = userInfo?.user;
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  const { token } = useSelector((state: any) => state.user);

  const { data: session } = useSession();

  const [loadingdata, setLoadingData] = useState(false);

  const userId = (session?.user as CustomUser)?.id;
  console.log({ userId });

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    const updateProfilePicture = async () => {
      if (
        (token || session) &&
        currentUser?.profilePictureUrl !== (session?.user?.image || null)
      ) {
        try {
          const variables = {
            id: `${currentUser.id}`,
            profilePictureUrl:
              session?.user?.image || currentUser?.profilePictureUrl,
          };

          setLoadingData(true);
          const { data } = await updateUser({ variables });
          dispatch(setCurrentUser(data.updateUser));
          setLoadingData(false);
        } catch (error) {
          console.error("Error updating profile picture:", error);
          setLoadingData(false);
        }
      }
    };

    updateProfilePicture();
  }, [token, session, currentUser, updateUser, dispatch]);



  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);


  useEffect(() => {
    if (session) {
      dispatch(fetchUserProperties(userId));
    }
  }, [userId, dispatch]);


  return (
    <>
      {!session && !token && (
        <div id="oneTap" className="fixed z-50 top-0 right-0 " />
      )}
      <main className="nc-PageHome2 relative overflow-hidden">
        <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
          <SectionHero2 className="" />

          <div className="relative py-16">
            <BackgroundSection />
            <SectionGridFeatureProperty properties={data} loading={loading} />
          </div>
          <SectionDowloadApp />

          <SectionSubscribe2 />


        </div>
      </main>
    </>
  );
}

export default PageHome2;
