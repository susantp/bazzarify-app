import { FlatList, StyleProp, View, ViewStyle } from "react-native";
import * as Crypto from "expo-crypto";
import React from "react";
import SectionHeader, {
  SectionHeaderProps,
} from "@/components/home/SectionHeader";
import { Href } from "expo-router";

export interface ContentGridSectionProps<T> {
  title: string;
  items: T[] | undefined | null;
  renderItem: (item: T, index: number, cols: 2 | 3 | 4) => React.ReactElement;
  showDiscountBadge?: boolean;
  navigateTo?: string;
  className?: string;
  cols: 2 | 3 | 4;
  horizontal: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  id?: string;
  section?: SectionHeaderProps;
}

function ContentGridSection<T>({
  title,
  items,
  className,
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
    <View id={title.toLowerCase().replaceAll(" ", "-")} className={className}>
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
    </View>
  );
}

export default ContentGridSection;

interface GridWrapperProps {
  seeMorePath: Href;
  className?: string;
  title: string;
  children: React.ReactNode;
}
export function GridWrapper({
  className,
  seeMorePath,
  title,
  children,
}: GridWrapperProps) {
  return (
    <View id={title.toLowerCase().replaceAll(" ", "-")} className={className}>
      <SectionHeader title={title} seeMorePath={seeMorePath} />
      {children}
    </View>
  );
}
