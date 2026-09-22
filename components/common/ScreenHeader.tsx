import { router } from "expo-router";
import React from "react";
import { AppBar, type AppBarProps } from "@/components/design-system";

interface ScreenHeaderProps extends Pick<
  AppBarProps,
  "title" | "iconColor" | "interactive" | "style" | "testID"
> {
  title?: string;
  titleColor?: string;
}

const ScreenHeader = ({
  title,
  iconColor,
  interactive = true,
  titleColor,
  style,
  testID,
}: ScreenHeaderProps) => {
  const canGoBack = router.canGoBack();
  return (
    <AppBar
      title={title}
      iconColor={iconColor}
      titleColor={titleColor}
      interactive={interactive}
      canGoBack={canGoBack}
      onBackPress={() => (canGoBack ? router.back() : router.dismissTo("/"))}
      style={style}
      testID={testID}
    />
  );
};
export default ScreenHeader;
