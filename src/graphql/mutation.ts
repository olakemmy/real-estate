import { gql } from "graphql-tag";

export const REGISTER_MUTATION = gql`
  mutation registerUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      id
      email
      name
      phoneNumber
      about
      gender
      address
      dateOfBirth
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

export const VERITY_EMAIL_MUTATION = gql`
  mutation verifyEmail($email: String!, $token: String!) {
    verifyEmail(email: $email, token: $token)
  }
`;

export const NEWSLETTER_MUTATION = gql`
  mutation subscribeToNewsletter($email: String!) {
    subscribeToNewsletter(email: $email)
  }
`;
export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation requestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    )
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: String!
    $email: String
    $phoneNumber: String
    $about: String
    $address: String
    $dateOfBirth: String
    $name: String
    $gender: gender
    $profilePictureUrl: String
    $website: String
  ) {
    updateUser(
      email: $email
      id: $id
      phoneNumber: $phoneNumber
      about: $about
      address: $address
      dateOfBirth: $dateOfBirth
      name: $name
      gender: $gender
      profilePictureUrl: $profilePictureUrl
      website: $website
    ) {
      id
      email
      phoneNumber
      about
      address
      dateOfBirth
      gender
      name
      gender
      profilePictureUrl
      website
    }
  }
`;

export const CREATE_LISTING = gql`
  mutation CreateListing(
    $userId: ID!
    $listingType: propertyListingType!
    $priceForBuy: Int
    $priceForRent: Int
    $address: String!
    $title: String!
    $propertyImageList: [String]!
    $favourite: Boolean
    $numberOfBedrooms: Int!
    $numberOfBathrooms: Int!
    $yearBuilt: String
    $size: String
    $propertyType: String!
    $numberOfGarages: Int
    $numberOfFloors: Int
    $roomSize: String
    $bathroomSize: String
    $description: String!
    $street: String!
    $city: String!
    $state: String!
    $amenities: [AmenitiesInput]
  ) {
    createListing(
      userId: $userId
      listingType: $listingType
      priceForBuy: $priceForBuy
      priceForRent: $priceForRent
      address: $address
      title: $title
      propertyImageList: $propertyImageList
      favourite: $favourite
      numberOfBedrooms: $numberOfBedrooms
      numberOfBathrooms: $numberOfBathrooms
      yearBuilt: $yearBuilt
      size: $size
      propertyType: $propertyType
      numberOfGarages: $numberOfGarages
      numberOfFloors: $numberOfFloors
      roomSize: $roomSize
      bathroomSize: $bathroomSize
      description: $description
      street: $street
      city: $city
      state: $state
      amenities: $amenities
    ) {
      id
      listingType
      priceForBuy
      priceForRent
      address
      title
      propertyImageList
      favourite
      propertyAttributes {
        numberOfBedrooms
        numberOfBathrooms
        yearBuilt
        size
        propertyType
        numberOfGarages
      }
      amenities {
        name
        icon
      }
      detailedAddress {
        street
        city
        state
      }
      floorPlan {
        numberOfFloors
        roomSize
        bathroomSize
      }
      description
    }
  }
`;

export const UPDATE_LISTING = gql`
  mutation UpdateListing(
    $id: ID!
    $listingType: propertyListingType
    $priceForBuy: Int
    $priceForRent: Int
    $address: String
    $title: String
    $status: String
    $propertyImageList: [String]
    $favourite: Boolean
    $description: String
    $detailedAddress: DetailedAddressInput
    $propertyAttributes: PropertyAttributesInput
    $floorPlan: FloorPlanInput
    $amenities: [AmenitiesInputUpdate]
  ) {
    updateProperty(
      id: $id
      listingType: $listingType
      priceForBuy: $priceForBuy
      priceForRent: $priceForRent
      address: $address
      title: $title
      status: $status
      propertyImageList: $propertyImageList
      favourite: $favourite
      description: $description
      detailedAddress: $detailedAddress
      propertyAttributes: $propertyAttributes
      floorPlan: $floorPlan
      amenities: $amenities
    ) {
      id
      listingType
      priceForBuy
      priceForRent
      address
      title
      status
      propertyImageList
      favourite
      propertyAttributes {
        numberOfBedrooms
        numberOfBathrooms
        yearBuilt
        size
        propertyType
        numberOfGarages
      }
      amenities {
        name
        icon
      }
      detailedAddress {
        street
        city
        state
      }
      floorPlan {
        numberOfFloors
        roomSize
        bathroomSize
      }
      description
    }
  }
`;

export const ADD_WISHLIST = gql`
  mutation addToWishlist($userId: String!, $propertyId: String!) {
    addToWishlist(userId: $userId, propertyId: $propertyId) {
      id
      wishlist {
        id
        listingType
      }
    }
  }
`;

export const REMOVE_WISHLIST = gql`
  mutation removeFromWishList($userId: String!, $propertyId: String!) {
    removeFromWishList(userId: $userId, propertyId: $propertyId) {
      id
      wishlist {
        id
        listingType
      }
    }
  }
`;

export const DELETE_PROPERTY_IMAGE = gql`
  mutation DeletePropertyImage($id: String!, $imageIndex: Int!) {
    deletePropertyImage(id: $id, imageIndex: $imageIndex) {
      id
    }
  }
`;

export const DELETE_PROPERTY = gql`
  mutation DeleteProperty($propertyId: String!, $userId: String!) {
    deleteProperty(propertyId: $propertyId, userId: $userId) {
      id
      email
      name
      address
      phoneNumber
      dateOfBirth
      gender
      about
      website
      profilePictureUrl
      wishlist {
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


