import "./global.css"
import {NavigationContainer} from "@react-navigation/native";
import Tabs from "./app/components/tab-nav";
import {ApiProvider} from "./app/context/api-context";
import {SheepProvider} from "./app/context/sheep-context";
import {LocationProvider} from "./app/context/location-context";

export default function App() {
    return (
        <LocationProvider>
            <SheepProvider>
                <ApiProvider>
                    <NavigationContainer>
                        <Tabs/>
                    </NavigationContainer>
                </ApiProvider>
            </SheepProvider>
        </LocationProvider>
    );
}
