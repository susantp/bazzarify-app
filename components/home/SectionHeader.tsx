import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

type SectionHeaderProps = {
  title: string;
  showSeeMoreBtn?: boolean;
  seeMorePath?: string;
};
const SectionHeader = ({ title, seeMorePath }: SectionHeaderProps) => (
  <View
    id="header"
    className="mb-2 flex flex-row items-center justify-around px-2"
  >
    <Text className="flex-grow text-2xl font-semibold text-orange-600">
      {title}
    </Text>
    {seeMorePath && (
      <Link href={{ pathname: "/(tabs)/categories" }}>
        <Text>See More</Text>
      </Link>
    )}
  </View>
);

export default SectionHeader;
