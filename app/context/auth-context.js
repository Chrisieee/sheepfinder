import {createContext, useContext, useEffect} from "react"
import * as LocalAuthentication from "expo-local-authentication";

const AuthContext = createContext()

export function AuthProvider({children}) {
    const checkBiometrics = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();

        console.log("Hardware:", compatible);
        console.log("Vingerafdruk/FaceID ingesteld:", enrolled);
    };

    const authenticate = async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Log in",
            cancelLabel: "Annuleren",
        });

        if (result.success) {
            return true
        } else {
            console.log(result);
        }
    };

    useEffect(() => {
        checkBiometrics()
    }, []);

    return (
        <AuthContext.Provider value={{authenticate}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext)
}