import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });
};
/**
 *
 * @returns
 * TODO Better page rendering
 */
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [numberofGuesses, setNumberOfGuesses] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setNumberOfGuesses(0);
  };

  const gameOverHandler = (guesses) => {
    setNumberOfGuesses(guesses);
  };

  const restartGameHandler = () => {
    setNumberOfGuesses(0);
    setUserNumber(null);
  };

  let contentToRender = <StartScreen onStartGame={startGameHandler} />;

  if (userNumber && numberofGuesses == 0) {
    contentToRender = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (numberofGuesses > 0) {
    contentToRender = (
      <GameOver
        newGame={restartGameHandler}
        userChoice={userNumber}
        rounds={numberofGuesses}
      />
    );
  }
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess A Number" />
      {contentToRender}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
