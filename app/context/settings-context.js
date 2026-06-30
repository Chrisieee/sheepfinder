import {createContext, useContext, useEffect, useState} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from "react-i18next";

const SettingsContext = createContext()

export function SettingsProvider({children}) {
    const {i18n} = useTranslation();
    const [settings, setSettings] = useState({
        darkmode: false,
        language: "dutch"
    })

    const getSettings = async () => {
        try {
            const value = await AsyncStorage.getItem('setting')
            const jsonValue = value != null ? await JSON.parse(value) : {darkmode: false}
            setSettings(jsonValue)
        } catch (e) {
            console.log(e.message)
        }
    }

    const setSettingsToStorage = async () => {
        try {
            const jsonValue = JSON.stringify(settings)
            await AsyncStorage.setItem('setting', jsonValue)
            console.log(settings)
        } catch (e) {
            console.log(e.message)
        }
    }

    const changeSettings = (key, value) => {
        setSettings({
            ...settings,
            [key]: value
        })
    }

    useEffect(() => {
        getSettings();
    }, []);

    useEffect(() => {
        setSettingsToStorage()
        i18n.changeLanguage(settings.language)
    }, [settings])

    return (
        <SettingsContext.Provider value={{settings, setSettings, changeSettings}}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext)
}