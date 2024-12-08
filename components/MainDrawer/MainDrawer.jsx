import * as React from "react"
import { Drawer } from "react-native-paper"
import { useRouter } from "expo-router"
import { ScrollView } from "react-native"

const MainDrawer = () => {
  const [active, setActive] = React.useState("")
  const router = useRouter()
  return (
    <ScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Login"
          active={active === "login"}
          onPress={() => {
            router.push("/LoginScreen")
            setActive("login")
          }}
        />
        <Drawer.Item
          label="Register"
          active={active === "RegisterScreen"}
          onPress={() => {
            router.push("/RegisterScreen")
            setActive("RegisterScreen")
          }}
        />
        <Drawer.Item
          label="Verify Email Screen"
          active={active === "VerifyEmailScreen"}
          onPress={() => {
            router.push("/VerifyEmailScreen")
            setActive("VerifyEmailScreen")
          }}
        />
        <Drawer.Item
          label="Notification"
          active={active === "NotificationScreen"}
          onPress={() => {
            router.push("/NotificationScreen")
            setActive("NotificationScreen")
          }}
        />
        <Drawer.Item
          label="Employee Profile"
          active={active === "EmployeeProfileScreen"}
          onPress={() => {
            router.push("/EmployeeProfileScreen")
            setActive("EmployeeProfileScreen")
          }}
        />
        <Drawer.Item
          label="Owner Profile"
          active={active === "OwnerProfileScreen"}
          onPress={() => {
            router.push("/OwnerProfileScreen")
            setActive("OwnerProfileScreen")
          }}
        />
        <Drawer.Item
          label="Forgot Password"
          active={active === "ForgotPasswordScreen"}
          onPress={() => {
            router.push("/ForgotPasswordScreen")
            setActive("ForgotPasswordScreen")
          }}
        />
        <Drawer.Item
          label="Games"
          active={active === "GamesScreen"}
          onPress={() => {
            router.push("/GamesScreen")
            setActive("GamesScreen")
          }}
        />
        <Drawer.Item
          label="Purchases Items"
          active={active === "PurchaseItemsScreen"}
          onPress={() => {
            router.push("/PurchaseItemsScreen")
            setActive("PurchaseItemsScreen")
          }}
        />
        <Drawer.Item
          label="Players Purchases"
          active={active === "PlayersPurchasesScreen"}
          onPress={() => {
            router.push("/PlayersPurchasesScreen")
            setActive("PlayersPurchasesScreen")
          }}
        />
        <Drawer.Item
          label="play"
          active={active === "PlayScreen"}
          onPress={() => {
            router.push("/PlayScreen")
            setActive("PlayScreen")
          }}
        />
        <Drawer.Item
          label="Checkout"
          active={active === "CheckoutScreen"}
          onPress={() => {
            router.push("/CheckoutScreen")
            setActive("CheckoutScreen")
          }}
        />
        <Drawer.Item
          label="Reservations"
          active={active === "ReservationsScreen"}
          onPress={() => {
            router.push("/ReservationsScreen")
            setActive("ReservationsScreen")
          }}
        />
      </Drawer.Section>
    </ScrollView>
  )
}

export default MainDrawer
