import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import * as Crypto from "expo-crypto";
import React from "react";
import { ItemProps, titleKey } from "@/components";
import { componentMapper } from "@/components/utils";
import { CategoriesItemData } from "@/constants/categoriesItemData";

export type ContentGridSectionProps = {
  title: string;
  items: CategoriesItemData[] | undefined | null;
  showDiscountBadge?: boolean;
  navigateTo?: string;
  className?: string;
  cols: 2 | 3 | 4;
  horizontal: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  id?: string;
};
const ContentGridSection = ({
  title,
  items,
  className,
  cols,
  horizontal,
  contentContainerStyle,
  children,
}: ContentGridSectionProps) => {
  return (
    <View id={title.toLowerCase().replaceAll(" ", "-")} className={className}>
      {children}
      <FlatList
        id="content"
        data={items}
        renderItem={({
          item,
          index,
        }: ListRenderItemInfo<ItemProps | CategoriesItemData>) =>
          componentMapper({
            item,
            index,
            titleKey: title as titleKey,
            cols: cols,
          })
        }
        contentContainerStyle={contentContainerStyle}
        keyExtractor={() => Crypto.randomUUID()}
        horizontal={horizontal}
        numColumns={cols}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
export default ContentGridSection;
