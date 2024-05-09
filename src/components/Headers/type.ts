export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
}

export type StaySearchFormFields = "Buy" | "Rent";

export interface PropertyType {
  name: string;
  checked: boolean;
}

export interface ClassOfProperties extends PropertyType {
  [key: string]: string | undefined | boolean;
}
export type DateRage = [Date | null, Date | null];
