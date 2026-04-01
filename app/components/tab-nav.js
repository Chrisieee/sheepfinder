import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";

import Title from "./title";
import Home from "../screens/home";

function Tabs() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator id="1">
            <Tab.Screen
                name="Home"
                component={Home}
                options={({navigation}) => ({
                    headerTitle: () => (<Title title={"Home"}/>),
                    headerTitleAlign: 'center',
                    tabBarIcon: () => <AntDesign name="home" size={25}/>
                })}
            />
        </Tab.Navigator>
    )
}

export default Tabs