import React from "react";
import { Image, View } from "react-native";
import { Colors, primaryColor } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { TCategoryWithImage } from "@/modules/product/schemas/CategorySchema";
import { TImage } from "@/modules/product/schemas/ImageSchema";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function resolveCategoryImageUrl(item: TCategoryWithImage): string | null {
  const firstImage = item.images?.[0] as TImage | undefined;
  const baseUrl = item.icon_base_url;

  if (!firstImage || !baseUrl) {
    return null;
  }

  return [baseUrl.replace(/\/+$/, ""), firstImage.file.replace(/^\/+/, "")]
    .filter(Boolean)
    .join("/");
}

export default function CategoryAvatar({
  item,
  size = 100,
}: {
  item: TCategoryWithImage;
  size?: number;
}) {
  const imageUrl = resolveCategoryImageUrl(item);
  const initials = getInitials(item.name);

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: size,
          height: size,
          borderRadius: 16,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 16,
        backgroundColor: primaryColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemedText
        darkColor={Colors.light.background}
        lightColor={Colors.light.background}
        type="subtitle"
      >
        {initials || "?"}
      </ThemedText>
    </View>
  );
}
