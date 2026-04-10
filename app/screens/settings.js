import {View, Text, Switch} from "react-native";
import {useSettings} from "../context/settings-context";
import {useState} from "react";

function Settings() {
    const {settings, changeSettings} = useSettings()
    const [darkmode, setDarkMode] = useState(settings.darkmode)

    return (
        <View>
            <Text>Settings</Text>
            <Switch
                value={settings.darkmode}
                onValueChange={() => {
                    changeSettings(!darkmode)
                    setDarkMode(!darkmode)
                }}
                trackColor={{false: '#575757', true: '#d8d8d8'}}
                thumbColor={settings.darkmode ? '#ececec' : '#a5a5a5'}
            />
        </View>
    )
}

export default Settings