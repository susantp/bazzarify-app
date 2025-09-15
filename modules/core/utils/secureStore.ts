import * as SecureStore from "expo-secure-store";
import * as Sentry from "@sentry/react-native";

export async function setStorage(key: string, value: string) {
  try {
    return await SecureStore.setItemAsync(key, value);
  } catch (error) {
    Sentry.captureException(error);
    return Promise.reject(error);
  }
}

export async function retrieveStorage(key: string) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
}

export async function deleteStorage(key: string) {
  return SecureStore.deleteItemAsync(key);
}
