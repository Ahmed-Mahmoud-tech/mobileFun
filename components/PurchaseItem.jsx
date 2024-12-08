// src/components/PurchaseItem.js
import React from "react"
import { View, Text, StyleSheet } from "react-native"

const PurchaseItem = ({ purchase }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{purchase.name}</Text>
      <Text>Price: {purchase.price}</Text>
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

export default PurchaseItem
