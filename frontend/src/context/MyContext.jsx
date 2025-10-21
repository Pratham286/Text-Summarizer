import React from 'react'
import { useContext } from 'react';
// import { use } from 'react';
import { useState } from 'react';
import { createContext } from 'react'

const MyContext = createContext();

export const MyProvider = ({children}) => {
    const url = "http://localhost:3000";

    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <MyContext.Provider value = {{isLogin, setIsLogin, user, setUser, url}}>
            {children}
        </MyContext.Provider>
    );
};
export const useMyContext = () => {
    return useContext(MyContext);
}
