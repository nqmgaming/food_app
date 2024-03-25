import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import ProductComponent from "@/components/ProductComponent";
import NewProductComponent from "@/components/NewProductComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width } = Dimensions.get("window");
const BANNER_WIDTH = width;
const banners = [
  require("../../assets/images/banner1.png"),
  require("../../assets/images/banner2.png"),
  require("../../assets/images/banner3.png"),
  require("../../assets/images/banner4.png"),
];

const home = () => {
  const [Search, setSearch] = useState("");
  const [Products, setProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [viewedProduct, setViewedProduct] = useState([]);
  const [userId, setUserId] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  let lastRefreshTime = Date.now();
  const onRefresh = React.useCallback(() => {
    if (Date.now() - lastRefreshTime > 5000) {
      // 5000 milliseconds = 5 seconds
      setRefreshing(true);
      getProducts().then(() => {
        setRefreshing(false);
        lastRefreshTime = Date.now();
      });
    }
  }, []);

  const getProducts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const products = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/`
      );
      setProducts(products.data);

      const hotProducts = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/sale`
      );
      setHotProducts(hotProducts.data);

      const viewedProductResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/viewed-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const viewedProductData = viewedProductResponse.data.map(
        (item) => item.product
      );
      setViewedProduct(viewedProductData);
      console.log(viewedProductData);
    } catch (error) {
      console.log(error);
      console.log(`process.env.REACT_APP_API_URL/products/`);
    }
  };

  const getUserInfo = async () => {
    try {
      // Get the token from local storage
      const token = await AsyncStorage.getItem("token");
      console.log(token);

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

      console.log(userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.searchContainer}>
        <Entypo name="magnifying-glass" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          value={Search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Search"
        />
      </View>
      <SliderBox
        images={banners}
        sliderBoxHeight={130}
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        parentWidth={BANNER_WIDTH}
        onCurrentImagePressed={(index) =>
          console.warn(`image ${index} pressed`)
        }
      />
      <View style={styles.productContainer}>
        <View style={styles.productHeader}>
          <View style={styles.productHeaderTextContainer}>
            <Text style={styles.productHeaderTitle}>Sản phẩm hot</Text>
            <Text style={styles.productHeaderSubtitle}>
              Sản phẩm bán chạy nhất trong tuần
            </Text>
          </View>
          <View style={styles.productHeaderAction}>
            <Text>Xem thêm</Text>
            <AntDesign name="right" size={16} color="black" />
          </View>
        </View>
        <ScrollView horizontal>
          {hotProducts.map((product) => (
            <ProductComponent
              key={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              id={product._id}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.newProductContainer}>
        <Text style={styles.newProductTitle}>Sản phẩm mới</Text>
        <Text style={styles.newProductSubtitle}>
          Sản phẩm mới nhất trong tuần
        </Text>

        {Products.map((product) => (
          <NewProductComponent
            key={product._id}
            name={product.name}
            category={product.category}
            price={product.price}
            rating={product.rating}
            countInStock={product.countInStock}
            image={product.image}
            id={product._id}
          />
        ))}
      </View>
      <View style={styles.productContainer}>
        <View style={styles.productHeader}>
          <View style={styles.productHeaderTextContainer}>
            <Text style={styles.productHeaderTitle}>Sản phẩm đã xem</Text>
            <Text style={styles.productHeaderSubtitle}>
              Sản phẩm bạn đã xem gần đây
            </Text>
          </View>
          <View style={styles.productHeaderAction}>
            <Text>Xem thêm</Text>
            <AntDesign name="right" size={16} color="black" />
          </View>
        </View>
        <ScrollView horizontal>
          {viewedProduct.map((product: any) => (
            <ProductComponent
              key={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              id={product._id}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 10,
    margin: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
  },
  productContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    margin: 10,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  productHeaderTextContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  productHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productHeaderSubtitle: {
    fontSize: 16,
    color: "gray",
  },
  productHeaderAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  newProductContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "white",
    margin: 10,
    padding: 10,
  },
  newProductTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  newProductSubtitle: {
    fontSize: 16,
    color: "gray",
  },
});
