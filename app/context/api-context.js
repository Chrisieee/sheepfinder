import {createContext, useContext} from "react"
import {useSheep} from "./sheep-context";

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

    return (
        <ApiContext.Provider value={{getSheeps}}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    return useContext(ApiContext)
}