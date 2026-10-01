import { Suspense, useState } from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { FlatList, RefreshControl } from "react-native";
import { Image, Text } from "@/components/design-system";
import useHomeScreenHook from "@/modules/home/hooks/useHomeScreenHook";
import TopBar from "@/components/home/TopBar";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import Animated, { FadeIn } from "react-native-reanimated";
import { geocodeAddressAtom, locationErrorAtom } from "@/atoms/locationAtom";

import DeliveryBar from "@/components/home/DeliveryBar";
import { useLocation } from "@/modules/core/hooks/useLocation";
import homePopupAtom from "@/modules/core/atoms/homePopupAtom";
import ContentWrapper from "@/components/common/ContentWrapper";
import { useAtom, useAtomValue } from "jotai";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import LocationAccessCard from "@/components/home/LocationAccessCard";

export default function HomeScreen() {
  const [showModal, setShowModal] = useAtom(homePopupAtom);
  const [locationCardDismissed, setLocationCardDismissed] = useState(false);
  const address = useAtomValue(geocodeAddressAtom);
  const error = useAtomValue(locationErrorAtom);
  const {
    refresh,
    requestAccess,
    openLocationSettings,
    permissionStatus,
    canAskAgain,
    isRequesting,
  } = useLocation();
  const needsLocationAccess =
    permissionStatus === "undetermined" || permissionStatus === "denied";
  const locationStatus =
    permissionStatus === "checking"
      ? "checking"
      : permissionStatus === "granted"
        ? "available"
        : "unavailable";
  const { CARDS, refreshing, onRefresh, justForYouProductsQueryResult } =
    useHomeScreenHook();
  return (
    <Suspense fallback={null}>
      <SafeAreaWrapper>
        <TopBar />
        <DeliveryBar
          locationError={error}
          refresh={refresh}
          locationStatus={locationStatus}
          displayCurrentAddress={address}
          style={{ width: "100%" }}
        />
        {needsLocationAccess && !locationCardDismissed ? (
          <LocationAccessCard
            denied={permissionStatus === "denied"}
            canAskAgain={canAskAgain}
            isRequesting={isRequesting}
            onRequestAccess={requestAccess}
            onOpenSettings={openLocationSettings}
            onDismiss={() => setLocationCardDismissed(true)}
          />
        ) : null}
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
                <Text variant="title" color="primary">
                  No child categories found
                </Text>
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
              style={{ alignItems: "center" }}
              entering={FadeIn.duration(1000)}
            >
              {/*popup ad*/}
              <Image
                source={require("@/assets/images/ads/popup-home.png")}
                size={315}
                radius="none"
              />
            </Animated.View>
          </DemoModalComponent>
        ) : null}
      </SafeAreaWrapper>
    </Suspense>
  );
}
