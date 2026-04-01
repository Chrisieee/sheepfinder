import * as Location from 'expo-location';
import {createContext, useContext, useState} from "react"

const LocationContext = createContext()

export function LocationProvider({children}) {
    const [userLocation, setUserLocation] = useState(null)

    const startLocationUpdates = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.log('Geen toestemming voor locatie')
            return
        }

        await Location.watchPositionAsync({distanceInterval: 5}, (location) => {
            setUserLocation(location)
        }, (error) => {
            console.log(error)
        })
    };

    return (
        <LocationContext.Provider value={{userLocation, startLocationUpdates}}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    return useContext(LocationContext)
}

