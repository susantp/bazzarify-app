import React, { Suspense, useCallback, useState } from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { FlatList, Image } from "react-native";
import useHomeScreenHook from "@/modules/home/hooks/useHomeScreenHook";
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
import { useQueryClient } from "@tanstack/react-query";

export default function HomeScreen() {
  const [showModal, setShowModal] = useAtom(homePopupAtom);
  const address = useAtomValue(geocodeAddressAtom);
  const error = useAtomValue(locationErrorAtom);
  const { refresh } = useLocation();

  const { CARDS } = useHomeScreenHook();

  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["flashDealProducts"] }),
        queryClient.invalidateQueries({ queryKey: ["popularProducts"] }),
        queryClient.invalidateQueries({ queryKey: ["homeCategories"] }),
        queryClient.invalidateQueries({ queryKey: ["just-for-you-products"] }),
        refresh(),
      ]);
    } finally {
      setRefreshing(false);
    }
  }, [queryClient, refresh]);

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
            renderItem={({ item, index }) => item.component}
            keyExtractor={(index) => randomUUID()}
            refreshing={refreshing}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
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
              {/*popup ad*/}
              <Image
                source={require("@/assets/images/ads/popup-home.png")}
                style={{ height: 315, width: 315 }}
              />
            </Animated.View>
          </DemoModalComponent>
        )}
      </SafeAreaWrapper>
    </Suspense>
  );
}
