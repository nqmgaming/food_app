import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import NewProductComponent from "@/components/NewProductComponent";

const favorite = () => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const favorites = await axios.get(
        `${process.env.REACT_APP_API_URL}/favorites/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFavorites(favorites.data);
      console.log("aaaaa" + favorites.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          margin: 10,
          backgroundColor: "white",
        }}
      >
        {favorites.map((item) => (
          <NewProductComponent
            key={item._id}
            name={item.product.name}
            price={item.product.price}
            image={item.product.image}
            category={item.product.category}
            rating={item.product.rating}
            countInStock={item.product.countInStock}
            id={item.product._id}
            isFavourite={true}
            idFavourite={item._id}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default favorite;

const styles = StyleSheet.create({});
