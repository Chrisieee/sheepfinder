import {View} from "react-native";
import MapView from "react-native-maps";
import {useSheep} from "../context/sheep-context";
import {useLocation} from "../context/location-context";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import MapMarker from "../components/marker";

function Map({route}) {
    const {sheeps} = useSheep()
    const {userLocation, startLocationUpdates} = useLocation()
    const [startLocation, setStartLocation] = useState(null)

    useFocusEffect(
        useCallback(() => {
            startLocationUpdates()
        }, [])
    );

    useEffect(() => {
        if (route.params?.location) {
            setStartLocation(route.params?.location)
        } else if (userLocation) {
            setStartLocation(userLocation.coords)
        }
    }, [route.params?.location, userLocation]);

    return (
        <View style={{flex: 1}}>
            <MapView style={{flex: 1}}
                     region={{
                         latitude: startLocation?.latitude ?? 51.80662957952351,
                         longitude: startLocation?.longitude ?? 4.66896958362819,
                         latitudeDelta: route?.params?.location ? 0.0010 : 0.040,
                         longitudeDelta: route?.params?.location ? 0.0010 : 0.040,
                     }} showsUserLocation={true}>
                {sheeps.items !== [] ? sheeps.items.map((sheep) => <MapMarker sheep={sheep} key={sheep.id}/>) : null}
            </MapView>
        </View>
    )
}

export default Map