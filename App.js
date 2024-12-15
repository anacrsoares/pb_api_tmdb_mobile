import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Favorites, MovieDetails } from "./pages";
import AppProvider from "./Context";
import { COLORS } from "./globals";
import { BottomNav } from "./components";

// Create Bottom Tabs
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const scheme = useColorScheme(); // Detecta light ou dark

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Abas principais como uma tela do Stack */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          {/* Tela de detalhes */}
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetails}
            options={{
              title: "Detalhes do Filme",
              headerStyle: {
                backgroundColor:
                  scheme === "dark"
                    ? COLORS.darkBackground
                    : COLORS.yellowBackground,
              },
              headerTintColor:
                scheme === "dark" ? COLORS.lightFontDefault : COLORS.darkFont,
            }}
          />
        </Stack.Navigator>
        <BottomNav />
      </NavigationContainer>
    </AppProvider>
  );
}

// Configuração das abas principais
function MainTabs() {
  const scheme = useColorScheme(); // Detecta light ou dark

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:
            scheme === "dark" ? COLORS.darkBackground : COLORS.yellowBackground,
          paddingBottom: 5,
        },
        tabBarActiveTintColor:
          scheme === "dark" ? COLORS.lightFontDefault : COLORS.darkFont,
        tabBarInactiveTintColor: COLORS.lightBlackFont,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightBlackFont,
    padding: 10,
    width: "80%",
  },
});
