import React, { useState } from "react"
import { Appbar, Badge, Text } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { ChangeMenuStatus } from "@/store/slices/mainConfig"
import { StyleSheet, View } from "react-native"
const Header = () => {
  const menuStatus = useSelector((state) => state.mainConfig.menuStatus)
  const dispatch = useDispatch()
  const menuChange = () => {
    dispatch(ChangeMenuStatus(!menuStatus))
  }
  const _handleSearch = () => {
    console.log("first")
  }

  const [notificationCount, setNotificationCount] = useState(3) // Example notification count

  return (
    <Appbar.Header>
      <Appbar.Content title="Title" />
      <Appbar.Content title="hamada" />
      <View>
        <Appbar.Action icon="bell" onPress={_handleSearch} />
        {notificationCount > 0 && (
          <Badge size={16} style={styles.badge}>
            {notificationCount}
          </Badge>
        )}
      </View>
      <Appbar.Action icon="dots-vertical" onPress={menuChange} />
    </Appbar.Header>
  )
}

export default Header
const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 9,
    right: 9,
    backgroundColor: "red",
    color: "white",
  },
})
