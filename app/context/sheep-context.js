import {createContext, useContext, useState} from "react";

const SheepContext = createContext()

export function SheepProvider({children}) {
    const [sheeps, setSheeps] = useState(null)

    return (
        <SheepContext.Provider value={{sheeps, setSheeps}}>
            {children}
        </SheepContext.Provider>
    );
}

export function useSheep() {
    return useContext(SheepContext)
}