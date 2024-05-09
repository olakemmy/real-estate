type Feature = {
  name: string;
  icon: string;
};

export interface formData {
  listingType: string;
  priceForRent: number | null;
  priceForBuy: number | null;
  address: string;
  detailedAddress: { street: string; city: string; state: string };
  title: string;
  amenities: Feature[];
  propertyImageList: string[];
  favourite: boolean;
  propertyAttributes: {
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    yearBuilt: string;
    size: string;
    propertyType: string;
    numberOfGarages: number;
    numeberOfGarages?: string | number | readonly string[] | undefined;
  };
  floorPlan: {
    numeberOfGarages?: string | number | readonly string[] | undefined;
    numberOfFloors: number;
    roomSize: string;
    bathroomSize: string;
  };
  description: string;
  // status: string
}

export interface PropertyAttributes {
  numberOfBedrooms: number | null;
  numberOfBathrooms: number | null;
  yearBuilt: string | null;
  size: string | null;
  propertyType: string | null;
  numberOfGarages: number | null;
}
