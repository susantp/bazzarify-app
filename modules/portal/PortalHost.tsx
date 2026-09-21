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
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    zIndex: 9999,
    elevation: 9999,
  },
});
