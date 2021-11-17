import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

/**
 * Recursively
 * @param {*} min
 * @param {*} max
 * @param {*} exclude
 * @returns
 */
const generateBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rand = Math.floor(Math.random() * (max - min)) + min;

  if (rand === exclude) {
    return generateBetween(min, max, exclude);
  } else {
    return rand;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateBetween(1, 100, props.userChoice)
  );

  return (
    <View style = {styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style = {styles.buttonContainer}>
          <Button title = "LOWER" onPress={() => {}}/>
          <Button title = "GREATER" onPress={() => {}}/>
      </Card>

    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: "80%"
    }
});
