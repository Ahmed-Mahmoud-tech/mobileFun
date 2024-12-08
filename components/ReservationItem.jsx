// src/components/ReservationItem.js
import React from "react"
import { View, Text, StyleSheet } from "react-native"

const ReservationItem = ({ reservation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Player ID: {reservation.playersId}</Text>
      <Text>Start Time: {reservation.startDateAndTime.toString()}</Text>
      <Text>End Time: {reservation.endDateAndTime.toString()}</Text>
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

export default ReservationItem
