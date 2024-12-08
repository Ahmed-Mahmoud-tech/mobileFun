// src/screens/PurchasesScreen.js
import React, { useState } from "react"
import { View, Button, FlatList } from "react-native"
import PurchaseItem from "@/components/PurchaseItem"
import Popup from "@/components/Popup"

const PurchasesScreen = () => {
  const [purchases, setPurchases] = useState([])
  const [isPopupVisible, setPopupVisible] = useState(false)
  const [newPurchase, setNewPurchase] = useState({ name: "", price: "" })

  const addPurchase = () => {
    setPurchases([...purchases, newPurchase])
    setNewPurchase({ name: "", price: "" })
    setPopupVisible(false)
  }

  return (
    <View>
      <Button title="Add Purchase" onPress={() => setPopupVisible(true)} />
      <FlatList
        data={purchases}
        renderItem={({ item }) => <PurchaseItem purchase={item} />}
        keyExtractor={(item) => item.name}
      />
      <Popup visible={isPopupVisible} onClose={() => setPopupVisible(false)}>
        <Input
          placeholder="Purchase Name"
          value={newPurchase.name}
          onChangeText={(text) =>
            setNewPurchase({ ...newPurchase, name: text })
          }
        />
        <Input
          placeholder="Price"
          value={newPurchase.price}
          onChangeText={(text) =>
            setNewPurchase({ ...newPurchase, price: text })
          }
        />
        <Button title="Add" onPress={addPurchase} />
      </Popup>
    </View>
  )
}

export default PurchasesScreen
