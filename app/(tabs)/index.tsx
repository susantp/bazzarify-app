import React from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { Button, FlatList, Image } from "react-native";
import useHomeScreenHook from "@/hooks/useHomeScreenHook";
import TopBar from "@/components/home/TopBar";
import DemoModalComponent from "@/components/common/DemoModalComponent";
import Animated, { FadeIn } from "react-native-reanimated";
import { geocodeAddressAtom, locationErrorAtom } from "@/atoms/locationAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import DeliveryBar from "@/components/home/DeliveryBar";
import { useLocation } from "@/modules/core/hooks/useLocation";
import homePopupAtom from "@/modules/core/atoms/homePopupAtom";
import { openAuthSessionAsync } from "expo-web-browser";
import * as Linking from "expo-linking";
import Toast from "react-native-toast-message";
import ContentWrapper from "@/components/common/ContentWrapper";
import { randomUUID } from "expo-crypto";

export default function HomeScreen() {
  const [showModal, setShowModal] = useRecoilState(homePopupAtom);
  const address = useRecoilValue(geocodeAddressAtom);
  const error = useRecoilValue(locationErrorAtom);
  const { refresh } = useLocation();
  const { CARDS } = useHomeScreenHook();

  const _handlePressButtonAsync = async () => {
    const url = "http://192.168.1.65:3000/api/browser";
    let result = await openAuthSessionAsync(url, "bazzarify://");
    console.log(result);
    if (result.type === "success" && "url" in result) {
      const { url } = result;
      const parsedURL = Linking.parse(url);
      const queryParams = parsedURL.queryParams;
      if (queryParams) {
        const { message } = queryParams;
        Toast.show({
          position: "bottom",
          text1: message as string,
          type: "success",
        });
      }
    }
  };
  return (
    <SafeAreaWrapper>
      <TopBar className={`flex-row items-center justify-between px-2 py-5`} />
      <DeliveryBar
        locationError={error}
        refresh={refresh}
        displayCurrentAddress={address}
        className="flex-row items-center justify-center gap-2 bg-blue-950 py-2"
      />
      <Button title="open Browser" onPress={_handlePressButtonAsync} />
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
