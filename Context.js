import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  // Função para carregar favoritos do AsyncStorage
  const loadFavoritesFromStorage = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      return storedFavorites ? JSON.parse(storedFavorites) : {};
    } catch (error) {
      console.error("Erro ao carregar favoritos do AsyncStorage:", error);
      return {};
    }
  };

  const [listFavorites, setListFavorites] = useState({});

  // Carregar favoritos do AsyncStorage ao inicializar
  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await loadFavoritesFromStorage();
      setListFavorites(favorites);
    };
    fetchFavorites();
  }, []);

  // Função para adicionar ou remover filmes dos favoritos
  const handleFavoriteList = async (movie) => {
    setListFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };

      if (newFavorites[movie.id]) {
        // Remove o filme da lista de favoritos
        delete newFavorites[movie.id];
      } else {
        // Adiciona o filme à lista de favoritos
        newFavorites[movie.id] = movie;
      }

      // Salva os favoritos no AsyncStorage
      AsyncStorage.setItem("favorites", JSON.stringify(newFavorites)).catch(
        (error) => console.error("Erro ao salvar favoritos no AsyncStorage:", error)
      );

      return newFavorites;
    });
  };

  // Objeto com o estado e as funções que queremos compartilhar
  const sharedState = {
    listFavorites,
    handleFavoriteList,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
