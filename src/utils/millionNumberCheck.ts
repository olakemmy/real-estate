export const millionNumberCheck = (x?: number): string => {
  if (typeof x !== "number") {
    return "";
  }

  if (x >= 100000) {
    const millionValue = (x / 1000000).toFixed(2);
    return millionValue + "m";
  }

  return x.toLocaleString("en-US");
};
