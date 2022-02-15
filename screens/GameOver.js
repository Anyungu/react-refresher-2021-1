import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import MainButton from "../components/MainButton";

const GameOver = (props) => {
  const { rounds, userChoice, newGame } = props;
  return (
    <View style={styles.screen}>
      <Text>Game Over</Text>
      <View style={styles.imageContainer}>
        <Image
        //   source={require("../assets/success.png")}
            source = {{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}}
          style={styles.image}
          resizeMode="contain"
          fadeDuration={1000 }
        />
      </View>

      <Text>Number of rounds: {rounds}</Text>
      <Text>Number was: {userChoice}</Text>
      <MainButton
        onPress={() => {
          newGame();
        }}
      >Restart Game</MainButton>
    </View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    width: 300,
    height: 300,
    overflow: "hidden",
    marginVertical: 30
  },
});
