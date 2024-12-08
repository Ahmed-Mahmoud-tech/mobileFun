// src/components/PlayerPurchaseItem.js
import React from "react"
import { View, Text, StyleSheet } from "react-native"

const PlayerPurchaseItem = ({ purchase }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{purchase.itemName}</Text>
      <Text>Price: {purchase.price}</Text>
      <Text>Player ID: {purchase.playersId}</Text>
      <Text>Status: {purchase.status}</Text>
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

export default PlayerPurchaseItem
