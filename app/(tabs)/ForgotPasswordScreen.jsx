import React, { useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import { TextInput, Button } from "react-native-paper"
import { useRouter } from "expo-router"

const ForgotPasswordScreen = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleResetPassword = () => {
    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.")
      return
    }

    setLoading(true)

    // Simulate password reset API call
    setTimeout(() => {
      setLoading(false)
      setMessage("If this email exists, a reset link has been sent!")
    }, 2000)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address, and we'll send you a link to reset your
        password.
      </Text>

      {/* Email Input */}
      <TextInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Reset Password Button */}
      <Button
        mode="contained"
        onPress={handleResetPassword}
        loading={loading}
        disabled={!email}
        style={styles.button}
      >
        Send Reset Link
      </Button>

      {/* Success/Error Message */}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      {/* Back to Login Link */}
      <Text style={styles.backLink} onPress={() => router.push("/login")}>
        Back to Login
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  message: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#007BFF",
  },
  backLink: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
})

export default ForgotPasswordScreen
