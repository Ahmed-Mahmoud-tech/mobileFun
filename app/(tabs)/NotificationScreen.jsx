import React, { useState } from "react"
import { StyleSheet, ScrollView, View, Alert } from "react-native"
import {
  TextInput,
  Button,
  Checkbox,
  Card,
  List,
  IconButton,
  Divider,
  SegmentedButtons,
  Text,
} from "react-native-paper"

const NotificationPage = () => {
  const [notificationPreferences, setNotificationPreferences] = useState({
    employeeRequest: false,
    reservation: false,
    play: false,
    purchasesItems: false,
    playersPurchases: false,
    checkout: false,
  })

  const [filters, setFilters] = useState({
    notificationType: "all",
    date: new Date().toISOString().split("T")[0], // Default to today
    email: "",
  })

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Employee Request",
      body: "Alice Smith has requested to join your company.",
      author: "Alice Smith",
      time: "2024-12-08 10:30 AM",
      type: "employeeRequest",
      actions: {
        accept: true,
        reject: true,
      },
    },
    {
      id: 2,
      title: "New Reservation",
      body: "Reservation made for VIP Room on 2024-12-08 02:00 PM.",
      author: "John Doe",
      time: "2024-12-08 09:15 AM",
      type: "reservation",
      actions: {
        accept: false,
        reject: false,
      },
    },
  ])

  const togglePreference = (key) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleNotificationAction = (id, action) => {
    Alert.alert(
      `Notification Action`,
      `You chose to ${action} for notification ID ${id}.`
    )
    // Add logic for handling accept/reject actions
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType =
      filters.notificationType === "all" ||
      notification.type === filters.notificationType
    const matchesEmail =
      !filters.email ||
      notification.author.toLowerCase().includes(filters.email.toLowerCase())
    const matchesDate =
      !filters.date || notification.time.startsWith(filters.date)

    return matchesType && matchesEmail && matchesDate
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Notification Preferences */}
      <Card style={styles.card}>
        <Card.Title title="Notification Preferences" />
        <Divider />
        <Card.Content>
          {Object.keys(notificationPreferences).map((key) => (
            <View key={key} style={styles.checkboxRow}>
              <Checkbox
                status={notificationPreferences[key] ? "checked" : "unchecked"}
                onPress={() => togglePreference(key)}
              />
              <Text>{key.replace(/([A-Z])/g, " $1").trim()}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Filters */}
      <Card style={styles.card}>
        <Card.Title title="Filters" />
        <Divider />
        <Card.Content>
          {/* Notification Type Filter */}
          <SegmentedButtons
            value={filters.notificationType}
            onValueChange={(value) =>
              handleFilterChange("notificationType", value)
            }
            buttons={[
              { value: "all", label: "All" },
              { value: "employeeRequest", label: "Employee Request" },
              { value: "reservation", label: "Reservation" },
              { value: "play", label: "Play" },
              { value: "purchasesItems", label: "Purchases Items" },
              { value: "playersPurchases", label: "Players Purchases" },
              { value: "checkout", label: "Checkout" },
            ]}
          />

          {/* Date Filter */}
          <TextInput
            label="Filter by Date"
            value={filters.date}
            onChangeText={(value) => handleFilterChange("date", value)}
            style={styles.input}
            mode="outlined"
          />

          {/* Email Filter */}
          <TextInput
            label="Filter by Email"
            value={filters.email}
            onChangeText={(value) => handleFilterChange("email", value)}
            style={styles.input}
            mode="outlined"
          />
        </Card.Content>
      </Card>

      {/* Notification List */}
      <Card style={styles.card}>
        <Card.Title title="Notifications" />
        <Divider />
        <Card.Content>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <List.Item
                key={notification.id}
                title={notification.title}
                description={`${notification.body}\nBy: ${notification.author}\nAt: ${notification.time}`}
                right={(props) =>
                  notification.actions.accept || notification.actions.reject ? (
                    <View style={styles.actions}>
                      {notification.actions.accept && (
                        <Button
                          mode="contained"
                          onPress={() =>
                            handleNotificationAction(notification.id, "accept")
                          }
                          style={styles.actionButton}
                        >
                          Accept
                        </Button>
                      )}
                      {notification.actions.reject && (
                        <Button
                          mode="outlined"
                          onPress={() =>
                            handleNotificationAction(notification.id, "reject")
                          }
                          style={styles.actionButton}
                        >
                          Reject
                        </Button>
                      )}
                    </View>
                  ) : null
                }
              />
            ))
          ) : (
            <Text>No notifications found.</Text>
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginLeft: 8,
  },
})

export default NotificationPage
