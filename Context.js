import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  // shared functions
  const loadFavoritesFromStorage = async () => {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  };

  const [listFavorites, setListFavorites] = useState(loadFavoritesFromStorage);

  // Carregar favoritos do AsyncStorage ao iniciar o app
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          setListFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };
    loadFavorites();
  }, []);

  // Função para adicionar ou remover filmes dos favoritos
  const handleFavoriteList = (movie) => {
    setListFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };

      if (newFavorites[movie.id]) {
        // Remove o filme da lista de favoritos
        delete newFavorites[movie.id];
      } else {
        newFavorites[movie.id] = movie; // Adiciona se não está nos favoritos
      }

      // Salva os favoritos no localStorage
      try {
        AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
        return newFavorites;
      } catch (error) {
        console.error("Erro ao salvar favoritos:", error);
      }
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
