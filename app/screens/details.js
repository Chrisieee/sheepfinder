import {SafeAreaView, Text} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";

function Details() {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="items-center pt-5 flex-1">
                <Text>Details</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Details