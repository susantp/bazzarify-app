import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";
import { Colors } from "@/constants/Colors";

const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: Colors.light.tint,
        borderRadius: 20,
        borderLeftColor: "transparent",
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "400",
        color: "white",
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{
        backgroundColor: "red",
      }}
      text1Style={{
        fontSize: 17,
        color: "white",
      }}
      text2Style={{
        fontSize: 15,
        color: "white",
      }}
    />
  ),
};
export default toastConfig;
