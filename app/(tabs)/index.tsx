import React from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { FlatList, Image } from "react-native";
import useHomeScreenHook from "@/hooks/useHomeScreenHook";
import TopBar from "@/components/home/TopBar";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import Animated, { FadeIn } from "react-native-reanimated";
import { geocodeAddressAtom, locationErrorAtom } from "@/atoms/locationAtom";

import DeliveryBar from "@/components/home/DeliveryBar";
import { useLocation } from "@/modules/core/hooks/useLocation";
import homePopupAtom from "@/modules/core/atoms/homePopupAtom";
import ContentWrapper from "@/components/common/ContentWrapper";
import { randomUUID } from "expo-crypto";
import { useAtom, useAtomValue } from "jotai";

export default function HomeScreen() {
  const [showModal, setShowModal] = useAtom(homePopupAtom);
  const address = useAtomValue(geocodeAddressAtom);
  const error = useAtomValue(locationErrorAtom);
  const { refresh } = useLocation();
  const { CARDS } = useHomeScreenHook();

  return (
    <SafeAreaWrapper>
      <TopBar className={`flex-row items-center justify-between px-2 py-5`} />
      <DeliveryBar
        locationError={error}
        refresh={refresh}
        displayCurrentAddress={address}
        className="flex-row items-center justify-center gap-2 bg-blue-950 py-2"
      />
      <ContentWrapper>
        <FlatList
          data={CARDS}
          renderItem={({ item, index }) => item.component}
          keyExtractor={(index) => randomUUID()}
        />
      </ContentWrapper>
      {showModal && (
        <DemoModalComponent
          showModal={showModal}
          handlePress={() => setShowModal(!showModal)}
          type="center"
        >
          <Animated.View
            className="flex items-center"
            entering={FadeIn.duration(1000)}
          >
            <Image
              source={require("@/assets/images/ads/popup-home.png")}
              style={{ height: 315, width: 315 }}
            />
          </Animated.View>
        </DemoModalComponent>
      )}
    </SafeAreaWrapper>
  );
}
