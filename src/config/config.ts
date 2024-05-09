import axios from "axios";

export const config = {
  sendEmailEnabled: false,
};

export const sendEmail = async (
  listingId: string | string[] | undefined,
  recipientId: string | string[] | undefined,
  ownerId: string,
  selectedMessage: any,
  userInfo: any,
  listingTitle: string | string[] | undefined,
  pic: string | string[] | undefined,
  listingOwnerEmail: string | string[] | undefined,
  listingOwnerName: string | string[] | undefined
) => {
  if (!config.sendEmailEnabled) {
    return;
  }

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PRODU_URL
      : process.env.NEXT_PUBLIC_DEVE_URL;
  const Link = `${baseUrl}/messages?listingId=${listingId}&listingTitle=${listingTitle}&recipientId=${recipientId}&pic=${pic}&listingOwnerEmail=${listingOwnerEmail}&listingOwnerName=${listingOwnerName}`;

  const recipientEmail =
    ownerId === selectedMessage?.userId
      ? selectedMessage?.listingOwnerEmail
      : selectedMessage?.senderEmail;

  console.log({ recipientEmail });

  let emailBody;
  if (userInfo?.user?.name === selectedMessage?.listingOwnerName) {
    // The sender is the owner
    emailBody = `
          <p> Hi ${selectedMessage?.name},<br/> <br/> You have received a message from ${userInfo?.user?.name}, please click  <a href="${Link}">here </a> or on the button below to read your message.</p>
        `;
  } else {
    // The sender is not the owner
    emailBody = `  
          <p> Hi ${selectedMessage?.listingOwnerName}, You have received a message from ${userInfo?.user?.name}, please click  <a href="${Link}">here </a> or on the button below to read your message.</p>
        `;
  }

  console.log({ emailBody });

  axios
    .post("/api/chat/send-email", {
      email: recipientEmail,
      subject: "New Message Received",
      body: `
          <head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        </head>
        <div style="font-family: 'Roboto', Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          ${emailBody}
          <a href="${Link}" style="display: inline-block; background-color: #4338ca; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 16px; margin-top: 10px;">Go to my inbox</a>
        </div>
    `,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

// amenitiesConfig
export const amenityLabels: { [key: string]: string } = {
  "la-radiation-alt": "Air Conditioner",
  "la-door-open": "Private Entrance",
  "la-box": "Dishwasher",
  "la-swimming-pool": "Swimming Pool",
  "la-bath": "Jacuzzi",
  "la-box-open": "Washing Machine",
};
