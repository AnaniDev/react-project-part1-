import {createContext , useState} from "react"

const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [userName , setUserName] = useState('anani');

    return <UserContext.Provider value={userName}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider;