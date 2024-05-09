import { gql } from "graphql-tag";


export const GET_AllProperties = gql`
  query GETAllProperties {
    allProperties {
      id
      listingType
      address
      title
      priceForBuy
      priceForRent
      propertyImageList
      propertyAttributes {
        numberOfGarages
        numberOfBedrooms
        numberOfBathrooms
        yearBuilt
        size
        propertyType
      }
      amenities {
        name
        icon
      }
      detailedAddress {
        city
        street
        state
      }
      favourite
      floorPlan {
        numberOfFloors
        roomSize
        bathroomSize
      }
      description
      createdAt
    }
  }
`;

export const GET_ALL_BUY_PROPERTIES = gql`
  query GetAllBuyProperties($listingType: propertyListingType!) {
    properties(listingType: $listingType) {
      id
      listingType
      address
      title
      priceForBuy
      priceForRent
      propertyImageList
      propertyAttributes {
        numberOfGarages
        numberOfBedrooms
        numberOfBathrooms
        yearBuilt
        size
        propertyType
      }
      amenities {
        name
        icon
      }
      detailedAddress {
        city
        street
        state
      }
      favourite
      floorPlan {
        numberOfFloors
        roomSize
        bathroomSize
      }
      description
      createdAt
    }
  }
`;

export const GET_ALL_RENT_PROPERTIES = gql`
  query GetAllRentProperties($listingType: propertyListingType!) {
    properties(listingType: $listingType) {
      id
      listingType
      address
      title
      priceForBuy
      priceForRent
      propertyImageList
      propertyAttributes {
        numberOfGarages
        numberOfBedrooms
        numberOfBathrooms
        yearBuilt
        size
        propertyType
      }
      amenities {
        name
        icon
      }
      detailedAddress {
        city
        street
        state
      }
      favourite
      floorPlan {
        numberOfFloors
        roomSize
        bathroomSize
      }
      description
      createdAt
    }
  }
`;


export const GET_USER_PROPERTIES_DATA = gql`
  query propertiesByUser(
    $userId: String!
    $listingType: propertyListingType!
  ) {
    propertiesByUser(
      userId: $userId
      listingType: $listingType
    ) {
      properties {
        property {
          id
          listingType
          address
          title
          status
          priceForBuy
          priceForRent
          propertyImageList
          propertyAttributes {
            numberOfGarages
            numberOfBedrooms
            numberOfBathrooms
            yearBuilt
            size
            propertyType
          }
          amenities {
            name
            icon
          }
          detailedAddress {
            city
            street
            state
          }
          favourite
          floorPlan {
            numberOfFloors
            roomSize
            bathroomSize
          }
          description
          createdAt
        }
        cursor
      }
      hasMore
    }
  }
`;

export const GET_USER_WISHLIST_PROPERTIES = gql`
  query wishlistByUser(
    $userId: String!
    $propertyListingType: propertyListingType!
  ) {
    wishlistByUser(
      userId: $userId
      propertyListingType: $propertyListingType
    ) {
      wishlist {
        property {
          id
          listingType
          address
          title
          priceForBuy
          priceForRent
          status
          propertyImageList
          propertyAttributes {
            numberOfGarages
            numberOfBedrooms
            numberOfBathrooms
            yearBuilt
            size
            propertyType
          }
          amenities {
            name
            icon
          }
          detailedAddress {
            city
            street
            state
          }
          favourite
          floorPlan {
            numberOfFloors
            roomSize
            bathroomSize
          }
          description
          createdAt
        }
        cursor
      }
      hasMore
    }
  }
`;


export const Get_Property = gql`
  query GetProperty($id: String!) {
    property(id: $id) {
      id
      listingType
      address
      title
      status
      priceForBuy
      priceForRent
      propertyImageList
      propertyAttributes {
        numberOfGarages
        numberOfBedrooms
        numberOfBathrooms
        yearBuilt
        size
        propertyType
      }
      amenities {
        name
        icon
      }
      detailedAddress {
        city
        street
        state
      }
      favourite
      floorPlan {
        numberOfFloors
        roomSize
        bathroomSize
      }
      description
      createdAt
      user {
        id
        email
        name
        address
        phoneNumber
        about
        profilePictureUrl
        website
        properties {
          id
          listingType
          address
          title
          priceForBuy
          priceForRent
          propertyImageList
        }
      }
    }
  }
`;

export const GET_USER_PROPERTIES = gql`
  query GetUserProperties($id: String!) {
    user(id: $id) {
      id
      email
      name
      address
      phoneNumber
      dateOfBirth
      gender
      createdAt
      about
      website
      profilePictureUrl
      wishlist {
        id
        listingType
        address
        status
        title
        priceForBuy
        priceForRent
        propertyImageList
        propertyAttributes {
          numberOfGarages
          numberOfBedrooms
          numberOfBathrooms
          yearBuilt
          size
          propertyType
        }
        amenities {
          name
          icon
        }
        detailedAddress {
          city
          street
          state
        }
        favourite
        floorPlan {
          numberOfFloors
          roomSize
          bathroomSize
        }
        description
        createdAt
      }
      properties {
        id
        listingType
        address
        title
        priceForBuy
        priceForRent
        propertyImageList
        propertyAttributes {
          numberOfGarages
          numberOfBedrooms
          numberOfBathrooms
          yearBuilt
          size
          propertyType
        }
        amenities {
          name
          icon
        }
        detailedAddress {
          city
          street
          state
        }
        favourite
        floorPlan {
          numberOfFloors
          roomSize
          bathroomSize
        }
        description
        createdAt
      }
    }
  }
`;


