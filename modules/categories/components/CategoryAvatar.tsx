import React from "react";
import { TCategoryWithImage } from "@/modules/product/schemas/CategorySchema";
import { TImage } from "@/modules/product/schemas/ImageSchema";
import { Box, Image, Text } from "@/components/design-system";

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
    return <Image source={{ uri: imageUrl }} size={size} radius="lg" />;
  }

  return (
    <Box
      align="center"
      justify="center"
      backgroundColor="primary"
      borderRadius="lg"
      style={{ height: size, width: size }}
    >
      <Text variant="bodyMedium" color="textInverted">
        {initials || "?"}
      </Text>
    </Box>
  );
}
