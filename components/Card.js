import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    // width: 300,
    // maxWidth: "80%",
    // alignItems: "center",
    /**
     * rgeb, rgba - a has no effect
     */
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2}, 
    /**
     * radius 0 affects offset in ios
     */
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    /**
     * Elevation for android
     * use default material design looks
     */
    elevation: 9,
    padding: 20,
    borderRadius: 10
  },
});
