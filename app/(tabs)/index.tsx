import Header from "@/components/Header";
import React from "react";
import {Platform, ScrollView, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import DeliveryBar from "@/components/DeliveryBar";


export default function HomeScreen() {
    const [sliders,] = React.useState([1, 2, 3])
    const ios = Platform.OS === 'ios';
    return (
        <SafeAreaView className={`flex-1 bg-orange-600` + (ios ? ' pb-2' : ' pt-3')}>
            <Header/>
            <DeliveryBar/>
            <ScrollView
                className="bg-white px-2"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
            >
                {Array.from(Array(100).keys()).map((i) => (
                    <Text key={i} className="text-black mb-4">Hello World</Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}