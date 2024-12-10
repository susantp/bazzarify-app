import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const QuestionIconBox = () => (
  <Svg width="35" height="36" viewBox="0 0 35 36" fill="none">
    <Path
      d="M29.1667 3.71231H5.83333C4.22916 3.71231 2.91666 5.02481 2.91666 6.62898V32.879L8.75 27.0456H29.1667C30.7708 27.0456 32.0833 25.7331 32.0833 24.129V6.62898C32.0833 5.02481 30.7708 3.71231 29.1667 3.71231ZM18.9583 21.2123H16.0417V18.2956H18.9583V21.2123ZM21.5833 13.9206C21.1458 14.504 20.5625 14.7956 19.9792 15.0873C19.5417 15.379 19.3958 15.5248 19.25 15.8165C18.9583 16.1081 18.9583 16.3998 18.9583 16.8373H16.0417C16.0417 16.1081 16.1875 15.6706 16.4792 15.2331C16.7708 14.9415 17.3542 14.504 18.0833 14.0665C18.5208 13.9206 18.8125 13.629 18.9583 13.3373C19.1042 13.0456 19.25 12.6081 19.25 12.3165C19.25 11.879 19.1042 11.5873 18.8125 11.2956C18.5208 11.004 18.0833 10.8581 17.6458 10.8581C17.2083 10.8581 16.9167 11.004 16.625 11.1498C16.3333 11.2956 16.1875 11.5873 16.1875 12.0248H13.2708C13.4167 11.004 13.8542 10.129 14.5833 9.54564C15.3125 8.96231 16.3333 8.81648 17.6458 8.81648C18.9583 8.81648 20.125 9.10814 20.8542 9.69148C21.5833 10.2748 22.0208 11.1498 22.0208 12.1706C22.1667 12.754 22.0208 13.3373 21.5833 13.9206Z"
      fill="#F05625"
    />
  </Svg>
);
const AskQuestionBox = () => (
  <View
    id="reviews"
    className="flex-col items-center justify-items-center gap-y-1 rounded-xl border border-gray-400 py-2"
  >
    <QuestionIconBox />
    <Text className="text-xl">Ask a question.</Text>
    <TouchableOpacity>
      <Text className="text-md text-gray-500">
        log-in or sign-up to ask question
      </Text>
    </TouchableOpacity>
  </View>
);

export default AskQuestionBox;
