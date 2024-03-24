import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const auth = () => {
  console.log(`${process.env.REACT_APP_API_URL}/users/register`);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/auth.png")}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.introText}>Get started with your account</Text>
        <AuthButton text="Register" customStyle={styles.registerButton} />
        <AuthButton text="Login" customStyle={styles.loginButton} />
      </View>
    </View>
  );
};

const AuthButton = ({ text, customStyle }) => (
  <TouchableOpacity
    style={[styles.button, customStyle]}
    onPress={() => {
      if (text === "Register") {
        router.push("/(auth)/register");
      } else {
        router.push("/(auth)/login");
      }
    }}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.delicatePink,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").height / 1.7,
  },
  contentContainer: {
    flex: 4,
    backgroundColor: Colors.light.delicatePink,
    borderRadius: 30,
    padding: 20,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  introText: {
    fontSize: 20,
    textAlign: "center",
    color: Colors.light.text,
  },
  button: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    position: "relative",
    borderRadius: 15,
  },
  registerButton: {
    backgroundColor: Colors.light.purple,
    width: "100%",
  },
  loginButton: {
    backgroundColor: Colors.light.pink,
    width: "100%",
  },
  buttonText: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: "bold",
  },
});
