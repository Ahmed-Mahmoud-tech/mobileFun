import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Text,
  ScrollView,
} from "react-native"
import {
  TextInput,
  Button,
  Card,
  FAB,
  SegmentedButtons,
} from "react-native-paper"
import DateTimePickerModal from "react-native-modal-datetime-picker"

const CheckoutScreen = () => {
  const [plays, setPlays] = useState([])
  const [filters, setFilters] = useState({
    status: "all",
    playersId: "",
    day: new Date(),
  })

  const [datePickerVisible, setDatePickerVisible] = useState(false)

  useEffect(() => {
    // Mock data
    setPlays([
      {
        id: 1,
        game: "Soccer",
        playType: "Single",
        placeId: 101,
        startTime: new Date().toISOString(),
        endTime: null,
        playersId: "123",
        status: "not paid",
        price: 50,
      },
      {
        id: 2,
        game: "Tennis",
        playType: "Multi",
        placeId: 102,
        startTime: new Date().toISOString(),
        endTime: new Date(new Date().getTime() + 3600000).toISOString(),
        playersId: "456",
        status: "payed",
        price: 100,
      },
    ])
  }, [])

  const applyFilters = () => {
    return plays.filter((play) => {
      const matchesStatus =
        filters.status === "all" || play.status === filters.status
      const matchesPlayerId =
        !filters.playersId || play.playersId.toString() === filters.playersId
      const matchesDay =
        new Date(play.startTime).toDateString() === filters.day.toDateString()

      return matchesStatus && matchesPlayerId && matchesDay
    })
  }

  const filteredPlays = applyFilters()

  const handleCheckout = (playId) => {
    Alert.alert("Checkout", `Play ID ${playId} checked out.`)
  }

  const handleCheckoutAll = () => {
    const total = filteredPlays.reduce((sum, play) => sum + play.price, 0)
    Alert.alert("Checkout All", `Total Amount: $${total}`)
  }

  const handleAddEndTime = (playId) => {
    setPlays((prevPlays) =>
      prevPlays.map((play) =>
        play.id === playId && !play.endTime
          ? { ...play, endTime: new Date().toISOString() }
          : play
      )
    )
  }

  const showDatePicker = () => {
    setDatePickerVisible(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisible(false)
  }

  const handleConfirmDate = (selectedDate) => {
    setFilters((prev) => ({ ...prev, day: selectedDate }))
    hideDatePicker()
  }

  const renderPlayItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.itemName}>{item.game}</Text>
        <Text>Type: {item.playType}</Text>
        <Text>Place ID: {item.placeId}</Text>
        <Text>Start: {new Date(item.startTime).toLocaleString()}</Text>
        <Text>
          End: {item.endTime ? new Date(item.endTime).toLocaleString() : "N/A"}
        </Text>
        <Text>Player ID: {item.playersId}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Price: ${item.price}</Text>
      </Card.Content>
      <Card.Actions>
        {!item.endTime && (
          <Button onPress={() => handleAddEndTime(item.id)}>
            Add End Time
          </Button>
        )}
        <Button onPress={() => handleCheckout(item.id)}>Checkout</Button>
      </Card.Actions>
    </Card>
  )

  const renderHeader = () => (
    <View style={styles.filters}>
      <SegmentedButtons
        value={filters.status}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, status: value }))
        }
        buttons={[
          { value: "payed", label: "Paid" },
          { value: "not paid", label: "Not Paid" },
          { value: "all", label: "All" },
        ]}
      />
      <TextInput
        label="Player ID"
        value={filters.playersId}
        onChangeText={(value) =>
          setFilters((prev) => ({ ...prev, playersId: value }))
        }
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        mode="outlined"
        onPress={showDatePicker}
        style={styles.datePicker}
      >
        Filter Day: {filters.day.toLocaleDateString()}
      </Button>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPlays}
        renderItem={renderPlayItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No play found!</Text>
        }
      />

      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        date={filters.day}
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      {/* Checkout All Button */}
      {filteredPlays.length > 0 && (
        <Button
          mode="contained"
          onPress={handleCheckoutAll}
          style={styles.checkoutAll}
        >
          Checkout All ($
          {filteredPlays.reduce((sum, play) => sum + play.price, 0)})
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  filters: { marginBottom: 16 },
  listContainer: { paddingBottom: 80 },
  card: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    marginBottom: 12,
  },
  datePicker: {
    marginBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  checkoutAll: {
    marginTop: 16,
    padding: 10,
  },
})

export default CheckoutScreen
