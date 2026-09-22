import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import { Colors } from "@/constants/Colors";
import { randomUUID } from "expo-crypto";
import cn from "@/utils/tailwindHelper";

export default function Page() {
  const [selectedDiscount, setSelectedDiscount] = useState("50%");
  const handleSelectDiscount = (discount: string) =>
    setSelectedDiscount(discount);
  const discountList = ["All", "10%", "20%", "30%", "40%", "50%"];
  return (
    <SafeAreaWrapper className="bg-white">
      <ScreenHeader
        title="Flash Deal"
        iconColor={Colors.light.tint}
        titleColor={Colors.light.tint}
      />
      <ContentWrapper>
        <BubbleDesign />
        <View className="flex-row items-center justify-between px-2">
          <Text className="text-xl font-semibold">Choose your discount</Text>
          <DealTimer />
        </View>
        <View className="p-3">
          <DiscountSelection
            selectedDiscount={selectedDiscount}
            discounts={discountList}
            onSelectDiscount={handleSelectDiscount}
          />
        </View>
        <View className="flex-row justify-between px-2 py-6">
          <Text className="text-xl font-bold text-primary">
            {selectedDiscount === "All" ? "" : `${selectedDiscount} Discount`}
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            className="rounded-lg bg-orange-50 p-1"
          >
            <Ionicons
              name="options"
              size={28}
              color={Colors.light.tint}
              className="rotate-90"
            />
          </TouchableOpacity>
        </View>
        {/*<ContentGridSection*/}
        {/*  className="align-center flex-col bg-white"*/}
        {/*  title={"Popular Items"}*/}
        {/*  items={popularItemsData}*/}
        {/*  horizontal={false}*/}
        {/*  cols={2}*/}
        {/*  renderItem={(item, index, cols) => (*/}
        {/*    <ProductCard item={item} key={index} cols={cols} />*/}
        {/*  )}*/}
        {/*/>*/}
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}

interface DiscountSelectionProps {
  discounts: string[];
  onSelectDiscount: (discount: string) => void;
  selectedDiscount: string;
}

const DiscountSelection = ({
  discounts,
  onSelectDiscount,
  selectedDiscount,
}: DiscountSelectionProps) => (
  <View className="flex-row items-center justify-between justify-items-center rounded-lg bg-slate-50 p-1">
    {discounts.map((discount) => (
      <TouchableOpacity
        key={randomUUID()}
        className={cn(
          "rounded-full px-4 py-3",
          selectedDiscount === discount ? "border-2 border-primary" : undefined,
        )}
        onPress={() => onSelectDiscount(discount)}
      >
        <Text className="font-semibold">{discount}</Text>
      </TouchableOpacity>
    ))}
  </View>
);
const DealTimer = () => (
  <View className="flex-row items-center gap-x-2">
    <View className="p-2">
      <Entypo name="stopwatch" size={28} color="white" />
    </View>
    <View className="rounded-lg bg-white p-2">
      <Text className="font-semibold">00</Text>
    </View>
    <View className="rounded-lg bg-white p-2">
      <Text className="font-semibold">36</Text>
    </View>
    <View className="rounded-lg bg-white p-2">
      <Text className="font-semibold">58</Text>
    </View>
  </View>
);
const BubbleDesign = () => (
  <View>
    <View
      style={{
        position: "absolute",
        top: -80,
        left: 100,
      }}
    >
      <Image source={require("@/assets/images/flashDeal/bubble00.png")} />
    </View>
    <View
      style={{
        position: "absolute",
        top: -80,
        left: 50,
        transform: [{ rotateY: "50deg" }],
      }}
    >
      <Image source={require("@/assets/images/flashDeal/bubble01.png")} />
    </View>
  </View>
);
