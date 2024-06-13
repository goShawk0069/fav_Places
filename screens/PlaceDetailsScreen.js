import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../ui/OutlineButton";
import { useEffect, useState } from "react";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PlaceDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [selectedPlace, setSelectedPlace] = useState();
  function showOnMap() {
    navigation.navigate("Map",{
      selectedLat : selectedPlace.lat ,
      selectedLng : selectedPlace.lng 
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadDetails() {
      const placeArray = await fetchPlaceDetails(selectedPlaceId);
      const place =  placeArray[0];
      setSelectedPlace(place);
      navigation.setOptions({
        title : place.title ? place.title : "No Title"
      })
    }
    loadDetails();
  }, [selectedPlaceId]);

  if (!selectedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Data...</Text>
      </View>
    );
  }



  return (
    <ScrollView>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <OutlineButton icon={"map"} onPress={showOnMap}>
          Click to see in map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
