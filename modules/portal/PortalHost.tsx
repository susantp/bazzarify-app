import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { PortalContext } from "./PortalContext";

export const PortalHost = () => {
  const { portalContent } = useContext(PortalContext);

  if (!portalContent) return null;

  return <View style={styles.overlay}>{portalContent()}</View>;
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9999,
    elevation: 9999,
  },
});
