import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { View } from "react-native";

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
    <>
      <View
        style={{
          backgroundColor: "red",
          borderRadius: 20,
          padding: 6,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: -10,
          marginLeft: 10,
          zIndex: 2,
        }}
      >
        <AntDesign size={30} name="alert" color="#fff" />
      </View>
      <ErrorToast
        {...props}
        contentContainerStyle={{
          backgroundColor: "red",
        }}
        text1Style={{
          fontSize: 15,
          color: "white",
        }}
        text2Style={{
          fontSize: 10,
          color: "white",
        }}
      />
    </>
  ),
};
export default toastConfig;
