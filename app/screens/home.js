import {View, Text, FlatList, Pressable, ActivityIndicator, SafeAreaView} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import title from "../components/title";
import {useEffect, useState} from "react";
import {useApi} from "../context/api-context";
import {useSheep} from "../context/sheep-context";
import {useNavigation} from "@react-navigation/native";

function Home() {
    const {getSheeps} = useApi()
    const {sheeps} = useSheep()
    const navigation = useNavigation();

    useEffect(() => {
        getSheeps()
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView className="items-center">
                <Text className="text-xl font-bold">Welkom bij sheepfinder!</Text>
                {sheeps ?
                    <FlatList className="w-[90%]" data={sheeps.items} keyExtractor={(item) => item.id}
                              renderItem={({item}) =>
                                  <Pressable
                                      className="w-[100%] flex-row justify-between bg-blue-400 my-2 py-3 px-5 rounded-3xl"
                                      onPress={() => navigation.navigate("Map", item.coords)}><Text
                                      className="text-white">{item.title}</Text></Pressable>
                              }/> : <ActivityIndicator size="large"/>}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Home