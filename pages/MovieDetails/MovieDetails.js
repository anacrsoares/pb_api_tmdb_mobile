import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { BsGraphUp, BsWallet2, BsHourglassSplit } from "react-icons/bs"; // Ícones substituíveis por react-native-vector-icons
import { Ionicons } from "react-native-vector-icons"; // Para substituição de ícones (opcional)
import { config } from "../../config";

const apiKey = `${config.API_KEY}`;
const movieTopLevelDetails = `${config.MOVIE_TOP_LEVEL_DETAILS}`;
const posterURL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails({ route }) {
  const { id } = route.params; // Recebendo o `id` via props de navegação
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const movieURL = `${movieTopLevelDetails}/${id}?${apiKey}`;

  const getMovie = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Zjg5MWU4NDViZDYyZGQ3MDFmZjk0NGUxNGU1OGZjMCIsIm5iZiI6MTcyOTU1MDgyOS43ODY1OSwic3ViIjoiNjZmYWZkMTdmOTA2Yjk4OTU4ZjFhMTljIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.W_22dKv7OqqyfEb_FwdE98DbGAGFtpc2BmQ4PfWoQj8",
      },
    };

    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(`${movieTopLevelDetails}/${id}`, {
            params: { api_key: apiKey, language: "pt-BR" },
          });
          setMovie(response.data);
        } catch (error) {
          console.error("Erro ao buscar detalhes do filme:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMovieDetails();
    }, [id]);

    if (loading) {
      return (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      );
    }

    if (!movie) {
      return (
        <View style={styles.container}>
          <Text>Detalhes do filme não encontrados.</Text>
        </View>
      );
    }

    const formatDate = (date) => {
      const year = date.split("-")[0];
      const month = date.split("-")[1];
      const day = date.split("-")[2];

      return `${day}-${month}-${year}`;
    };

    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#FFD700"
          style={styles.loading}
        />
      );
    }

    return (
      <ScrollView style={styles.container}>
        {movie && (
          <>
            <View style={styles.movieHeader}>
              <Text style={styles.movieTitle}>
                {movie.title}{" "}
                <Text style={styles.originalTitle}>
                  ({movie.original_title})
                </Text>
              </Text>
              <Image
                source={{
                  uri: movie.poster_path
                    ? `${posterURL}${movie.poster_path}`
                    : `${posterURL}${movie.belongs_to_collection?.poster_path}`,
                }}
                style={styles.movieImage}
              />
            </View>

            <View style={styles.movieMainInfo}>
              <Text style={styles.runtime}>
                <Ionicons name="time-outline" size={16} color="white" />{" "}
                Duração: {movie.runtime} min
              </Text>
              <Text>Data de Lançamento: {formatDate(movie.release_date)}</Text>

              <View style={styles.infoBudget}>
                <Text style={styles.infoHeader}>Orçamento e Receita</Text>
                <Text style={styles.budgetItem}>
                  <Ionicons name="bar-chart-outline" size={16} color="white" />{" "}
                  {movie.budget.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Text>
                <Text style={styles.budgetItem}>
                  <Ionicons name="wallet-outline" size={16} color="white" />{" "}
                  {movie.revenue.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Text>
              </View>
            </View>

            <View style={styles.infoSynopsis}>
              <Text style={styles.infoHeader}>Sinopse</Text>
              <Text style={styles.synopsisText}>{movie.overview}</Text>
            </View>
          </>
        )}
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      padding: 10,
    },
    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000",
    },
    movieHeader: {
      alignItems: "center",
    },
    movieTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      marginBottom: 10,
      textAlign: "center",
    },
    originalTitle: {
      fontSize: 16,
      color: "#aaa",
    },
    movieImage: {
      width: "80%",
      height: 300,
      resizeMode: "cover",
      borderRadius: 10,
      marginBottom: 20,
    },
    movieMainInfo: {
      marginVertical: 20,
    },
    runtime: {
      fontSize: 16,
      color: "white",
      marginBottom: 10,
    },
    infoBudget: {
      marginVertical: 10,
    },
    infoHeader: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#FFD700",
      marginBottom: 10,
    },
    budgetItem: {
      fontSize: 16,
      color: "white",
      marginBottom: 5,
    },
    infoSynopsis: {
      marginVertical: 20,
    },
    synopsisText: {
      fontSize: 16,
      color: "#ddd",
      lineHeight: 24,
    },
  });
}
