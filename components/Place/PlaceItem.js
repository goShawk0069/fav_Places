import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

export default function PlaceItem({ place, onPress }) {
  return (
    <Pressable style = {({pressed})=> [styles.container , pressed && styles.pressed]} onPress={onPress.bind(this, place.id)}>
      <Image style = {styles.image} source={{ uri: place.imageUri }} />
      <View style = {styles.info}>
        <Text style={styles.txt}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    marginVertical: 12,
    elevation: 2,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor : 'black',
    shadowOpacity : 0.15,
    shadowOffset : {width : 1, height: 1},
    shadowRadius : 2
  },
  txt: {
    color: Colors.gray700,
    fontSize: 18,
    fontWeight : 'bold'
  },
  image: {
    flex: 1,
    borderBottomLeftRadius : 4,
    borderTopLeftRadius : 4,
    height : '100%'
  },
  info: {
    flex: 2,
    padding : 12
  },
  pressed : {
    opacity : 0.5
  },
  address : {
    color: Colors.gray700,
    fontSize: 18,
  }

});
