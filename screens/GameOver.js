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
  Dimensions,
  ScrollView
} from "react-native";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";

const GameOver = (props) => {
  const { rounds, userChoice, newGame } = props;
  return (
    <ScrollView>
    <View style={styles.screen}>
      <Text>Game Over</Text>
      <View style={styles.imageContainer}>
        <Image
          //   source={require("../assets/success.png")}
          source={{
            uri: "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",
          }}
          style={styles.image}
          resizeMode="contain"
          fadeDuration={1000}
        />
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Number of rounds:{" "}
          <Text style={styles.resultTextHighlight}> {rounds}</Text>
        </Text>
        <Text style={styles.resultText}>
          Number was:{" "}
          <Text style={styles.resultTextHighlight}>{userChoice}</Text>
        </Text>
      </View>
      <MainButton
        onPress={() => {
          newGame();
        }}
      >
        Restart Game
      </MainButton>
    </View>
  </ScrollView>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    borderRadius: Dimensions.get("window").width * 0.35,
    borderWidth: 3,
    borderColor: "black",
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").width / 30,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").width / 60,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
  resultTextHighlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});
