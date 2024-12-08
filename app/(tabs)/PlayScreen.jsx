import React, { useState } from "react"
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
  Dialog,
  Portal,
  Card,
  FAB,
  SegmentedButtons,
} from "react-native-paper"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import Dropdown from "@/components/Dropdown/Dropdown"

const PlaysScreen = () => {
  const [plays, setPlays] = useState([])
  const [filters, setFilters] = useState({
    playType: "all",
    status: "all",
    startDate: new Date(),
    playersId: "",
  })

  const [dialogVisible, setDialogVisible] = useState(false)
  const [currentPlay, setCurrentPlay] = useState(null)

  const [game, setGame] = useState("")
  const [playType, setPlayType] = useState("Single")
  const [placeId, setPlaceId] = useState("")
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(
    new Date(new Date().getTime() + 3600000)
  )
  const [playersId, setPlayersId] = useState("")
  const [status, setStatus] = useState("not paid")

  const [datePickerType, setDatePickerType] = useState(null)

  // Open Dialog to Add/Edit Play
  const openDialog = (play = null) => {
    setCurrentPlay(play)
    if (play) {
      setGame(play.game)
      setPlayType(play.playType)
      setPlaceId(play.placeId ? play.placeId.toString() : "")
      setStartTime(new Date(play.startTime))
      setEndTime(new Date(play.endTime))
      setPlayersId(play.playersId ? play.playersId.toString() : "")
      setStatus(play.status)
    } else {
      resetForm()
    }
    setDialogVisible(true)
  }

  const resetForm = () => {
    setGame("")
    setPlayType("Single")
    setPlaceId("")
    setStartTime(new Date())
    setEndTime(new Date(new Date().getTime() + 3600000))
    setPlayersId("")
    setStatus("not paid")
  }

  // Close Dialog
  const closeDialog = () => {
    setDialogVisible(false)
    resetForm()
  }

  // Save the Play Data
  const handleSave = () => {
    if (new Date(endTime) <= new Date(startTime)) {
      Alert.alert("Invalid Time", "End time must be after start time.")
      return
    }

    if (checkReservationConflict(placeId, startTime)) {
      return
    }

    if (currentPlay) {
      setPlays((prevPlays) =>
        prevPlays.map((item) =>
          item.id === currentPlay.id
            ? {
                ...item,
                game,
                playType,
                placeId: placeId ? +placeId : null,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                playersId: playersId ? +playersId : null,
                status,
              }
            : item
        )
      )
    } else {
      const newPlay = {
        id: plays.length ? plays[plays.length - 1].id + 1 : 1,
        game,
        playType,
        placeId: placeId ? +placeId : null,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        playersId: playersId ? +playersId : null,
        status,
      }
      setPlays((prevPlays) => [...prevPlays, newPlay])
    }
    closeDialog()
  }

  // Check for reservation conflict
  const checkReservationConflict = (placeId, startTime) => {
    const conflictingReservation = plays.find(
      (play) =>
        play.placeId === placeId &&
        Math.abs(new Date(play.startTime) - startTime) < 2 * 60 * 60 * 1000
    )

    if (conflictingReservation) {
      Alert.alert(
        "Reservation Conflict",
        `Place ${placeId} has a reservation at ${new Date(
          conflictingReservation.startTime
        ).toLocaleTimeString()}`
      )
      return true
    }
    return false
  }

  // Apply Filters
  const applyFilters = () => {
    return plays.filter((play) => {
      const matchesPlayType =
        filters.playType === "all" || play.playType === filters.playType
      const matchesStatus =
        filters.status === "all" || play.status === filters.status
      const matchesStartDate =
        filters.startDate.toDateString() ===
        new Date(play.startTime).toDateString()
      const matchesPlayerId =
        !filters.playersId || play.playersId.toString() === filters.playersId

      return (
        matchesPlayType && matchesStatus && matchesStartDate && matchesPlayerId
      )
    })
  }

  const filteredPlays = applyFilters()

  const renderPlayItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.itemName}>{item.game}</Text>
        <Text>Type: {item.playType}</Text>
        <Text>Place ID: {item.placeId}</Text>
        <Text>Start: {new Date(item.startTime).toLocaleString()}</Text>
        <Text>End: {new Date(item.endTime).toLocaleString()}</Text>
        <Text>Player ID: {item.playersId}</Text>
        <Text>Status: {item.status}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => openDialog(item)}>Edit</Button>
      </Card.Actions>
    </Card>
  )

  const showDatePicker = (type) => {
    setDatePickerType(type)
  }

  const hideDatePicker = () => {
    setDatePickerType(null)
  }

  const handleConfirmDate = (selectedDate) => {
    if (datePickerType === "startTime") {
      setStartTime(selectedDate)
    } else if (datePickerType === "endTime") {
      setEndTime(selectedDate)
    } else if (datePickerType === "startDate") {
      setFilters((prev) => ({ ...prev, startDate: selectedDate }))
    }
    hideDatePicker()
  }

  // Render filters above the FlatList
  const renderHeader = () => (
    <>
      {/* Filters */}
      <View style={styles.filters}>
        <SegmentedButtons
          value={filters.playType}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, playType: value }))
          }
          buttons={[
            { value: "Single", label: "Single" },
            { value: "Multi", label: "Multi" },
            { value: "all", label: "All" },
          ]}
        />
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
          onPress={() => showDatePicker("startDate")}
          style={styles.datePicker}
        >
          Filter Start Date: {filters.startDate.toLocaleDateString()}
        </Button>
      </View>
    </>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPlays}
        renderItem={renderPlayItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No play yet!</Text>}
        ListHeaderComponent={renderHeader}
      />

      <DateTimePickerModal
        isVisible={!!datePickerType}
        mode={datePickerType === "startDate" ? "date" : "datetime"}
        date={
          datePickerType === "startTime"
            ? startTime
            : datePickerType === "endTime"
            ? endTime
            : filters.startDate
        }
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      {/* Add Play Dialog */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>{currentPlay ? "Edit Play" : "Add Play"}</Dialog.Title>
          <Dialog.Content>
            {/* <TextInput
              label="Game"
              value={game}
              onChangeText={setGame}
              style={styles.input}
            /> */}
            <Dropdown
              data={["Option 1", "Option 2", "Option 3"]}
              onSelect={setGame} // Pass handleSelect function to handle selection
              placeholder="Choose a Game"
            />
            <Text>{game}</Text>
            <SegmentedButtons
              value={playType}
              onValueChange={setPlayType}
              buttons={[
                { value: "Single", label: "Single" },
                { value: "Multi", label: "Multi" },
              ]}
              style={styles.input}
            />
            <TextInput
              label="Place ID"
              value={placeId}
              onChangeText={setPlaceId}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button
              mode="outlined"
              onPress={() => showDatePicker("startTime")}
              style={styles.input}
            >
              Start DateTime: {startTime.toLocaleString()}
            </Button>
            <Button
              mode="outlined"
              onPress={() => showDatePicker("endTime")}
              style={styles.input}
            >
              End DateTime: {endTime.toLocaleString()}
            </Button>
            <TextInput
              label="Player ID"
              value={playersId}
              onChangeText={setPlayersId}
              keyboardType="numeric"
              style={styles.input}
            />
            <SegmentedButtons
              value={status}
              onValueChange={setStatus}
              buttons={[
                { value: "payed", label: "Paid" },
                { value: "not paid", label: "Not Paid" },
              ]}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            <Button onPress={handleSave}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Add Play FAB */}
      <FAB style={styles.fab} icon="plus" onPress={() => openDialog()} />
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
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#6200ee",
  },
})

export default PlaysScreen
