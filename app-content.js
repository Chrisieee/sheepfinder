import {useEffect} from "react";
import {useColorScheme} from "nativewind";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import Tabs from "./app/components/tab-nav";
import {useSettings} from "./app/context/settings-context";

function AppContent() {
    const {settings} = useSettings();
    const {setColorScheme} = useColorScheme();

    useEffect(() => {
        setColorScheme(settings.darkmode ? "dark" : "light");
    }, [settings.darkmode]);

    return (
        <NavigationContainer theme={settings.darkmode ? DarkTheme : DefaultTheme}>
            <Tabs/>
        </NavigationContainer>
    );
}

export default AppContent