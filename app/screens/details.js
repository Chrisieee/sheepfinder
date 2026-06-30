import {Pressable, Text, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {useSheep} from "../context/sheep-context";
import {useTranslation} from "react-i18next";
import {Fontisto, MaterialCommunityIcons} from "@expo/vector-icons";

function Details({route}) {
    const {sheeps} = useSheep()
    const [sheep, setSheep] = useState(null)
    const [found, setFound] = useState(false)
    const {t} = useTranslation()

    useEffect(() => {
        if (route.params.id) {
            setSheep(sheeps.items.find(s => s.id === Number(route.params.id)))
        }
    }, [route.params]);

    return (
        <SafeAreaProvider>
            <SafeAreaView className="items-center pt-5 flex-1 flex gap-2 ">
                {sheep ?
                    <>
                        <Text style={{textAlign: "center", width: "100%"}}
                              className="text-2xl font-bold w-full text-center">{sheep.title}</Text>
                        <Text>{t("details.kind")}: {sheep.kind}</Text>
                        <View
                            className="border-black border-2 rounded-full bg-blue-200 p-2 w-40 h-40 items-center justify-center">
                            {found ? <MaterialCommunityIcons name="sheep" size={100} color={sheep.color}/>
                                : <Fontisto name="question" size={80} color="black"/>}
                        </View>
                        <Pressable
                            className="bg-blue-400 px-6 py-2 rounded-full flex items-center"><Text>{t("details.found")}</Text></Pressable>
                    </> : <Text>aan het laden</Text>
                }

            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Details