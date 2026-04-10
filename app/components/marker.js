import {Pressable, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Marker} from "react-native-maps";
import {useNavigation} from "@react-navigation/native";

function MapMarker({sheep}) {
    const navigation = useNavigation();

    return (
        <Marker onPress={() => navigation.navigate("MapStack", {screen: "Details", params: {id: sheep.id}})}
                coordinate={sheep.coords}>
            <View className={"border-black border-2 rounded-full bg-blue-200"}>
                <MaterialCommunityIcons name="sheep" size={30} color={sheep.color}/>
            </View>
        </Marker>
    )
}

export default MapMarker