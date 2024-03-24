import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import TextInputComponent from "@/components/TextInputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import Colors from "@/constants/Colors";

const registerPassword = () => {
  const [password, setPassword] = useState("");

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
        onPress={() => {
          // router.navigate({
          //   pathname: "passwordRegister",
          //   params: { email: email },
          // });
        }}
      />
    </View>
  );
};

export default registerPassword;

const styles = StyleSheet.create({});
