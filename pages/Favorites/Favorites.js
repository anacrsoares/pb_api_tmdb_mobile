import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useAppContext } from "../../Context";
import StarRating from "../../components/StarRating/StarRating";
import { config } from "../../config";

const posterImage = `${config.IMG}`;

export default function Favorites() {
  const { listFavorites } = useAppContext();

  // Verificar se a lista de favoritos está vazia
  if (!listFavorites || Object.keys(listFavorites).length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum filme favorito.</Text>
      </View>
    );
  }

  return (
    <>
      <Text style={styles.bar} />
      <Text style={styles.title}>Filmes Favoritos</Text>
      <ScrollView style={[styles.container, styles.scrollViewContent]}>
        <View style={styles.listContainer}>
          {Object.values(listFavorites).map((movie) => {
            // Verifique se `movie` e suas propriedades existem
            if (!movie || !movie.poster_path) {
              return null; // Pule filmes inválidos
            }

            return (
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
                  <Text style={styles.movieTitle}>
                    {movie.title || "Sem título"}
                  </Text>
                  <Text style={styles.movieOverview}>
                    {movie.overview
                      ? movie.overview.length > 0
                        ? `${movie.overview.substring(0, 1000)}`
                        : movie.overview
                      : "Descrição indisponível."}
                  </Text>
                  <StarRating rating={movie.vote_average || 0} />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555",
    paddingHorizontal: 50,
    // marginBottom: 50,
  },
  title: {
    padding: 20,
    fontSize: 20,
    backgroundColor: "#555",
    textAlign: "center",
    color: "#fff",
  },
  bar: {
    position: "fixed", // Fixa o componente no topo
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: "#333",
    padding: 10,
    zIndex: 1,
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
    textAlign: "justify",
  },
});
