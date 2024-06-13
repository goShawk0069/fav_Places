import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

export default function PlaceList({places}) {
  const navigation = useNavigation()

  function selectedItemHandler(id){
    navigation.navigate('Place_Details',{
      placeId : id
    })
  }

  if (!places || places.length === 0) {
    return (
      <View style = {styles.fallbackContainer}>
        <Text style = {styles.fallbackText}>No places added yet- start adding some</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
      style = {styles.list}
        data={places }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <PlaceItem onPress={selectedItemHandler} place={item} />;
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  list : {
    margin : 24
  },
    fallbackContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    fallbackText : {
        fontSize : 18,
         color : Colors.primary200
    }
});