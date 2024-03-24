import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface Props {
  label?: string;
  title?: string;
  placeholder?: string;
  subtitle?: string;
  value?: string;
  keyboardType?: string;
  onChangeText: (text: string) => void;
}

const TextInputComponent: React.FC<Props> = ({
  label,
  title,
  placeholder,
  subtitle,
  value,
  keyboardType,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          clearTextOnFocus={true}
          clearButtonMode="while-editing"
          keyboardAppearance="light"
          autoCapitalize="none"
          secureTextEntry={keyboardType === "password"}
        />
      </View>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 13,
    color: "black",
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Colors.light.delicatePink,
    paddingVertical: 4,
  },
  title: {
    fontSize: 16,
    color: "black",
    padding: 10,
    fontWeight: "500",
  },
  input: {
    height: 40,
    padding: 10,
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: "black",
  },
});
