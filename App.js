import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import AppProvider from "./Context";

// components
import { BottomNav } from "./components";

// pages
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";

// Create Bottom Tabs
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const linking = {
  prefixes: ["http://localhost:8081"],
  config: {
    screens: {
      Home: "/",
      MovieDetails: "movie/:id", // Configurando Deep Linking para MovieDetails
      Favorites: "favorites",
    },
  },
};

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#242424" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Tela Inicial */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      {/* Tela de Detalhes */}
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{ title: "Detalhes do Filme" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer linking={linking}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false, // Oculta o cabeçalho do Tab Navigator
          }}
          tabBar={(props) => <BottomNav {...props} />} // Customiza a TabBar com BottomNav
        >
          {/* Telas do Bottom Navigator */}
          <Tab.Screen name="Home" component={MainStack} />
          <Tab.Screen name="Favorites" component={Favorites} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
