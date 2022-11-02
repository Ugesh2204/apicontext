// context(warehouse)
// we need a Provider
//We need a consumer = (useContext()) hooks
import React, { useContext, useEffect, useState } from 'react';

const API_URL = `http://www.omdbapi.com/?apikey=82dd2684&s=titanic`;

const AppContext = React.createContext();


//we need a provider function

const AppProvider = ({ children }) => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: "false", msg: "" });

    const getMovies =  async(url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True") {
                setIsLoading(false);
                setMovie(data.Search);
            } else {
                setIsError({
                    show: true,
                    msg: data.error
                })
            }
    
        } catch (error) {
            console.log(error);
        }
    }
    //will run once when page load
    useEffect(() => {
        getMovies(API_URL);
    }, []);
    

    return <AppContext.Provider value={{ isLoading, movie, isError }}>
        { children }
    </AppContext.Provider>
};

//global custom hookk make it simple
const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext }
