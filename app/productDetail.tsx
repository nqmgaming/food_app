import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import axios from "axios";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import Comment from "@/components/CommentComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const productDetail = () => {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState("");
  const [wishlist, setWishlist] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [wishlistId, setWishlistId] = useState("");
  const global = useGlobalSearchParams();
  const { id } = global;

  const getProductById = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const product = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/${id}`
      );
      const comments = await axios.get(
        `${process.env.REACT_APP_API_URL}/comments/${id}`
      );
      const wishlist = await axios.get(
        `${process.env.REACT_APP_API_URL}/favorites/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(comments.data);
      setProduct(product.data);
      setFavorite(wishlist.data);
      if (wishlist.data.length > 0) {
        setWishlist(true);
        setWishlistId(wishlist.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token || !productId) {
        throw new Error("Token or product id is missing");
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/favorites`,
        { product: productId },
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

  const getUserInfo = async () => {
    try {
      // Get the token from local storage
      const token = await AsyncStorage.getItem("token");

      // Send a GET request to the /users/me endpoint with the token in the Authorization header
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Get the user ID from the response
      const userId = response.data._id;
      setUserId(userId);
    } catch (error) {
      console.log(error);
    }
  };

  // set viewed product

  const setViewedProduct = async (productId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token || !productId) {
        throw new Error("Token or product id is missing");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/viewed-products/${productId}`,
        {
          id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductById(id);
    getUserInfo();
    setViewedProduct(id);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <View style={styles.productName}>
          <Text style={styles.productNameText}>{product.name}</Text>
          <AntDesign
            name="hearto"
            size={24}
            color={wishlist ? "red" : "black"}
            onPress={() => {
              if (wishlist) {
                removeFromWishlist();
              } else {
                addToWishlist(product._id);
              }
            }}
          />
        </View>
        <Text style={styles.productDescription}>{product.description}</Text>
        <View style={styles.productRating}>
          <AntDesign name="star" size={20} color="orange" />
          <Text style={styles.productRatingText}>{product.rating}</Text>
          <View style={styles.productReviews}>
            <Text>{product.numReviews} lượt review</Text>
            <Text>Còn: {product.countInStock} sản phẩm</Text>
          </View>
        </View>
        <View style={styles.productCategory}>
          <Text>
            <Text style={styles.productCategoryTitle}>Danh mục:</Text>
            <Text style={styles.productCategoryText}>{product.category}</Text>
          </Text>
          <Text style={styles.productPrice}>Giá: {product.price} VNĐ</Text>
        </View>
      </View>
      <View style={styles.productBrand}>
        <View style={styles.productBrandInfo}>
          <Image
            source={{ uri: product.image }}
            style={styles.productBrandImage}
          />
          <Text style={styles.productBrandName}>{product.brand}</Text>
        </View>
        <SimpleLineIcons name="user-follow" size={24} color="black" />
      </View>
      <View style={styles.comments}>
        <Text style={styles.commentsTitle}>Bình luận</Text>
        <View>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default productDetail;

const styles = StyleSheet.create({
  container: {},
  image: {
    width,
    height: 250,
  },
  productInfo: {
    backgroundColor: "#fff",
    padding: 10,
  },
  productName: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
  },
  productNameText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left", // Fix: Change "start" to "left"
    flex: 1,
  },
  productDescription: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 10,
  },
  productRating: {
    flexDirection: "row",
    marginTop: 10,
    gap: 5,
    alignItems: "center",
    marginLeft: 10,
  },
  productRatingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productReviews: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    gap: 20,
  },
  productCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 10,
  },
  productCategoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
  productCategoryText: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  productBrand: {
    backgroundColor: "#fff",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  productBrandInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  productBrandImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  productBrandName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  comments: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
});
