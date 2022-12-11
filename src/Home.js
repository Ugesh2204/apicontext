import React from 'react'
import Search from './Search'
 import Movies from './Movies'
 import SearchSuggestion from './SearchSuggestion'

const Home = () => {
  return (
  <>
    {/* <Search/> */}
    <SearchSuggestion placeholder='Enter a Movie name'/>
    {/* <Movies/> */}
  </>
  )
}

export default Home



//https://www.omdbapi.com/
//Here is your key: 82dd2684
//http://img.omdbapi.com/?apikey=82dd2684&s=titanic