import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
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
          onPress={
            (onPress = () =>
              navigation.navigate("MovieDetails", {
                movieId: movie.id,
              }))
          }
        >
          <Text style={styles.seeMoreButtonText}>Ver mais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    maxWidth: 330,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "#000",
    margin: 10,
    borderWidth: 1,
    borderColor: "blue",
  },
  moviePosterImg: {
    width: "100%",
    height: 200,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },
  movieDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#ddd",
    marginBottom: 10,
  },
  seeMoreButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  seeMoreButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
