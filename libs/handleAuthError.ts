import { router } from "expo-router";
import showToast from "./showToast";

export function handleAuthError(errorType: string) {
  switch (errorType) {
    case "user_session_not_found":
    case "user_unauthorized":
    case "user_jwt_invalid":
      router.replace("/(auth)/LoginScreen");
      break;

    case "user_not_found":
      showToast({
        type: "error",
        text1: "User not found",
        text2: "No account found with the provided credentials.",
      });
      break;

    case "user_blocked":
      showToast({
        type: "error",
        text1: "User blocked",
        text2: "Your account has been blocked. Contact support.",
      });
      break;

    case "user_invalid_credentials":
      showToast({
        type: "error",
        text1: "Invalid credentials",
        text2:
          "The email or password you entered is incorrect. Please try again.",
      });
      break;

    case "user_already_exists":
      showToast({
        type: "error",
        text1: "Account already exists",
        text2:
          "Please log in to your account or use a different email to sign up.",
      });
      break;

    case "user_email_already_exists":
      showToast({
        type: "error",
        text1: "Account already exists",
        text2: "An account with this email already exists. Please log in.",
      });
      router.replace("/(auth)/LoginScreen");
      break;

    default:
      showToast({
        type: "error",
        text1: "Something went wrong",
        text2: "An error has occured. Please try again later.",
      });
  }
}
