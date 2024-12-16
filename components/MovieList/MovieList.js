import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import axios from "axios";
import { MovieCard } from "../../components";
import { config } from "../../config.js";
import { Alert } from "react-native";

// Constants
const apiKey = `${config.API_KEY}`;
const moviesDiscover = `${config.API_DISCOVER}`;

export default function MovieList({ searchTerm }) {
  const [moviesList, setMoviesList] = useState([]);

  const handleClick = (id) => {
    console.log(id);
  };

  const getMovies = async () => {
    try {
      const response = await axios.get(moviesDiscover, {
        params: {
          api_key: apiKey,
          language: "pt-BR",
        },
      });

      if (response.data?.results) {
        setMoviesList(response.data.results);
      } else {
        Alert.alert("Nenhum resultado", "A API retornou dados vazios.");
      }
    } catch (error) {
      Alert.alert("Erro na API", error.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const filteredMovies = moviesList.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderMovie = ({ item }) => (
    <MovieCard movie={item} handleClick={handleClick} />
  );

  const { width } = useWindowDimensions();

  // Define o número de colunas com base na largura da tela
  const numColumns = width > 768 ? 3 : width > 480 ? 2 : 1;

  return (
    <View style={styles.moviesContainer}>
      {moviesList.length <= 0 ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : filteredMovies.length > 0 ? (
        <FlatList
          data={filteredMovies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns} // Define o layout como uma grid com 2 colunas
          columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.notFoundText}>Nenhum filme encontrado</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  moviesContainer: {
    flex: 1,
    paddingTop: 10,
    flexWrap: "wrap",
    margin: "auto",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  notFoundText: {
    fontSize: 18,
    color: "#ff4d4d",
  },
});
