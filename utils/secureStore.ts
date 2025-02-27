import * as SecureStore from "expo-secure-store";
import * as Sentry from "@sentry/react-native";

export async function save(key: string, value: string) {
  try {
    return await SecureStore.setItemAsync(key, value); // Convert object to string
  } catch (error) {
    Sentry.captureException(error);
    return Promise.reject(error);
  }
}

export async function getValueFor(key: string) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
}

export async function remove(key: string) {
  return SecureStore.deleteItemAsync(key);
}
