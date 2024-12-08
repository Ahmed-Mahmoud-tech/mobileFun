import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native"

const Dropdown = ({ data, onSelect, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false) // Controls dropdown visibility
  const [selectedItem, setSelectedItem] = useState(null) // Stores the selected item

  // Function to toggle visibility of the dropdown
  const toggleDropdown = () => setIsVisible(!isVisible)

  // Function to handle selection of an item
  const handleSelectItem = (item) => {
    setSelectedItem(item) // Set the selected item
    setIsVisible(false) // Close the dropdown
    if (onSelect) {
      onSelect(item) // Pass the selected item to the parent component
    }
  }

  // Function to render each dropdown item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelectItem(item)}
      style={styles.item}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Dropdown button */}
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text style={styles.buttonText}>
          {selectedItem ? selectedItem : placeholder || "Select an option"}
        </Text>
      </TouchableOpacity>

      {/* Modal for dropdown options */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)} // Close modal on request close
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: "#6200ee",
    borderRadius: 0,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 200,
    maxHeight: 400,
    padding: 10,
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
})

export default Dropdown
