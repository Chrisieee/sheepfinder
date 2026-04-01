import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";

import Title from "./title";
import Home from "../screens/home";
import Map from "../screens/map";
import Settings from "../screens/settings";
import {Entypo, Feather} from "@expo/vector-icons";

function Tabs() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator id="1">
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: () => <Title title={"Home"}/>,
                    headerTitleAlign: 'center',
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => <AntDesign name="home" size={25} color={focused ? "blue" : "black"}/>
                }}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    headerTitle: () => <Title title={"Map"}/>,
                    headerTitleAlign: 'center',
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => <Entypo name="map" size={24} color={focused ? "blue" : "black"}/>
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerTitle: () => <Title title={"Settings"}/>,
                    headerTitleAlign: 'center',
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => <Feather name="settings" size={24} color={focused ? "blue" : "black"}/>
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs