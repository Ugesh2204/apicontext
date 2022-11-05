// context(warehouse)
// we need a Provider
//We need a consumer = (useContext()) hooks
import React, { useContext, useEffect, useState } from 'react';

//const API_URL = `http://www.omdbapi.com/?apikey=82dd2684&s=titanic`;
export const API_URL = `http://www.omdbapi.com/?apikey=82dd2684`;
//const api = process.env.REACT_APP_API_KEY;
//console.log(api)

const AppContext = React.createContext();


//we need a provider function

const AppProvider = ({ children }) => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: "false", msg: "" });
    const [query, setQuery] = useState("titanic");

    const getMovies =  async(url) => {
        setIsLoading(true);
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
                    msg: data.Error
                })
            }
    
        } catch (error) {
            console.log(error);
        }
    }
    //will run once when page load
    useEffect(() => {
        //Debouncing to set a timeout to prevent api call for each key we type
        //clear previous query and take only the last one
        //to prevent hit to the server for each letter we type
         let timeOut = setTimeout(()=> {
            getMovies(`${API_URL}&s=${query}`);
        }, 800);

         return () => clearTimeout(timeOut);

        // getMovies(API_URL);
       
        //when query change run useeffect  [query]
    }, [query]);
    

    return <AppContext.Provider value={{ isLoading, movie, isError, query, setQuery }}>
        { children }
    </AppContext.Provider>
};

//global custom hookk make it simple
const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext }
