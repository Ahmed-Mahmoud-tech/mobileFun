// src/components/CheckoutItem.js
import React from "react"
import { View, Text, StyleSheet, Button } from "react-native"

const CheckoutItem = ({ item, onCheckout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Price: {item.price}</Text>
      <Button title="Checkout" onPress={onCheckout} />
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

export default CheckoutItem
