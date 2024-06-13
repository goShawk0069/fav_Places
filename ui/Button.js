import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

export default function Button({children, onPress}){
  return (
    <Pressable  style = {({pressed})=>[styles.container , pressed && styles.pressed]} onPress={onPress}>
        
    <Text style = {styles.text}>{children}</Text>
    
    </Pressable>
  );
};

const styles = StyleSheet.create({
    container : {
        
        backgroundColor : Colors.primary800,
        marginTop : 18,
        marginHorizontal : 8,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 6,
        overflow : 'hidden',
        borderRadius : 3,
       
    
    },
    text : {
        color : 'white',
        fontWeight : "600",
        fontSize : 16
    },
    pressed : {
        opacity : 0.5
    }
});