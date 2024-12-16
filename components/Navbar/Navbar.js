import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "react-native-vector-icons"; // Usando ícones do Ionicons
import { useNavigation } from "@react-navigation/native"; // Usando navegação do React Navigation

export default function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();

  const handleSearch = (text) => {
    setSearchTerm(text);
    onSearch(text);
    console.log(text);
  };

  return (
    <View style={styles.containerNavbar}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.logoText}>2098Movies</Text>
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={handleSearch}
            placeholder="Procure seu filme"
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => handleSearch(searchTerm)}
          >
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerNavbar: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    backgroundColor: "#333", // Cor de fundo escura
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingTop: 25,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logoText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    flex: 1,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingLeft: 15,
    fontSize: 16,
    flex: 1,
  },
  searchButton: {
    backgroundColor: "#5cb85c",
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
  },
});
