import "./i18n"
import "./global.css"
import {ApiProvider} from "./app/context/api-context";
import {SheepProvider} from "./app/context/sheep-context";
import {LocationProvider} from "./app/context/location-context";
import {SettingsProvider} from "./app/context/settings-context";
import AppContent from "./app-content";

export default function App() {
    return (
        <SettingsProvider>
            <LocationProvider>
                <SheepProvider>
                    <ApiProvider>
                        <AppContent/>
                    </ApiProvider>
                </SheepProvider>
            </LocationProvider>
        </SettingsProvider>
    );
}