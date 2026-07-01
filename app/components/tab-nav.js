import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";

import Title from "./title";
import Home from "../screens/home";
import Settings from "../screens/settings";
import {Entypo, Feather} from "@expo/vector-icons";
import MapStack from "./map-stack-nav";
import {useTranslation} from "react-i18next";
import {useSettings} from "../context/settings-context";

function Tabs() {
    const Tab = createBottomTabNavigator();
    const {t} = useTranslation()
    const {settings} = useSettings()

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: settings.darkmode ? "#28282c" : "#ffffff",
            },
            tabBarActiveTintColor: settings.darkmode ? "#ffffff" : "#2563eb",
            tabBarInactiveTintColor: settings.darkmode ? "#a1a1aa" : "#6b7280",
            headerStyle: {
                backgroundColor: settings.darkmode ? "#28282c" : "#ffffff",
            },
            headerTintColor: settings.darkmode ? "#ffffff" : "#232323",
        }} id="1">
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: () => <Title title={t("home.title")}/>,
                    headerTitleAlign: 'center',
                    tabBarShowLabel: false,
                    tabBarIcon: ({color}) => <AntDesign name="home" size={25} color={color}/>,
                    headerShown: true
                }}
            />
            <Tab.Screen
                name="MapStack"
                component={MapStack}
                options={{
                    headerTitle: () => <Title title={t("map.title")}/>,
                    headerTitleAlign: 'center',
                    tabBarShowLabel: false,
                    tabBarIcon: ({color}) => <Entypo name="map" size={24} color={color}/>
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerTitle: () => <Title title={t("settings.title")}/>,
                    headerTitleAlign: 'center',
                    tabBarShowLabel: false,
                    tabBarIcon: ({color}) => <Feather name="settings" size={24} color={color}/>,
                    headerShown: true
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs