import {useTranslation} from "react-i18next";
import {useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {useSettings} from "../context/settings-context";
import {View} from "react-native";

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
            />
        </View>
    )
}

export default Dropdowncomp