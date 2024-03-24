import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="auth"
        options={{
          headerShown: false,
          headerTitle: "Auth",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: "Login",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: true,
          title: "Register",
        }}
      />
      <Stack.Screen
        name="emailRegister"
        options={{
          title: "Register",
        }}
      />
      <Stack.Screen
        name="registerPassword"
        options={{
          title: "Register",
        }}
      />
      <Stack.Screen
        name="loginPassword"
        options={{
          title: "Login",
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
