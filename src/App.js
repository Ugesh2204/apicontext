import React from "react";
import './App.css';
import Home from './Home'
import SingleMovie from './SingleMovie'
import Error from './Error'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element = { <Home/> } />
        {/* Set dynamic id for movie */}
        <Route path="movie/:id" element = { <SingleMovie/> } />
        <Route path ="*" element= {<Error />} />
      </Routes>

    </>

  );
}

export default App;
