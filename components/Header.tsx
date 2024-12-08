import {TextInput, View} from "react-native";
import {HeartIcon, ShoppingCartIcon} from "react-native-heroicons/outline";

export default function Header() {
    return (
        <View className={`flex flex-row justify-between items-center mx-4 gap-3 mb-safe-or-6`}>

            <View className="flex-1">
                <TextInput placeholder="Search on Bazzarify" className="bg-white rounded-full px-4 py-2"/>
            </View>

            <View className="flex flex-row items-center gap-5">
                <HeartIcon size={30} strokeWidth={2} color="white"/>
                <ShoppingCartIcon size={30} strokeWidth={2} color="white"/>
            </View>

        </View>
    )
}