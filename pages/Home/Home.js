import { View, StyleSheet, ScrollView } from "react-native";
import { Navbar, MovieList } from "../../components";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <View style={styles.homeWrapper}>
      <Navbar onSearch={handleSearch} />
      <ScrollView style={styles.scrollViewContent}>
        <MovieList searchTerm={searchTerm} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  homepage: {},
  homeWrapper: {
    flex: 1,
    width: "100%", // Ocupar a largura total
    backgroundColor: "#242424",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
