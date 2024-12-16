import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import StarRating from "../StarRating/StarRating";
import { config } from "../../config";
import { useNavigation } from "@react-navigation/native";

// Constants
const posterImage = `${config.IMG}`;

export default function MovieCard({ movie, handleClick }) {
  const navigation = useNavigation();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    handleClick(movie.id);
  };

  const isFavorited = movie.id in listFavorites;

  return (
    <View style={styles.cardContainer}>
      {/* Imagem do pôster */}
      <Image
        source={{ uri: `${posterImage}/${movie.poster_path}` }}
        style={styles.moviePosterImg}
      />

      {/* Informações do filme */}
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>
          {movie.title}
          <StarRating rating={movie.vote_average} />
        </Text>

        {/* Botão de Favoritar */}
        <TouchableOpacity onPress={handleFavorite}>
          <Ionicons
            name={isFavorited ? "heart" : "heart-outline"}
            size={24}
            color="red"
          />
        </TouchableOpacity>

        {/* Descrição do filme */}
        {movie.overview && (
          <Text style={styles.movieDescription}>
            {movie.overview.length > 150
              ? `${movie.overview.substring(0, 150)}...`
              : movie.overview}
          </Text>
        )}

        {/* Botão "Ver mais" */}
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={() => navigation.navigate("MovieDetails", { id: movie.id })}
        >
          <Text style={styles.seeMoreButtonText}>Ver mais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    maxWidth: 300,
    width: 300,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)", // equivalente ao estilo de sombra
    elevation: 5,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "blue",
    marginBottom: 20,
  },
  moviePosterImg: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderBottomWidth: 1,
    borderBottomColor: "violet",
  },
  movieInfo: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  movieTitle: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },
  movieDescription: {
    padding: 5,
    fontSize: 14,
    lineHeight: 20,
    color: "#ddd",
    marginBottom: 10,
  },
  seeMoreButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    width: 200,
  },
  seeMoreButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
