import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

const profile = () => {
  const [user, setUser] = useState({});
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

      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          margin: 10,
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: user.avatar }}
          style={{ width: 60, height: 60, borderRadius: 15 }}
        />
        <View
          style={{
            margin: 10,
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {user.name}
          </Text>
          <Text>{user.email}</Text>
        </View>
        <AntDesign name="right" size={24} color="black" />
      </View>
      <View
        style={{
          margin: 10,
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <AntDesign name="heart" size={24} color="red" />
        <Text
          style={{
            margin: 10,
            flex: 1,
          }}
        >
          Sản phẩm yêu thích
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </View>
      <View
        style={{
          margin: 10,
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <AntDesign name="shoppingcart" size={24} color="black" />
        <Text
          style={{
            margin: 10,
            flex: 1,
          }}
        >
          Đơn hàng của tôi
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </View>

      <View
        style={{
          margin: 10,
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <AntDesign name="setting" size={24} color="black" />
        <Text
          style={{
            margin: 10,
            flex: 1,
          }}
        >
          Cài đặt
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </View>

      <View
        style={{
          margin: 10,
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <AntDesign name="infocirlce" size={24} color="black" />
        <Text
          style={{
            margin: 10,
            flex: 1,
          }}
        >
          Giới thiệu
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </View>

      <TouchableOpacity
        style={{
          margin: 10,
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("isLogin");
          router.dismissAll;
          router.push("/(auth)/auth");
        }}
      >
        <AntDesign name="logout" size={24} color="black" />
        <Text
          style={{
            margin: 10,
            flex: 1,
          }}
        >
          Đăng xuất
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default profile;

const styles = StyleSheet.create({});
