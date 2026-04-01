import {View, Text} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {useSheep} from "../context/sheep-context";
import {useLocation} from "../context/location-context";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";

function Map({route}) {
    const {sheeps} = useSheep()
    const {userLocation, startLocationUpdates} = useLocation()
    const [startLocation, setStartLocation] = useState(null)

    useFocusEffect(
        useCallback(() => {
            startLocationUpdates()
            if (route.params) {
                setStartLocation(route.params)
            } else {
                setStartLocation(userLocation.coords)
            }
        }, [])
    );

    return (
        <View style={{flex: 1}}>
            <MapView style={{flex: 1}}
                     region={{
                         latitude: startLocation?.latitude ?? 51.80662957952351,
                         longitude: startLocation?.longitude ?? 4.66896958362819,
                         latitudeDelta: 0.0010,
                         longitudeDelta: 0.0010,
                     }} showsUserLocation={true}>
                {sheeps.items !== [] ? sheeps.items.map((sheep) => <Marker
                    coordinate={sheep.coords} key={sheep.id} pinColor={sheep.color}/>) : null}
            </MapView>
        </View>
    )
}

export default Map