import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import TextInputComponent from "@/components/TextInputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import Colors from "@/constants/Colors";
import { router, useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const loginPassword = () => {
  const [password, setPassword] = useState("");
  const global = useGlobalSearchParams();
  const { email } = global;

  const login = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          email: email,
          password: password,
        }
      );

      const token = response.data.token;

      // Save token to local storage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("isLogin", "true");

      // Navigate to home
      router.replace("/(tab)/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInputComponent
        label="SET YOUR PASSWORD"
        title="Password"
        subtitle="Please enter your password. This text will be used to log in."
        placeholder="Required"
        keyboardType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <ButtonComponent
        color={Colors.light.purple}
        title="Continue"
        disable={password.trim().length < 3}
        colorDisable="#BDBDBD"
        onPress={login}
      />
    </View>
  );
};

export default loginPassword;

const styles = StyleSheet.create({});
