import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { API_URL } from "./context";

const SingleMovie = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState("");


  const getMovies =  async(url) => {
      try {
          const res = await fetch(url);
          const data = await res.json();
          console.log(data);
          if(data.Response === "True") {
              setIsLoading(false);
              setMovie(data);
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
          getMovies(`${API_URL}&i=${id}`);
      }, 800);

       return () => clearTimeout(timeOut);

      // getMovies(API_URL);
     
      //when query change run useeffect  [query]
  }, [id]);
  

  //loading
  if(isLoading){
    return (
      <div className='movie-section'>
        <div className='loading'>Loading...</div>
      </div>
    )
  }

  return (
    <section className="movie-section">
    <div className="movie-card">
      <figure>
        <img src={movie.Poster} alt="" />
      </figure>
      <div className="card-content">
        <p className="title">{movie.Title}</p>
        <p className=""></p>
        <p className="card-text">{movie.Released}</p>
        <p className="card-text">{movie.Genre}</p>
        <p className="card-text">{movie.imdbRating} / 10</p>
        <p className="card-text">{movie.Country}</p>
        <NavLink to="/" className="back-btn">
          Go Back
        </NavLink>
      </div>
    </div>
  </section>
  )
}

export default SingleMovie