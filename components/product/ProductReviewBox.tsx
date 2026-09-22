import React from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Image, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

type ProductReview = {
  content: string;
  id: string;
  rating: number;
  reviewer: string;
};

const reviews: ProductReview[] = Array.from({ length: 11 }, (_, index) => ({
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  id: `review-${index + 1}`,
  rating: 4,
  reviewer: "Ayush P.",
}));

const ProductReviewBox = () => (
  <Box paddingX="lg">
    <Box id="reviews" gap="md">
      <Box direction="row" justify="space-between" paddingX="xxl">
        <Text variant="title">Reviews</Text>
        <Text variant="body">view more</Text>
      </Box>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {reviews.map((review) => (
          <ProductReviewDetails key={review.id} review={review} />
        ))}
      </ScrollView>
    </Box>
  </Box>
);

const ProductReviewDetails = ({ review }: { review: ProductReview }) => {
  const theme = useBazarifyTheme();

  return (
    <Box style={{ marginRight: theme.spacing.lg, width: 208 }}>
      <Box
        id="review-detail"
        gap="sm"
        borderRadius="xl"
        backgroundColor="surface"
        padding="md"
        style={{ borderColor: theme.colors.border, borderWidth: 1 }}
      >
        <Box id="product-slider" align="center">
          <Image
            source={require("@/assets/products/product.png")}
            size={96}
            radius="md"
          />
        </Box>
        <Box id="product-reviewer" align="center">
          <Text variant="bodyMedium">{review.reviewer}</Text>
        </Box>
        <Box
          id="product-review-rating"
          direction="row"
          align="center"
          justify="center"
          gap="xs"
        >
          {Array.from({ length: review.rating }, (_, index) => (
            <Icon key={`${review.id}-star-${index}`} size={20} color="warning">
              {({ color, size }) => (
                <Ionicons name="star" size={size} color={color} />
              )}
            </Icon>
          ))}
        </Box>
        <Box id="product-review-content" align="center">
          <Text variant="body">{review.content}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductReviewBox;
