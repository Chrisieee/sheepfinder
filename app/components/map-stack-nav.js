import AntDesign from "@expo/vector-icons/AntDesign";
import Map from "../screens/map";
import {createStackNavigator} from "@react-navigation/stack";
import Title from "./title";
import Details from "../screens/details";

function MapStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator id="1">
            <Stack.Screen
                name="Map"
                component={Map}
                options={{
                    headerTitle: () => <Title title={"Map"}/>,
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Details"
                component={Details}
                options={{
                    headerTitle: () => <Title title={"Details"}/>,
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    )
}

export default MapStack