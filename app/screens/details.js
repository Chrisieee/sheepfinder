import {SafeAreaView, Text} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";

function Details() {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="items-center">
                <Text>Details</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Details