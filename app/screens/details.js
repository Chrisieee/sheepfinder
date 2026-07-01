import {Pressable, Text, TextInput, View, Image, KeyboardAvoidingView, ScrollView, Platform} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {useSheep} from "../context/sheep-context";
import {useTranslation} from "react-i18next";
import {Entypo, FontAwesome6, Fontisto, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {useSettings} from "../context/settings-context";
import {useAuth} from "../context/auth-context";
import * as ImagePicker from "expo-image-picker";

function Details({route}) {
    const {
        sheeps,
        findSheep,
        finds,
        notes,
        changeNotes,
        shareSheep,
        deleteNoteFromStorage,
        changePhotos,
        photos
    } = useSheep()
    const {settings} = useSettings()
    const {authenticate} = useAuth()
    const [sheep, setSheep] = useState(null)
    const [found, setFound] = useState(false)
    const {t} = useTranslation()
    const [note, setNote] = useState(null)
    const [editNote, setEditNote] = useState(null)
    const [formData, setFormData] = useState({note: ""})
    const [photo, setPhoto] = useState(null)

    const formHandler = ({name, value}) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const sendForm = () => {
        changeNotes(sheep.id, formData.note)
        if (note) {
            setFormData({note: note.note})
        }
        setEditNote(false)
    }

    const deleteNote = () => {
        deleteNoteFromStorage(sheep.id)
        setNote(null)
        setFormData({note: ""})
        setEditNote(false)
    }

    const checkAuth = async (kind) => {
        const check = await authenticate()
        if (check) {
            switch (kind) {
                case "edit":
                    setEditNote(!editNote)
                    break
                case "delete":
                    deleteNote()
                    break
            }
        }
    }

    async function takePhoto() {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            alert("Camera toestemming nodig.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            changePhotos(sheep.id, result.assets[0].uri);
        }
    }

    useEffect(() => {
        if (route.params.id) {
            setSheep(sheeps.items.find(s => s.id === Number(route.params.id)))
            setNote(notes.find(n => n.id === Number(route.params.id)))
        }
    }, [route.params]);

    useEffect(() => {
        setFound(finds.includes(Number(route.params.id)))
    }, [finds, route.params]);

    useEffect(() => {
        setNote(notes.find(n => n.id === Number(route.params.id)))
    }, [notes]);

    useEffect(() => {
        setPhoto(photos.find(f => f.id === Number(route.params.id)))
    }, [photos]);

    useEffect(() => {
        if (note) {
            setFormData({note: note.note})
        }
    }, [note]);

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 dark:bg-gray-600">
                <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}
                                      keyboardVerticalOffset={100}>
                    <ScrollView contentContainerStyle={{alignItems: "center", paddingTop: 5, gap: 4, flexGrow: 1,}}
                                keyboardShouldPersistTaps="handled">
                        {sheep ?
                            <>
                                <Text
                                    className="text-2xl font-bold w-full text-center dark:text-white">{sheep.title}</Text>
                                <Text
                                    className="dark:text-white w-full text-center">{t("details.kind")}: {sheep.kind}</Text>
                                <View
                                    className="border-black border-2 rounded-full bg-blue-200 dark:bg-blue-800 p-2 w-40 h-40 items-center justify-center">
                                    {found ? <MaterialCommunityIcons name="sheep" size={100} color={sheep.color}/>
                                        : <Fontisto name="question" size={80} color="black"/>}
                                </View>
                                <View className="flex-row items-center gap-2">
                                    {found ?
                                        <Pressable onPress={() => shareSheep(sheep.title, note)}><Entypo name="share"
                                                                                                         size={24}
                                                                                                         color={settings.darkmode ? "white" : "black"}/></Pressable> :
                                        <Pressable onPress={() => findSheep(sheep.id)}
                                                   className="bg-blue-400 dark:bg-blue-800 px-6 py-2 rounded-full flex items-center">
                                            <Text
                                                className="text-white">{found ? t("details.unfound") : t("details.found")}</Text>
                                        </Pressable>}
                                </View>

                                {/* foto stuff */}
                                {photo ? (
                                    <Image style={{width: "80%", height: 150, borderRadius: 10}}
                                           source={{uri: photo.uri}}/>
                                ) : (
                                    <Pressable
                                        className="bg-blue-400 dark:bg-blue-800 px-6 py-2 rounded-full flex items-center"
                                        onPress={takePhoto}><Text
                                        className="text-white">{t("details.photo")}</Text></Pressable>
                                )}

                                {/* note stuff */}
                                <View className="w-[90%] justify-center mt-4 border border-black p-2 rounded-xl">
                                    <Text className="dark:text-white font-semibold text-xl">{t("details.note")}:</Text>
                                    <View className="w-full flex-row justify-between">
                                        <Text
                                            className="dark:text-white">{note ? note.note : t("details.nonote")}</Text>
                                        <View className="flex-row gap-2">
                                            <Pressable onPress={() => checkAuth("edit")}>{note ?
                                                <Entypo name="pencil" size={24}
                                                        color={settings.darkmode ? "white" : "black"}/> :
                                                <FontAwesome6 name="add" size={20}
                                                              color={settings.darkmode ? "white" : "black"}/>}</Pressable>
                                            {note ? <Pressable onPress={() => checkAuth("delete")}>
                                                <MaterialIcons name="delete" size={24}
                                                               color={settings.darkmode ? "white" : "black"}/>
                                            </Pressable> : null}
                                        </View>
                                    </View>

                                    {editNote ?
                                        <View className="items-center">
                                            <TextInput className="w-full mt-2 border p-3 dark:text-white"
                                                       onChangeText={(text) => formHandler({name: "note", value: text})}
                                                       placeholder={t("details.placeholder")}
                                                       value={formData?.note} multiline={true}/>
                                            <Pressable onPress={() => sendForm()}
                                                       className="bg-blue-400 dark:bg-blue-800 px-6 py-2 mt-2 rounded-full">
                                                <Text className="text-white text-center">{t("details.button")}</Text>
                                            </Pressable>
                                        </View> : null}
                                </View>
                            </> : <Text className="dark:text-white">aan het laden</Text>
                        }
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Details