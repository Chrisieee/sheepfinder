import {useTranslation} from "react-i18next";
import {useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {useSettings} from "../context/settings-context";
import {View} from "react-native";
import {cssInterop, useColorScheme} from "nativewind";

function Dropdowncomp() {
    const {settings, changeSettings} = useSettings()
    const {t} = useTranslation()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(settings.language);
    const data = [
        {label: t("settings.language.dutch"), value: "nl"},
        {label: t("settings.language.english"), value: "en"},
        {label: t("settings.language.japanese"), value: "jp"}
    ]
    const {colorScheme} = useColorScheme();
    const dark = colorScheme === "dark";

    return (
        <View className="mx-6">
            <DropDownPicker
                open={open}
                value={value}
                items={data}
                setOpen={setOpen}
                setValue={setValue}
                onChangeValue={(newValue) => {
                    if (newValue !== settings.language) {
                        changeSettings("language", newValue);
                    }
                }}

                style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                    borderColor: dark ? "#4b5563" : "#d1d5db",
                }}
                dropDownContainerStyle={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                    borderColor: dark ? "#4b5563" : "#d1d5db",
                }}
                textStyle={{
                    color: dark ? "#ffffff" : "#111827",
                }}
                labelStyle={{
                    color: dark ? "#ffffff" : "#111827",
                }}
                arrowIconStyle={{
                    tintColor: dark ? "#ffffff" : "#111827",
                }}
                tickIconStyle={{
                    tintColor: dark ? "#ffffff" : "#111827",
                }}
            />
        </View>
    )
}

export default Dropdowncomp