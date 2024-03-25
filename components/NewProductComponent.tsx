import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export interface Props {
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  countInStock: number;
  id: string;
  isFavourite?: boolean;
  idFavourite?: string;
}

const NewProductComponent = (prop: Props) => {
  const {
    name,
    price,
    image,
    category,
    rating,
    countInStock,
    id,
    isFavourite,
    idFavourite,
  } = prop;
  const [wishlist, setWishlist] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const [wishlistId, setWishlistId] = useState(idFavourite);

  const addToWishlist = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token || !id) {
        throw new Error("Token or product id is missing");
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/favorites`,
        { product: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(true);
      setFavorite(response.data);
      setWishlistId(response.data._id);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = axios.delete(
        `${process.env.REACT_APP_API_URL}/favorites/${wishlistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log(id);
        router.navigate({
          pathname: "productDetail",
          params: { id: id },
        });
      }}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.price}>{price} VNĐ</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingView}>
            <AntDesign name="star" size={16} color="orange" />
            <Text style={styles.rating}>{rating}</Text>
          </View>
          <Text style={styles.stock}>Còn: {countInStock} sản phẩm</Text>
        </View>
      </View>
      {isFavourite && (
        <AntDesign
          name="hearto"
          size={24}
          color={prop.isFavourite ? "red" : "black"}
          onPress={() => {
            if (wishlist) {
              removeFromWishlist();
            } else {
              addToWishlist(id);
            }
          }}
          style={{ marginEnd: 10 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default NewProductComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    marginEnd: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    color: "gray",
    fontSize: 16,
  },
  price: {
    color: "red",
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 10,
  },
  ratingView: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginStart: 5,
  },
  stock: {
    color: "gray",
  },
});
