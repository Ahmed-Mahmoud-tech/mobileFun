import React, { useState } from "react"
import { FlatList, StyleSheet, View, Text } from "react-native"
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Card,
  FAB,
  List,
  IconButton,
} from "react-native-paper"

const GamesScreen = () => {
  const [games, setGames] = useState([
    { id: 1, name: "Game 1", singlePrice: 10, multiPrice: 15 },
    { id: 2, name: "Game 2", singlePrice: 12, multiPrice: 18 },
  ])

  const [dialogVisible, setDialogVisible] = useState(false)
  const [currentGame, setCurrentGame] = useState(null)
  const [gameName, setGameName] = useState("")
  const [singlePrice, setSinglePrice] = useState("")
  const [multiPrice, setMultiPrice] = useState("")

  const openDialog = (game = null) => {
    setCurrentGame(game)
    if (game) {
      setGameName(game.name)
      setSinglePrice(game.singlePrice.toString())
      setMultiPrice(game.multiPrice.toString())
    } else {
      setGameName("")
      setSinglePrice("")
      setMultiPrice("")
    }
    setDialogVisible(true)
  }

  const closeDialog = () => {
    setDialogVisible(false)
    setGameName("")
    setSinglePrice("")
    setMultiPrice("")
  }

  const handleSave = () => {
    if (currentGame) {
      // Edit existing game
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.id === currentGame.id
            ? {
                ...game,
                name: gameName,
                singlePrice: +singlePrice,
                multiPrice: +multiPrice,
              }
            : game
        )
      )
    } else {
      // Add new game
      const newGame = {
        id: games.length ? games[games.length - 1].id + 1 : 1,
        name: gameName,
        singlePrice: +singlePrice,
        multiPrice: +multiPrice,
      }
      setGames((prevGames) => [...prevGames, newGame])
    }
    closeDialog()
  }

  const renderGameItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.gameName}>{item.name}</Text>
        <Text>Single Price: ${item.singlePrice}</Text>
        <Text>Multi Price: ${item.multiPrice}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => openDialog(item)}>Edit</Button>
      </Card.Actions>
    </Card>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={renderGameItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No games added yet!</Text>
        }
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>{currentGame ? "Edit Game" : "Add Game"}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Game Name"
              value={gameName}
              onChangeText={setGameName}
              style={styles.input}
            />
            <TextInput
              label="Single Price"
              value={singlePrice}
              onChangeText={setSinglePrice}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Multi Price"
              value={multiPrice}
              onChangeText={setMultiPrice}
              keyboardType="numeric"
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            <Button
              onPress={handleSave}
              disabled={!gameName || !singlePrice || !multiPrice}
            >
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => openDialog()}
        label="Add Game"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingBottom: 80,
  },
  listContainer: {
    padding: 20,
  },
  card: {
    marginBottom: 15,
  },
  gameName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
})

export default GamesScreen
