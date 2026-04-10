import "./i18n"
import "./global.css"
import {NavigationContainer} from "@react-navigation/native";
import Tabs from "./app/components/tab-nav";
import {ApiProvider} from "./app/context/api-context";
import {SheepProvider} from "./app/context/sheep-context";
import {LocationProvider} from "./app/context/location-context";
import {SettingsProvider} from "./app/context/settings-context";

export default function App() {
    return (
        <SettingsProvider>
            <LocationProvider>
                <SheepProvider>
                    <ApiProvider>
                        <NavigationContainer>
                            <Tabs/>
                        </NavigationContainer>
                    </ApiProvider>
                </SheepProvider>
            </LocationProvider>
        </SettingsProvider>
    );
}
