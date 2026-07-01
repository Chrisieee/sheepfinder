import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Share} from "react-native";
import {useTranslation} from "react-i18next";

const SheepContext = createContext()

export function SheepProvider({children}) {
    const [sheeps, setSheeps] = useState(null)
    const [finds, setFinds] = useState([])
    const [notes, setNotes] = useState([])
    const [photos, setPhotos] = useState([])
    const {t} = useTranslation()

    // useEffect(() => {
    //     console.log(sheeps)
    // }, [sheeps]);

    const getFinds = async () => {
        try {
            const value = await AsyncStorage.getItem('finds')
            const jsonValue = value != null ? await JSON.parse(value) : []
            setFinds(jsonValue)
        } catch (e) {
            console.log(e.message)
        }
    }

    const saveFinds = async () => {
        console.log(finds)
        try {
            const jsonValue = JSON.stringify(finds)
            await AsyncStorage.setItem('finds', jsonValue)

        } catch (e) {
            console.log(e.message)
        }
    }

    const findSheep = async (id) => {
        if (finds.includes(id)) {
            setFinds(finds.filter(f => f !== id))
        } else {
            setFinds([...finds, id])
        }
    }

    const getNotes = async () => {
        try {
            const value = await AsyncStorage.getItem('notes')
            const jsonValue = value != null ? await JSON.parse(value) : []
            setNotes(jsonValue)
        } catch (e) {
            console.log(e.message)
        }
    }

    const saveNotes = async () => {
        try {
            const jsonValue = JSON.stringify(notes)
            await AsyncStorage.setItem('notes', jsonValue)
        } catch (e) {
            console.log(e.message)
        }
    }

    const changeNotes = async (id, note) => {
        setNotes([...notes, {id: id, note: note}])
    }

    const deleteNoteFromStorage = (id) => {
        setNotes(notes.filter(n => n.id !== id))
    }

    const getPhotos = async () => {
        try {
            const value = await AsyncStorage.getItem('photos')
            const jsonValue = value != null ? await JSON.parse(value) : []
            setPhotos(jsonValue)
        } catch (e) {
            console.log(e.message)
        }
    }

    const savePhotos = async () => {
        try {
            const jsonValue = JSON.stringify(photos)
            await AsyncStorage.setItem('photos', jsonValue)
        } catch (e) {
            console.log(e.message)
        }
    }

    const changePhotos = async (id, uri) => {
        setPhotos([...photos, {id: id, uri: uri}])
    }

    const shareSheep = async (sheep, note) => {
        const n = note.note ? `${t("details.note")}: ${note.note}` : null
        try {
            await Share.share({
                title: "Sheep Finder",
                message: `${t("share.text1")} ${sheep} ${t("share.text2")} ${n}`,
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getFinds()
        getNotes()
        getPhotos()
    }, [])

    useEffect(() => {
        saveFinds()
    }, [finds])

    useEffect(() => {
        saveNotes()
    }, [notes])

    useEffect(() => {
        savePhotos()
    }, [photos])

    return (
        <SheepContext.Provider
            value={{
                sheeps, setSheeps,
                finds, findSheep,
                notes, changeNotes, deleteNoteFromStorage,
                photos, changePhotos,
                shareSheep
            }}>
            {children}
        </SheepContext.Provider>
    );
}

export function useSheep() {
    return useContext(SheepContext)
}