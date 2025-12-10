import { Redirect } from "expo-router";

export default function index() {
  const isLoggedIn: boolean = false;

  return isLoggedIn ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auth)/OnboardScreen" />
  );
}
