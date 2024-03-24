import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import TextInputComponent from "@/components/TextInputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import Colors from "@/constants/Colors";
import { router, useGlobalSearchParams } from "expo-router";

const emailRegister = () => {
  const [email, setEmail] = useState("");
  const global = useGlobalSearchParams();
  const { name } = global;
  console.log("====================================");
  console.log("emailRegister", name);
  console.log("====================================");

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
            params: { email: email, name: name },
          });
        }}
      />
    </View>
  );
};

export default emailRegister;

const styles = StyleSheet.create({});
