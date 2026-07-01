import {Pressable, View} from "react-native";
import {Fontisto, MaterialCommunityIcons} from "@expo/vector-icons";
import {Marker} from "react-native-maps";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {useSheep} from "../context/sheep-context";

function MapMarker({sheep}) {
    const navigation = useNavigation();
    const {finds} = useSheep()
    const [found, setFound] = useState(false)

    useEffect(() => {
        setFound(finds.includes(sheep.id))
    }, [finds]);

    return (
        <Marker onPress={() => navigation.navigate("MapStack", {screen: "Details", params: {id: sheep.id}})}
                coordinate={sheep.coords}>
            <View style={{width: 36, height: 36}}
                  className={"border-black border-2 rounded-full bg-blue-200 dark:bg-blue-800 justify-center items-center"}>
                {found ? <MaterialCommunityIcons name="sheep" size={29} color={sheep.color}/>
                    : <Fontisto name="question" size={20} color="black"/>}
            </View>
        </Marker>
    )
}

export default MapMarker