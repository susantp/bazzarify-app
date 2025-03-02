import React, { useState } from "react";
import DeliveryBar from "@/components/home/DeliveryBar";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { FlatList, Image, useWindowDimensions, View } from "react-native";
import { randomUUID } from "expo-crypto";
import ContentWrapper from "@/components/common/ContentWrapper";
import useHomeScreenHook from "@/hooks/useHomeScreenHook";
import TopBar from "@/components/home/TopBar";
import DemoModalComponent from "@/components/common/DemoModalComponent";

export default function HomeScreen() {
  const { CARDS } = useHomeScreenHook();
  const [showModal, setShowModal] = useState(true);
  const { height } = useWindowDimensions();
  return (
    <SafeAreaWrapper>
      <TopBar className={`flex-row items-center justify-between px-2 py-5`} />
      <DeliveryBar className="flex-row items-center justify-center gap-2 bg-blue-950 py-2" />
      <ContentWrapper>
        <FlatList
          data={CARDS}
          renderItem={({ item, index }) => item.component}
          keyExtractor={(index) => randomUUID()}
        />
      </ContentWrapper>
      <DemoModalComponent
        showModal={showModal}
        handlePress={() => setShowModal(!showModal)}
        type="center"
      >
        <View className="flex items-center">
          <Image
            source={require("@/assets/products/cat-img.png")}
            style={{ height: height * 0.5 }}
            resizeMode="cover"
          />
        </View>
      </DemoModalComponent>
    </SafeAreaWrapper>
  );
}
