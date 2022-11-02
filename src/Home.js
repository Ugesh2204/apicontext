import React, { useContext } from 'react'
//import { AppContext } from './context'
import { useGlobalContext } from './context'

const Home = () => {
  //const name = useContext(AppContext)
  const name= useGlobalContext();
  return (
    <div>
      <h1>My Home Page</h1>
      <p>{name}</p>
    </div>
  )
}

export default Home

//https://www.omdbapi.com/
//Here is your key: 82dd2684