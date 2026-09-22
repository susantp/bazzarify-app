import { FlatList, StyleProp, ViewStyle } from "react-native";
import * as Crypto from "expo-crypto";
import React from "react";
import SectionHeader, {
  SectionHeaderProps,
} from "@/components/home/SectionHeader";
import { Href } from "expo-router";
import { Box } from "@/components/design-system";

export interface ContentGridSectionProps<T> {
  title: string;
  items: T[] | undefined | null;
  renderItem: (item: T, index: number, cols: 2 | 3 | 4) => React.ReactElement;
  showDiscountBadge?: boolean;
  navigateTo?: string;
  style?: StyleProp<ViewStyle>;
  cols: 2 | 3 | 4;
  horizontal: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  id?: string;
  section?: SectionHeaderProps;
}

function ContentGridSection<T>({
  title,
  items,
  style,
  cols,
  horizontal,
  contentContainerStyle,
  renderItem,
  section,
}: ContentGridSectionProps<T>) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <Box id={title.toLowerCase().replaceAll(" ", "-")} style={style}>
      {section && (
        <SectionHeader
          title={section.title}
          seeMorePath={section.seeMorePath}
        />
      )}
      <FlatList
        id="content"
        data={items}
        renderItem={({ item, index }) => renderItem(item as T, index, cols)}
        contentContainerStyle={contentContainerStyle}
        keyExtractor={() => Crypto.randomUUID()}
        horizontal={horizontal}
        numColumns={cols}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
}

export default ContentGridSection;

interface GridWrapperProps {
  seeMorePath?: Href;
  style?: StyleProp<ViewStyle>;
  title: string;
  children: React.ReactNode;
  testID?: string;
}
export function GridWrapper({
  style,
  seeMorePath,
  title,
  children,
  testID,
}: GridWrapperProps) {
  return (
    <Box
      testID={testID}
      id={title.toLowerCase().replaceAll(" ", "-")}
      backgroundColor="surface"
      paddingX="xs"
      paddingY="md"
      style={style}
    >
      <SectionHeader title={title} seeMorePath={seeMorePath} />
      {children}
    </Box>
  );
}
