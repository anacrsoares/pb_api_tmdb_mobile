import { View, StyleSheet } from "react-native";
import { Ionicons } from "react-native-vector-icons"; // Ícones para estrelas cheias e vazias

export default function StarRating({ rating }) {
  const numStars = Math.round(parseFloat(rating) / 2);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < numStars ? "star" : "star-outline"}
          size={20}
          color="#FFD700" // Cor dourada para as estrelas
        />
      );
    }
    return stars;
  };

  return <View style={styles.starContainer}>{renderStars()}</View>;
}

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
