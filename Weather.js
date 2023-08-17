import React from "react";
import propTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import WeatherCodes from "./data";

export default function Weather({ temp, code, speed }) {
  console.log(temp, code);
  const getWeatherCondition = (dictCodes, code) => {
    const filtered = Object.keys(dictCodes)
      .filter((key) => key == code)
      .reduce((obj, key) => {
        obj[key] = dictCodes[key];
        return obj;
      }, {});
    return filtered[code];
  };

  let condition = getWeatherCondition(WeatherCodes, code);
  console.log(condition);

  return (
    <View style={styles.container}>
      <Text>{temp}</Text>
      <Text>{condition}</Text>
      <Ionicons name="md-checkmark-circle" size={32} color="green" />
    </View>
  );
}

Weather.propTypes = {
  temp: propTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
