import { useEffect, useMemo, useState } from "react"
import Header from "@/components/Header/Header"
import MainDrawer from "@/components/MainDrawer/MainDrawer"
import { Animated, SafeAreaView, StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"

function Wrapper({ children }) {
  const [first, setFirst] = useState(false)
  const menuStatus = useSelector((state) => state.mainConfig.menuStatus)

  // Initialize height with an animated value
  const height = useMemo(() => new Animated.Value(0), []) // Start with height of 0

  // Function to animate the height value
  const animateHeight = () => {
    Animated.timing(height, {
      toValue: menuStatus ? 0 : 300, // Toggle between 0 (hidden) and 300 (expanded height)
      duration: first ? 500 : 0, // Animation duration
      useNativeDriver: false, // Cannot use native driver for `height`
    }).start()
    setFirst(true)
  }

  // Trigger animation on menuStatus change
  useEffect(() => {
    animateHeight()
  }, [menuStatus])

  return (
    <>
      <View style={styles.header}>
        <Header />
      </View>
      {first && (
        <View style={styles.drawerContainer}>
          <Animated.View
            style={[
              styles.drawer,
              {
                height: height, // Apply animated height value
              },
            ]}
          >
            <MainDrawer />
          </Animated.View>
        </View>
      )}
      {children}
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    zIndex: 10,
  },
  drawerContainer: {
    // flex: 1,
    width: "100%",
    zIndex: 1,
    // position: "absolute",
  },
  drawer: {
    width: "100%",
    backgroundColor: "#fff",
    overflow: "hidden", // Ensures content is hidden when height is reduced
  },
})

export default Wrapper
