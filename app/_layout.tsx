import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTitle: "Welcome" }}
      />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false, headerTitle: "Authentication" }}
      />
      <Stack.Screen
        name="(tab)"
        options={{ headerShown: false, headerTitle: "Home" }}
      />
      <Stack.Screen
        name="productDetail"
        options={{ headerShown: true, headerTitle: "Product " }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
