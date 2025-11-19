import React, { Suspense, useState } from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { FlatList, Image, RefreshControl } from "react-native";
import useHomeScreenHook from "@/modules/home/hooks/useHomeScreenHook";
import TopBar from "@/components/home/TopBar";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import Animated, { FadeIn } from "react-native-reanimated";
import {
  geocodeAddressAtom,
  latitudeAtom,
  locationErrorAtom,
  longitudeAtom,
} from "@/atoms/locationAtom";

import DeliveryBar from "@/components/home/DeliveryBar";
import { useLocation } from "@/modules/core/hooks/useLocation";
import homePopupAtom from "@/modules/core/atoms/homePopupAtom";
import ContentWrapper from "@/components/common/ContentWrapper";
import { useAtom, useAtomValue } from "jotai";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Coordinates } from "expo-maps";

export default function HomeScreen() {
  const [showModal, setShowModal] = useAtom(homePopupAtom);
  const address = useAtomValue(geocodeAddressAtom);
  const error = useAtomValue(locationErrorAtom);
  const { refresh } = useLocation();
  const { CARDS, refreshing, onRefresh, justForYouProductsQueryResult } =
    useHomeScreenHook();

  return (
    <Suspense fallback={null}>
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
            renderItem={({ item }) => (item.component ? item.component : null)}
            keyExtractor={(item) => item.id}
            initialNumToRender={4}
            windowSize={5}
            maxToRenderPerBatch={6}
            removeClippedSubviews
            refreshControl={
              <RefreshControl
                refreshing={Boolean(refreshing)}
                onRefresh={onRefresh}
              />
            }
            ListEmptyComponent={
              justForYouProductsQueryResult.isLoading ? (
                <ThemedLoader />
              ) : (
                <ThemedText
                  type="title"
                  darkColor={Colors.light.tint}
                  lightColor={Colors.light.tint}
                >
                  No child categories found
                </ThemedText>
              )
            }
          />
        </ContentWrapper>
        {showModal ? (
          <DemoModalComponent
            showModal={showModal}
            handlePress={() => setShowModal(!showModal)}
            type="center"
          >
            <Animated.View
              className="flex items-center"
              entering={FadeIn.duration(1000)}
            >
              {/*popup ad*/}
              <Image
                source={require("@/assets/images/ads/popup-home.png")}
                style={{ height: 315, width: 315 }}
              />
            </Animated.View>
          </DemoModalComponent>
        ) : null}
      </SafeAreaWrapper>
    </Suspense>
  );
}
