import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../ui/IconButton";

export default function MapScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const initialState = route.params && {
    latitude : route.params.selectedLat,
    longitude : route.params.selectedLng
  }
  const [marker, setMarker] = useState(initialState);

  const region = {
    latitude: initialState? initialState.latitude : 30.70983,
    longitude: initialState? initialState.longitude : 76.68825,
    latitudeDelta: 0.0221,
    longitudeDelta: 0.0211,
  };

  function mapPressHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    if(initialState){
      return
    }
    setMarker({
      latitude: lat,
      longitude: lng,
    });
  }

  const saveButtonHandler = useCallback(() => {
    if (!marker) {
      Alert.alert("No location Picked", "Select a location on the map first");
      return ;
    }

    navigation.navigate("Add_Place", {
      latitude: marker?.latitude,
      longitude: marker?.longitude,
    });
  },[marker, navigation]);

  useLayoutEffect(() => {
    if(initialState){
      return
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon={"save"}
          size={22}
          color={tintColor}
          onPress={saveButtonHandler}
        />
      ),
    });
  }, [navigation, marker]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={mapPressHandler}
    >
      {marker && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
