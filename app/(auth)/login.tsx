import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import TextInputComponent from "@/components/TextInputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import Colors from "@/constants/Colors";
import {router} from "expo-router";
const login = () => {
  const [email, setEmail] = useState("");
  return (
      <View>
        <TextInputComponent
            label="ENTER YOUR EMAIL"
            title="Email"
            subtitle="Please enter your email. This text will be used to log in."
            placeholder="Required"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        <ButtonComponent
            color={Colors.light.purple}
            title="Continue"
            disable={email.trim().length < 3}
            colorDisable="#BDBDBD"
            onPress={() => {
              router.navigate({
                pathname: "registerPassword",
                params: { email: email },
              });
            }}
        />
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
