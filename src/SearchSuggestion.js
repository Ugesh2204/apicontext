import { useGlobalContext } from './context'
import React, {useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faXmark} from '@fortawesome/free-solid-svg-icons'
import './searchSuggestion.css';

const SearchSuggestion = ({placeholder}) => {
    const { product } = useGlobalContext();
    console.log('product', product)

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = product.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      });
      //clear input to empty array
      if(searchWord === "") {
        setFilteredData([])
      } else {
        setFilteredData(newFilter);
      }
    }

    const clearInput = () => {
      setFilteredData([]);
      setWordEntered("");
    }

  return (
    <section className='search-section-s'>
        <div className='search'>
            <div className='searchInputs'>
                <input type="text" 
                placeholder={placeholder} 
                value={wordEntered}
                onChange={handleFilter}/>
                <div className="searchIcon"> 
                {filteredData.length === 0 ? <FontAwesomeIcon icon={faSearch}/> : <FontAwesomeIcon icon={faXmark} id='clearBtn' onClick={clearInput}/> }
                
                </div>
            </div>
        {/* //we want to show this when filteredData.lenght = 0 */}

        { filteredData.length !== 0 && 
          (
            <div className='dataResult'>
              {/* // slice to show 15 best matches */}
              {filteredData.slice(0, 5).map((value,key) => {
                return (
                  <a className="dataItem" href='#' traget='_blank' key={value.id}>
                  <p>{value.title}</p>
                </a>
                )
              })}
            </div>
          )
        }
      
     </div>
  </section>
  )
}

export default SearchSuggestion