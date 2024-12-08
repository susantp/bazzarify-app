import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {Platform, Text, TextInput, View} from "react-native";
import {HeartIcon, MapIcon, ShoppingCartIcon} from "react-native-heroicons/outline";

export default function Header() {
    const ios = Platform.OS === 'ios';
    return (
        <View className={`flex-1 bg-orange-800`}>
            {/* searchbar and logo */}
            <SafeAreaView className={ios ? 'my-2' : 'my-3'}>
                <StatusBar style="light"/>
                <View className="flex flex-row justify-between items-center mx-4 gap-3 mb-4">
                    <View className="flex-1">
                        <TextInput placeholder="Search on Bazzarify" className="bg-white rounded-full px-4 py-2"/>
                    </View>
                    <View className="flex flex-row items-center gap-5">
                        <HeartIcon size={30} strokeWidth={2} color="white"/>
                        <ShoppingCartIcon size={30} strokeWidth={2} color="white"/>
                    </View>
                </View>
                <View className="flex flex-row justify-center p-2 items-center bg-blue-950 gap-2">
                    <MapIcon size={20} strokeWidth={2} color="white"/>
                    <Text className="text-white">Deliver to </Text>
                </View>
            </SafeAreaView>
        </View>
    )
}