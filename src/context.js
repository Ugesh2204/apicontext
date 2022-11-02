// context(warehouse)
// we need a Provider
//We need a consumer = (useContext()) hooks
import React, { useContext } from 'react';

const AppContext = React.createContext();


//we need a provider function

const AppProvider = ({ children }) => {
    return <AppContext.Provider value="Ugesh">
        { children }
    </AppContext.Provider>
};

//global custom hookk make it simple
const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext }
