import React, { useState } from "react"
import { StyleSheet, View, ScrollView, Alert } from "react-native"
import {
  TextInput,
  Button,
  Text,
  Card,
  Chip,
  SegmentedButtons,
} from "react-native-paper"
import DateTimePicker from "@react-native-community/datetimepicker"

const EmployeeProfileScreen = () => {
  const [email, setEmail] = useState("employee@example.com")
  const [name, setName] = useState("John Doe")
  const [birthdate, setBirthdate] = useState(new Date())
  const [gender, setGender] = useState("Male")
  const [editMode, setEditMode] = useState(false)

  const [newOwnerEmail, setNewOwnerEmail] = useState("")
  const [requestStatus, setRequestStatus] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleBirthdateChange = (event, selectedDate) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setBirthdate(selectedDate)
    }
  }

  const handleEditToggle = () => setEditMode(!editMode)

  const handleSendRequest = () => {
    if (!newOwnerEmail.trim()) {
      Alert.alert("Validation", "Please enter an email.")
      return
    }
    Alert.alert("Request Sent", `Request sent to ${newOwnerEmail}.`)
    setRequestStatus("Pending")
  }

  const handleRemoveOwner = () => {
    Alert.alert("Remove Owner", "Are you sure you want to remove the owner?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        onPress: () => {
          setNewOwnerEmail("")
          setRequestStatus("")
          Alert.alert("Owner Removed")
        },
      },
    ])
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Personal Info Section */}
      <Card style={styles.card}>
        <Card.Title title="Personal Information" />
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
          <SegmentedButtons
            value={gender}
            onValueChange={setGender}
            buttons={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
            disabled={!editMode}
            style={styles.segmentedButtons}
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

      {/* Owner Request Section */}
      <Card style={styles.card}>
        <Card.Title title="Owner Request" />
        <Card.Content>
          <TextInput
            label="Owner's Email"
            value={newOwnerEmail}
            onChangeText={setNewOwnerEmail}
            style={styles.input}
            placeholder="Enter owner's email"
          />
          {requestStatus ? (
            <Chip mode="outlined" style={styles.input}>
              Request Status: {requestStatus}
            </Chip>
          ) : null}
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={handleSendRequest}
            style={styles.button}
          >
            Send Request
          </Button>
          <Button
            mode="contained"
            onPress={handleRemoveOwner}
            style={styles.button}
          >
            Remove Owner
          </Button>
        </Card.Actions>
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
  segmentedButtons: {
    marginBottom: 16,
  },
})

export default EmployeeProfileScreen
