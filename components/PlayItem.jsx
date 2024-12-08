// src/components/PlayItem.js
import React from "react"
import { View, Text, StyleSheet } from "react-native"

const PlayItem = ({ play }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{play.game}</Text>
      <Text>Play Type: {play.playType}</Text>
      <Text>Place ID: {play.placeId}</Text>
      <Text>Start Time: {play.startTime.toString()}</Text>
      <Text>End Time: {play.endTime.toString()}</Text>
      <Text>Players ID: {play.playersId}</Text>
      <Text>Status: {play.status}</Text>
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

export default PlayItem
