import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../constants/colors";
const MainButton = (props) => {
  const { children, onPress } = props;

  /**
   * use different components for platform specific
   * 
   * BTW you can also name your file MainButton.android.js or MainButton.ios.js
   * React Native will decide which file is rendered
   */
  let ButtonTouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonTouchableComponent = TouchableNativeFeedback;
  }
  return (
    <View style = {styles.buttonContainerForNativeFeedback}>
      <ButtonTouchableComponent activeOpacity={0.6} onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonTouchableComponent>
    </View>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
  buttonContainerForNativeFeedback: {
    borderRadius: 25,
    overflow: "hidden"
  }
});
