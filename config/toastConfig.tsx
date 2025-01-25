import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";
import { Colors } from "@/constants/Colors";

const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      contentContainerStyle={{
        paddingHorizontal: 10,
        backgroundColor: Colors.light.tint,
        width: "auto",
        borderLeftColor: "yellow",
      }}
      text1Style={{
        fontSize: 15,
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
