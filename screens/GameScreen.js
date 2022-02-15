import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";

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

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <Text># {listLength -itemData.index}</Text> 
      <Text>{itemData.item}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  const initialGuess = generateBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guesses, setGuesses] = useState([initialGuess.toString()]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess == userChoice) {
      onGameOver(guesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction == "lower" && currentGuess < userChoice) ||
      (direction == "higher" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong ...", [
        { text: "Sorry", style: "Cancel" },
      ]);
      return;
    }
    if (direction == "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setGuesses((cur) => [nextNumber.toString(), ...cur]);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "higher")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        {/* <ScrollView contentContainerStyle={styles.scrollStyle}>
          {guesses.map((guess, index) =>
            renderListItem(guess, guesses.length - index)
          )}
        </ScrollView> */}
        <FlatList contentContainerStyle={styles.scrollStyle} keyExtractor={(item) => item} data={guesses} renderItem={renderListItem.bind(this, guesses.length)}></FlatList>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
  list: {
    width: "60%",
    flex: 1
  },
  scrollStyle: {
    // alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
