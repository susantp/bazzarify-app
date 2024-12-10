import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

const useBottomViewHook = () => {
  const [bottomViewHeight, setBottomViewHeight] = useState(0);
  const handleBottomViewLayoutEvent = (event: LayoutChangeEvent) => {
    setBottomViewHeight(event.nativeEvent.layout.height);
  };
  const paddingAfterBottomView = bottomViewHeight;
  return {
    bottomViewHeight,
    handleBottomViewLayoutEvent,
    paddingAfterBottomView,
  };
};
export default useBottomViewHook;
