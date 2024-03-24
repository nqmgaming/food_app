import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");
const home = () => {
  const [Search, setSearch] = useState("");

  return (
    <View>
      <View
        style={{
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
        }}
      >
        {/* Search bar */}
        <Entypo name="magnifying-glass" size={24} color="black" />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 20,
          }}
          value={Search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Search"
        />
      </View>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
