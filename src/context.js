// context(warehouse)
// we need a Provider
//We need a consumer = (useContext()) hooks
import React, { useContext, useEffect, useState } from 'react';

//const API_URLss = `http://www.omdbapi.com/?apikey=82dd2684&s=titanic`;
const API_URLs = `https://fakestoreapi.com/products`;

export const API_URL = `http://www.omdbapi.com/?apikey=82dd2684`;
//const api = process.env.REACT_APP_API_KEY;
//console.log(api)

const AppContext = React.createContext();


//we need a provider function

const AppProvider = ({ children }) => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie] = useState([]);

    const [product, setProductSuggestion] = useState([]);

    const [isError, setIsError] = useState({ show: "false", msg: "" });
    const [query, setQuery] = useState("Titanic");

    //console.log(query);
    console.log(product);

    const getMovies =  async(url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            //console.log(data);
            if(data.Response === "True") {
                setIsLoading(false);
                //data.search Search is a method
                //let text = "Mr. Blue has a blue house";
                //let position = text.search("Blue");
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

    const getProductSuggestion = async(url) => {
        try {
            const res = await fetch(url);
            const datas = await res.json();
            setProductSuggestion(datas)
            console.log(datas);
        } catch(error){
            console.log(error)
        }
    }

    //will run once when page load
    useEffect(() => {
        getProductSuggestion(API_URLs);

        //Debouncing to set a timeout to prevent api call for each key we type
        //clear previous query and take only the last one
        //to prevent hit to the server for each letter we type
         let timeOut = setTimeout(()=> {
            //Exexcute search
            getMovies(`${API_URL}&s=${query}`);
        }, 800);

         return () => clearTimeout(timeOut);

        // getMovies(API_URL);
       
        //when query change run useeffect  [query]
    }, [query]);
    

    return <AppContext.Provider value={{ isLoading, movie, isError, query, product, setQuery }}>
        { children }
    </AppContext.Provider>
};

//global custom hookk make it simple
const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext }
