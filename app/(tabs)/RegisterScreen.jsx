import React, { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import {
  TextInput,
  Button,
  Card,
  Switch,
  useTheme,
  IconButton,
} from "react-native-paper"
import { useRouter } from "expo-router"

const RegisterScreen = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isOwner, setIsOwner] = useState(false)
  const [placeName, setPlaceName] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Handle registration logic here
      console.log({ email, password, isOwner, placeName, location })
      alert("Registered successfully!")
      router.push("/login")
    }, 1500)
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Register</Text>

          {/* Email Input */}
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Password Input */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          {/* Owner/Employee Switch */}
          <View style={styles.switchContainer}>
            <Text>Owner</Text>
            <Switch value={isOwner} onValueChange={setIsOwner} />
          </View>

          {/* Additional Fields for Owner */}
          {isOwner && (
            <>
              <TextInput
                label="Place Name"
                value={placeName}
                onChangeText={setPlaceName}
                style={styles.input}
              />
              <TextInput
                label="Location"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
              />
            </>
          )}

          {/* Register Button */}
          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={
              !email || !password || (isOwner && (!placeName || !location))
            }
            style={styles.button}
          >
            Register
          </Button>

          {/* Links */}
          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.linkText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  linksContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#007BFF",
    marginTop: 10,
    textDecorationLine: "underline",
  },
})

export default RegisterScreen
