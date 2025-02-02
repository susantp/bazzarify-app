import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { router } from "expo-router";
import ContentWrapper from "@/components/common/ContentWrapper";
import { FlatList, Text, TouchableOpacity } from "react-native";
import React from "react";
import VendorHeader, { vendorData } from "@/components/vendor/VendorBanner";
import { randomUUID } from "expo-crypto";
import { Entypo } from "@expo/vector-icons";

export default function Page() {
  const vendor = vendorData;
  const canGoBack = router.canGoBack();
  const categoryItems = [
    { id: randomUUID(), label: "Watch" },
    { id: randomUUID(), label: "Earbuds" },
    { id: randomUUID(), label: "Speaker" },
    { id: randomUUID(), label: "Power Bank" },
    { id: randomUUID(), label: "Soundbar" },
  ];
  return (
    <SafeAreaWrapper>
      <VendorHeader canGoBack={canGoBack} vendor={vendor} />
      <ContentWrapper>
        <FlatList
          contentContainerClassName="gap-y-4 p-4 "
          data={categoryItems}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.4}
              className="flex-row justify-between border-b border-b-slate-300 py-2"
            >
              <Text className="pl-7 text-xl font-semibold">{item.label}</Text>
              <Entypo name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
          )}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
