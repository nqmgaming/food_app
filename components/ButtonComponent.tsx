import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";

interface Props {
  color?: string;
  title: string;
  onPress: () => void;
  disable?: boolean;
  loading?: boolean;
  colorDisable?: string;
}

const ButtonComponent = (props: Props) => {
  const { color, title, onPress, disable, colorDisable } = props;
  const buttonStyles = [
    styles.button,
    {
      backgroundColor: disable ? colorDisable : color,
      opacity: disable ? 0.5 : 1,
    },
  ];
  const textStyles = [
    styles.text,
    {
      color: disable ? "#aaa" : "white",
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={disable}
        style={buttonStyles}
        onPress={onPress}
      >
        {props.loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={textStyles}>{title}</Text> // Sử dụng text style đã sửa
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 12,
    margin: 10,
    borderRadius: 14,
    alignItems: "center",
    width: "90%",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
