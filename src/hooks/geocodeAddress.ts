
import axios from "axios";

export async function geocodeAddressWithNominatim(address: string | number | boolean) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      const coordinates = [parseFloat(lon), parseFloat(lat)];
      return coordinates;
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error geocoding address:", error);
    throw error;
  }
}

// import axios from "axios";

// export async function geocodeAddressWithBingMaps(address: string | number | boolean, apiKey: any) {
//   try {
//     const response = await axios.get(
//       `https://dev.virtualearth.net/REST/v1/Locations?query=${encodeURIComponent(
//         address
//       )}&key=${apiKey}`
//     );

//     if (
//       response.data.resourceSets.length > 0 &&
//       response.data.resourceSets[0].resources.length > 0
//     ) {
//       const { coordinates } = response.data.resourceSets[0].resources[0].point;
//       return coordinates;
//     } else {
//       throw new Error("No results found");
//     }
//   } catch (error) {
//     console.error("Error geocoding address:", error);
//     throw error;
//   }
// }

