import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPlaceScreen from "./screens/AddPlaceScreen";
import AllPlacesScreen from "./screens/AllPlacesScreen";
import IconButton from "./ui/IconButton";
import { Colors } from "./constants/colors";
import MapScreen from "./screens/MapScreen";
import { useCallback, useEffect, useState } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetailsScreen from "./screens/PlaceDetailsScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitializing, setDbInitializing] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitializing(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitializing) {
      await SplashScreen.hideAsync();
    }
  }, [dbInitializing]);

  useEffect(() => {
    onLayoutRootView();
  }, [dbInitializing, onLayoutRootView]);

  if (!dbInitializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}
      >
        <Stack.Screen
          name="All_Places"
          component={AllPlacesScreen}
          options={({ navigation }) => ({
            title: "Your Favourite Screens",
            headerRight: ({ tintColor }) => (
              <IconButton
                icon={"add"}
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate("Add_Place")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Add_Place"
          component={AddPlaceScreen}
          options={{
            title: "Add New Place",
          }}
        />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Place_Details" component={PlaceDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
