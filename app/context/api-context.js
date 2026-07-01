import {createContext, useContext, useEffect} from "react"
import {useSheep} from "./sheep-context";
import * as LocalAuthentication from "expo-local-authentication";

const ApiContext = createContext()

export function ApiProvider({children}) {
    const {setSheeps} = useSheep()

    const getSheeps = async () => {
        try {
            const result = await fetch("https://raw.githubusercontent.com/Chrisieee/sheepfinder-data/refs/heads/main/data.json")
            const data = await result.json()
            setSheeps(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    const checkBiometrics = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();

        console.log("Hardware:", compatible);
        console.log("Vingerafdruk/FaceID ingesteld:", enrolled);
    };

    useEffect(() => {
        checkBiometrics()
    }, []);

    return (
        <ApiContext.Provider value={{getSheeps}}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    return useContext(ApiContext)
}