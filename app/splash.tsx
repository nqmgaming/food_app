import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const splash = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/auth");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/welcome.png")}
          style={styles.image}
        />
        <Text style={styles.appTitle}>FApp</Text>
      </View>
      <ActivityIndicator
        size="small"
        color={Colors.light.purple}
        style={styles.indicator}
      />
      <View style={styles.content}>
        <Text style={styles.infoTextBold}>Student Info</Text>
        <Text style={styles.infoText}>Nguyen Quang Minh</Text>
        <Text style={styles.infoText}>PH31902</Text>
        <Text style={styles.infoText}>MD18305</Text>
      </View>
    </SafeAreaView>
  );
};

export default splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.delicatePink,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.dark.purple,
  },
  indicator: {
    marginTop: 10,
  },
  content: {
    bottom: 0,
    position: "absolute",
    marginBottom: 10,
    borderColor: Colors.light.pink,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  infoTextBold: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  infoText: {
    textAlign: "center",
    fontSize: 20,
    color: Colors.light.purple,
  },
});
