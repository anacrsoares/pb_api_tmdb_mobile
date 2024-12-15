import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNavigation}>
      {/* Botão para Movies */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="film-outline" size={24} color="#fff" />
        <Text style={styles.navText}>Movies</Text>
      </TouchableOpacity>

      {/* Botão para Favorites */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Ionicons name="heart-outline" size={24} color="#fff" />
        <Text style={styles.navText}>Favorites</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#242424",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});
