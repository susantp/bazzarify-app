import { Platform, Text, View } from "react-native";
import React from "react";
import { Href, Link } from "expo-router";

export interface SectionHeaderProps {
  title: string;
  showSeeMoreBtn?: boolean;
  seeMorePath?: Href;
}
const SectionHeader = ({ title, seeMorePath }: SectionHeaderProps) => (
  <View
    id="header"
    className="mb-2 flex flex-row items-center justify-around px-2"
  >
    <Text
      style={{
        fontFamily: Platform.select({
          android: "Poppins_600SemiBold",
          ios: "Poppins_SemiBold",
        }),
      }}
      className="font-poppins text-primary flex-grow text-2xl"
    >
      {title}
    </Text>
    {seeMorePath && (
      <Link href={seeMorePath}>
        <Text style={{ fontFamily: "Poppins_200ExtraLight_Italic" }}>
          See More
        </Text>
      </Link>
    )}
  </View>
);

export default SectionHeader;
