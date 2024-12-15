import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useAppContext } from "../../Context";
import StarRating from "../../components/StarRating/StarRating";
import { config } from "../../config";

const posterImage = `${config.IMG}`; // Substitua pela URL real

export default function Favorites() {
  const { listFavorites } = useAppContext();

  if (Object.keys(listFavorites).length === 0) {
    return <Text>Nenhum filme favorito</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Filmes Favoritos</Text>
      <View style={styles.listContainer}>
        {Object.values(listFavorites).map((movie) => (
          <View key={movie.id} style={styles.favoriteItem}>
            {/* Imagem do pôster */}
            <View style={styles.posterContainer}>
              <Image
                source={{ uri: `${posterImage}/${movie.poster_path}` }}
                style={styles.moviePoster}
              />
            </View>

            {/* Informações do filme */}
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.movieOverview}>
                {movie.overview.length > 150
                  ? `${movie.overview.substring(0, 150)}...`
                  : movie.overview}
              </Text>
              <StarRating rating={movie.vote_average} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  listContainer: {
    flexDirection: "column",
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  posterContainer: {
    marginRight: 20,
  },
  moviePoster: {
    width: 80,
    height: 120,
    resizeMode: "cover",
    borderRadius: 5,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  movieOverview: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 10,
  },
});
