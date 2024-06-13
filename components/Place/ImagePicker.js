import { Alert, Button, Image, View, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlineButton from "../../ui/OutlineButton";

export default function ImagePicker({onPickedImage}) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions, You need to grant Camera permissions"
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (image.canceled) {
      return;
    }

      const imageUri = image.assets[0].uri
    setPickedImage(imageUri);
    onPickedImage(imageUri)
  }

  
  

  let imagePreview = <Text>No image taken yet</Text>;
  if (pickedImage) {
    
    imagePreview = <Image style={styles.img} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imgPreview}>{imagePreview}</View>
      <OutlineButton icon={"camera"} onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imgPreview: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.primary100,
    padding: 5,
    marginVertical: 8,
  },
  img: {
    height: "100%",
    width: "100%",
  },
});
