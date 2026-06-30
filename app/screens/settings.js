import {Text, Switch, SafeAreaView, View} from "react-native";
import {useSettings} from "../context/settings-context";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useTranslation} from "react-i18next";
import Dropdowncomp from "../components/dropdowncomp";

function Settings() {
    const {settings, changeSettings} = useSettings()
    const {t} = useTranslation()

    return (
        <SafeAreaProvider>
            <SafeAreaView className="items-center pt-5 flex-1">
                <View className="flex flex-row items-center w-full justify-center gap-5">
                    <Text className="text-2xl font-semibold">{t("settings.darkmode")}:</Text>
                    <Switch
                        value={settings.darkmode}
                        onValueChange={() => {
                            changeSettings("darkmode", !settings.darkmode)
                        }}
                        trackColor={{false: '#575757', true: '#d8d8d8'}}
                        thumbColor={settings.darkmode ? '#ececec' : '#a5a5a5'}
                    />
                </View>
                <View className="flex items-center w-full justify-center gap-5">
                    <Text className="text-2xl font-semibold">{t("settings.language.title")}:</Text>
                    <Dropdowncomp/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Settings