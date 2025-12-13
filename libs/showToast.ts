import Toast from "react-native-toast-message";

interface ToastProps {
  type: "success" | "error" | "info";
  text1: string;
  text2?: string;
}

function showToast({ type, text1, text2 }: ToastProps) {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime: 3000,
    position: "top",
  });
}

export default showToast;
