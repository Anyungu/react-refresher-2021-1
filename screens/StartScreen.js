import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import colors from "../constants/colors";

const StartScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [widthValue, setWidthValue] = useState(Dimensions.get('window').width);
  const [heightValue, setHeightValue] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateHeightAndWidth = () => {
      setHeightValue(Dimensions.get('window').height);
      setWidthValue(Dimensions.get('window').width);
    }
  
    const dimensionsSubscription = Dimensions.addEventListener("change", updateHeightAndWidth);

    return () => {
     dimensionsSubscription?.remove()
    }
  })

  const validateInput = (input) => {
    /**
     * Anything NOT a number
     */
    setEnteredValue(input.replace(/[^0-9]/g, ""));
  };

 

  const resetInput = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInput = () => {
    const chosenNumber = parseInt(enteredValue);

    if (
      chosenNumber.toString() === "NaN" ||
      chosenNumber <= 0 ||
      chosenNumber > 99
    ) {
      Alert.alert("Invalid Number", "Number has to be between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: resetInput },
      ]);
      return;
    }

    setConfirmed(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  /**
   * WE can write such kind of SHIT
   * in React
   *
   */
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={()=> props.onStartGame(selectedNumber)} >START GAME</MainButton>
        {/* <Button title="START GAME" onPress={()=> props.onStartGame(selectedNumber)}/> */}
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset = {20}>
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game</Text>
        <Card style={{...styles.inputContainer, width: widthValue * 0.85}}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            keyboardType="number-pad"
            maxLength={2}
            value={enteredValue}
            onChangeText={validateInput}
          />
          <View style={styles.buttonsView}>
            <View style={{...styles.button, width: widthValue > 600 ? 100 : 90}}>
              <Button
                title="Reset"
                onPress={resetInput}
                color={colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInput}
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonsView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: Dimensions.get('window').width * 0.85,
    // maxWidth: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  button: {
    width: Dimensions.get('window').width > 400 ? 100 : 90,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
