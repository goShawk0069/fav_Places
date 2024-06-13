import { View } from "react-native";
import AddPlaceForm from "../components/Place/AddPlaceForm";
import ImagePicker from "../components/Place/ImagePicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { insertPlaces } from "../util/database";

export default function AddPlaceScreen(){
  const navigaiton = useNavigation()
  async function createPlaceHandler(place){
    await insertPlaces(place);
    navigaiton.navigate("All_Places")
    
  }
  return (
    <View>
        <AddPlaceForm onCreatePlace={createPlaceHandler}/>
        
    </View>
  );
};
