import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../../ui/OutlineButton";
import { Colors } from "../../constants/colors";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import getUserLocation, { formattedAddress } from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export default function LocationPicker({ onPickedLocation }) {
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState();
  const [locationPermissionStatus, requestPermission] =
    Location.useForegroundPermissions();

  useEffect(() => {
    if (route.params && isFocused) {
      const { latitude, longitude } = route.params;
      if (latitude && longitude) {
        setCurrentLocation({ lat: latitude, lng: longitude });
      }
    }
  }, [isFocused, route]);

  async function verifyPermissions() {
    if (
      locationPermissionStatus.status === Location.PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionStatus.status === Location.PermissionStatus.DENIED) {
      Alert.alert(
        "Location Permission Denied",
        "Allow Location access to use this feature"
      );
      return false;
    }
    return true;
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const position = await Location.getCurrentPositionAsync();
    setCurrentLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location Picked yet</Text>;

  if (currentLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getUserLocation(currentLocation.lat, currentLocation.lng),
        }}
      />
    );
  }

  useEffect(() => {
    async function handleLocation() {
      if (currentLocation) {
        const address = await formattedAddress(
          currentLocation.lat,
          currentLocation.lng
        );
        onPickedLocation({...currentLocation, address: address});
      }
    }
    handleLocation()
  }, [currentLocation, onPickedLocation]);

  return (
    <View>
      <View style={styles.preview}>{locationPreview}</View>
      <View style={styles.buttons}>
        <OutlineButton icon={"location"} onPress={getLocationHandler}>
          Get Location
        </OutlineButton>
        <OutlineButton icon={"map"} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    backgroundColor: Colors.primary100,
    width: "100%",
    height: 200,
    marginVertical: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  buttons: {
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  image: {
    flex: 1,
    // width: "100%",
    // height: "100%",
  },
});
