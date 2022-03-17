import React from "react";
import { Pressable, ViewStyle, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const CheckBox = ({
  checked = false,
  onChange,
  style,
}: {
  checked?: boolean;
  onChange: () => void;
  style?: ViewStyle;
}) => {
  return (
    <Pressable
      style={[style, styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onChange}
    >
      {checked && <FontAwesome5 name="check" size={16} color="white" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: "green",
  },
});

export default CheckBox;
