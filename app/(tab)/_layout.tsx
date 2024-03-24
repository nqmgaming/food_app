import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { Entypo } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          headerTitle: "Home",
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
