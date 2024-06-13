import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../../ui/Button";
import { Place } from "../../models/place";

export default function AddPlaceForm({onCreatePlace}) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedImage, setPickedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();


  function textChangeHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function imagePickHandler(image) {
    setPickedImage(image)
  }

  const locationPickHandler= useCallback((location)=> {
    setPickedLocation(location)
  },[])

  function savePlaceHandler() {
    const place = new Place(enteredTitle,pickedLocation,pickedImage)
    onCreatePlace(place)
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={textChangeHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onPickedImage={imagePickHandler} />
      <LocationPicker onPickedLocation={locationPickHandler} />
      
        <Button onPress={savePlaceHandler}>Add Place</Button>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  text: {
    color: Colors.primary500,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 6,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
  btn: {
    alignItems: "center",
    marginVertical: 8,
  },
});
