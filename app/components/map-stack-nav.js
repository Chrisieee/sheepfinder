import AntDesign from "@expo/vector-icons/AntDesign";
import Map from "../screens/map";
import {createStackNavigator} from "@react-navigation/stack";
import Title from "./title";
import Details from "../screens/details";
import {useTranslation} from "react-i18next";

function MapStack() {
    const Stack = createStackNavigator();
    const {t} = useTranslation()

    return (
        <Stack.Navigator id="1">
            <Stack.Screen
                name="Map"
                component={Map}
                options={{
                    headerTitle: () => <Title title={t("map.title")}/>,
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Details"
                component={Details}
                options={{
                    headerTitle: () => <Title title={t("details.title")}/>,
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    )
}

export default MapStack