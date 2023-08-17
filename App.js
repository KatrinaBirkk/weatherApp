import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Loading from "./Loading";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

// const API_KEY = "550e0b86a20f07b5faecf25b5b6590d3";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [state, setState] = useState({});
  console.log("state");
  console.log(state);

  let isLoading = true;

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode,temperature_80m,soil_temperature_18cm&current_weather=true`
    );
    console.log(data);
    setState({
      temp: data.current_weather.temperature,
      code: data.current_weather.weathercode,
      speed: data.current_weather.windspeed,
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      getWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    isLoading = false;
    // text = JSON.stringify(location);
  }
  // console.log(location);
  // console.log(location.coords);

  return isLoading ? (
    <Loading />
  ) : (
    <Weather temp={state.temp} code={state.code} />
  );
}
