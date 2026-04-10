import {createContext, useContext, useEffect, useState} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsContext = createContext()

export function SettingsProvider({children}) {
    const [settings, setSettings] = useState({
        darkmode: false
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

    const changeSettings = (value) => {
        setSettings({
            ...settings,
            darkmode: value
        })
    }

    useEffect(() => {
        getSettings();
    }, []);

    useEffect(() => {
        setSettingsToStorage()
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