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

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer linking={linking}>
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
            options={{ title: "Filmes" }}
          />

          {/* Tela de Detalhes */}
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetails}
            options={{ title: "Detalhes do Filme" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
