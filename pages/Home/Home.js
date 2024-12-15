import { View, StyleSheet } from "react-native";
import { Navbar, MovieList } from "../../components";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <View style={styles.homepage}>
      <Navbar onSearch={handleSearch} />
      <View style={styles.homeWrapper}>
        <MovieList searchTerm={searchTerm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homepage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // Adicione uma cor de fundo, se necessário
  },
  homeWrapper: {
    flex: 1,
    width: "100%", // Ocupar a largura total
    paddingHorizontal: 10, // Espaço lateral (opcional)
  },
});
