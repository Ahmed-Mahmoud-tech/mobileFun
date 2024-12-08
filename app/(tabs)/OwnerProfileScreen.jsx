import React, { useState } from "react"
import { StyleSheet, ScrollView, View, Alert } from "react-native"
import {
  TextInput,
  Button,
  Text,
  Card,
  List,
  IconButton,
  Divider,
} from "react-native-paper"
import DateTimePicker from "@react-native-community/datetimepicker"

const OwnerProfile = () => {
  const [email, setEmail] = useState("owner@example.com")
  const [name, setName] = useState("John Owner")
  const [birthdate, setBirthdate] = useState(new Date())
  const [placeName, setPlaceName] = useState("My Awesome Place")
  const [location, setLocation] = useState("123 Main St, City")
  const [employees, setEmployees] = useState([
    { id: 1, name: "Alice Smith", email: "alice@example.com" },
    { id: 2, name: "Bob Johnson", email: "bob@example.com" },
  ])
  const [places, setPlaces] = useState([
    { id: 1, name: "Main Hall" },
    { id: 2, name: "VIP Room" },
  ])
  const [editMode, setEditMode] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [newPlaceName, setNewPlaceName] = useState("")
  const [editingPlace, setEditingPlace] = useState(null)

  const handleAddOrSavePlace = () => {
    if (!newPlaceName.trim()) {
      Alert.alert("Validation", "Please enter a place name.")
      return
    }

    if (editingPlace) {
      // Save edited place
      setPlaces(
        places.map((place) =>
          place.id === editingPlace.id
            ? { ...place, name: newPlaceName }
            : place
        )
      )
      Alert.alert("Place Updated", `Place "${newPlaceName}" has been updated.`)
      setEditingPlace(null) // Exit editing mode
    } else {
      // Add new place
      const newPlace = {
        id: Date.now(),
        name: newPlaceName.trim(),
      }
      setPlaces([...places, newPlace])
      Alert.alert("Place Added", `Place "${newPlaceName}" has been added.`)
    }

    setNewPlaceName("") // Reset input field
  }

  const handleEditPlace = (place) => {
    setNewPlaceName(place.name) // Populate input with the selected place name
    setEditingPlace(place) // Set editing mode
  }

  const handleCancelEdit = () => {
    setNewPlaceName("") // Clear input
    setEditingPlace(null) // Exit editing mode
  }

  const handleBirthdateChange = (event, selectedDate) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setBirthdate(selectedDate)
    }
  }

  const handleAddPlace = () => {
    if (!newPlaceName.trim()) {
      Alert.alert("Validation", "Please enter a place name.")
      return
    }
    const newPlace = {
      id: Date.now(),
      name: newPlaceName.trim(),
    }
    setPlaces([...places, newPlace])
    setNewPlaceName("")
    Alert.alert("Place Added", `Place "${newPlaceName}" has been added.`)
  }

  // const handleEditPlace = (id, newName) => {
  //   setPlaces(
  //     places.map((place) =>
  //       place.id === id ? { ...place, name: newName } : place
  //     )
  //   )
  //   Alert.alert("Place Updated", `Place name has been updated to "${newName}".`)
  // }

  const handleRemovePlace = (id) => {
    Alert.alert("Remove Place", "Are you sure you want to remove this place?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        onPress: () => {
          setPlaces(places.filter((place) => place.id !== id))
          Alert.alert("Place Removed", "The place has been removed.")
        },
      },
    ])
  }

  const handleEditToggle = () => setEditMode(!editMode)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Owner Information Section */}
      <Card style={styles.card}>
        <Card.Title title="Owner Profile" />
        <Card.Content>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            editable={editMode}
          />
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            editable={editMode}
          />
          <Button
            mode="outlined"
            onPress={() => setShowDatePicker(true)}
            style={styles.input}
            disabled={!editMode}
          >
            Birthdate: {birthdate.toLocaleDateString()}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={birthdate}
              mode="date"
              display="default"
              onChange={handleBirthdateChange}
            />
          )}
          <TextInput
            label="Place Name"
            value={placeName}
            onChangeText={setPlaceName}
            style={styles.input}
            editable={editMode}
          />
          <TextInput
            label="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
            editable={editMode}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={handleEditToggle}
            style={styles.button}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
        </Card.Actions>
      </Card>

      {/* Employee List Section */}
      <Card style={styles.card}>
        <Card.Title title="Employees List" />
        <Divider />
        <Card.Content>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <List.Item
                key={employee.id}
                title={employee.name}
                description={employee.email}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="delete"
                    onPress={() =>
                      Alert.alert("Remove Employee", `Remove ${employee.name}?`)
                    }
                  />
                )}
              />
            ))
          ) : (
            <Text>No employees found.</Text>
          )}
        </Card.Content>
      </Card>

      {/* Places List Section */}
      <Card style={styles.card}>
        <Card.Title title="Places List" />
        <Divider />
        <Card.Content>
          <TextInput
            label={editingPlace ? "Edit Place Name" : "Add Place Name"}
            value={newPlaceName}
            onChangeText={setNewPlaceName}
            style={styles.input}
          />
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={handleAddOrSavePlace}
              style={styles.button}
            >
              {editingPlace ? "Save" : "Add"}
            </Button>
            {editingPlace && (
              <Button
                mode="outlined"
                onPress={handleCancelEdit}
                style={styles.button}
              >
                Cancel
              </Button>
            )}
          </View>
          {places.length > 0 ? (
            places.map((place) => (
              <List.Item
                key={place.id}
                title={place.name}
                right={(props) => (
                  <View style={styles.placeActions}>
                    <IconButton
                      {...props}
                      icon="pencil"
                      onPress={() => handleEditPlace(place)}
                    />
                    <IconButton
                      {...props}
                      icon="delete"
                      onPress={() => handleRemovePlace(place.id)}
                    />
                  </View>
                )}
              />
            ))
          ) : (
            <Text>No places found.</Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  placeActions: {
    flexDirection: "row",
    alignItems: "center",
  },
})

export default OwnerProfile
