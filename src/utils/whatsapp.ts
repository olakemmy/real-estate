import queryString from "query-string";

export const getWhatsAppUrl = (phone:String, message: String) => {
  const baseUrl = "https://wa.me";
  const queryParams = queryString.stringify({
    phone,
    text: message,
  });
  return `${baseUrl}/?${queryParams}`;
};

