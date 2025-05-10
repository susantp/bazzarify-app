import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { LocationGeocodedAddress } from "expo-location";

export const useDeliveryComponentHook = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState<
    LocationGeocodedAddress | undefined
  >();

  useEffect(() => {
    getCurrentLocation().then(() => undefined);
  }, []);

  const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      Location.reverseGeocodeAsync(coords)
        .then((response) => {
          if (response.length > 0) {
            setDisplayCurrentAddress(response.at(0));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return {
    displayCurrentAddress,
  };
};
