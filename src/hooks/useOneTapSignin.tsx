import { useState } from "react";
import { useSession, signIn, SignInOptions } from "next-auth/react";

interface OneTapSigninOptions {
  parentContainerId?: string;
}

const useOneTapSignin = (
  options?: OneTapSigninOptions &
    Pick<SignInOptions, "redirect" | "callbackUrl">
) => {
  const { parentContainerId } = options || {};
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // New state variable

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      if (!isLoading && !isSignedIn) {
        // Check if user is not signed in
        const { google } = window;
        if (google) {
          google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: async (response: any) => {
              setIsLoading(true);
              const redirectUrl = new URLSearchParams(
                window.location.search
              ).get("redirect");
              await signIn("google", {
                callbackUrl: `${redirectUrl || "/"}`,
              });

              setIsLoading(false);
              setIsSignedIn(true); // Set isSignedIn to true after sign-in
            },
            prompt_parent_id: parentContainerId,
          });

          google.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed()) {
              console.log(
                "getNotDisplayedReason ::",
                notification.getNotDisplayedReason()
              );
            } else if (notification.isSkippedMoment()) {
              console.log(
                "getSkippedReason  ::",
                notification.getSkippedReason()
              );
            } else if (notification.isDismissedMoment()) {
              console.log(
                "getDismissedReason ::",
                notification.getDismissedReason()
              );
            }
          });
        }
      }
    },
  });


  return { isLoading };
};

export default useOneTapSignin;
