import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import home from "./home";
import profile from "./profile";
import favorite from "./favorite";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="favorite" />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
