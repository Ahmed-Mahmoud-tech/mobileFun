// src/components/GameItem.js
import React from "react"
import { View, Text, StyleSheet } from "react-native"

const GameItem = ({ game }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{game.name}</Text>
      <Text>Single Price: {game.singlePrice}</Text>
      <Text>Multi Price: {game.multiPrice}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default GameItem
