import { useState, useEffect } from 'react';

import { useGetAllMangaStore } from '../../hooks/useMangaStore';
import filterByGenreStore from '../../util/filterByGenreStore';

import StoreItem from './store-item/StoreItem';
import Spinner from '../spinner/Spinner';
import React from 'react';
import './store.css';


export default function Store() {
    const [isFetching, setIsFetching] = useState(true);
    const mangaBooks = useGetAllMangaStore(setIsFetching);
    const [filterGenre, setFilterGenre] = useState('All');
    const [filteredBooks, setFilteredBooks] = useState([]);
    
    useEffect(() => {
        const result = filterByGenreStore(mangaBooks, filterGenre);
        
        setFilteredBooks(result);
        
    }, [filterGenre, mangaBooks]);
    
    const handleGenreFilterClick = (e) =>{
        setFilterGenre(e.target.innerText)
    }
    
    return (
        <div className="catalog-container">
        <div className="catalog-filters">
            <button onClick={handleGenreFilterClick}>All</button>
            <button onClick={handleGenreFilterClick}>Fantasy</button>
            <button onClick={handleGenreFilterClick}>Adventure</button>
            <button onClick={handleGenreFilterClick}>Sci-Fi</button>
            <button onClick={handleGenreFilterClick}>Romance</button>
        </div>

            {filteredBooks.length > 0 ? 
            <>
                <div className="catalog-items">
                    {(filteredBooks.map(manga => <StoreItem key={manga._id} manga={manga}/>  ))} 
                </div>
            </>
            : 
            isFetching ? 
            (<Spinner/>):
            <div className="catalog-item-no-manga">
                <h3>No manga with that genre!</h3>
            </div>
        }
        </div>
    );
}

