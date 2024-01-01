import { createContext,useContext,useState } from "react";

const TokenContext = createContext()

const TokenProvider = ({children})=>{
    const [accessToken,setAccessToken] = useState(null)
    const [refreshToken,setRefreshToken] = useState(null)

    const setAccTk = (val)=>{
        setAccessToken(val)
    }
    const setRefTk = (val)=>{
        setRefreshToken(val);
    }

    return (
        <TokenContext.Provider value = {{refreshToken,accessToken,setAccTk,setRefTk}}>
            {children}
        </TokenContext.Provider>
    )
}

const useToken = ()=>{
    const context = useContext(TokenContext)
    if(context){
        return context
    }
}

export {TokenProvider,useToken}