import { useIsFocused, useRoute } from "@react-navigation/native";
import PlaceList from "../components/Place/PlaceList";
import { useEffect, useState } from "react";
import { fetchPlaces } from "../util/database";

export default function AllPlacesScreen() {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    async function loadPlaces() {
       const places = await fetchPlaces();
       
       setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
      }
  }, [isFocused]);

  return <PlaceList places={loadedPlaces} />;
}
