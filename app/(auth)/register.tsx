import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import TextInputComponent from "@/components/TextInputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const register = () => {
  const [name, setname] = useState("");
  const [disable, setdisable] = useState(true);
  const validateName = () => {
    if (name.trim().length < 3) {
      return false;
    } else if (name.trim().length > 50) {
      return false;
    } else if (!isNaN(name.trim().split(" ")[0])) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (validateName()) {
      setdisable(false);
    } else {
      setdisable(true);
    }
  }, [name]);

  return (
    <View>
      <TextInputComponent
        label="ENTER YOUR NAME"
        title="Full name"
        subtitle="Please enter your name. This text will be displayed on your profile."
        value={name}
        placeholder="Required"
        onChangeText={(text) => setname(text)}
      />
      <ButtonComponent
        color={Colors.light.purple}
        title="Continue"
        disable={disable}
        colorDisable={Colors.light.gray}
        onPress={() => {
          if (validateName()) {
            router.navigate({
              pathname: "emailRegister",
              params: { name: name },
            });
          }
        }}
      />
    </View>
  );
};

export default register;

const styles = StyleSheet.create({});
