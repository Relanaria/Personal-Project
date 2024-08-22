import { useState, useEffect } from 'react';

import { useGetAllMangaCatalog } from '../../hooks/useMangaCatalog';
import filterByGenre from '../../util/filterByGenreCatalog';

import CatalotItem from './catalog-item/CatalogItem';
import Spinner from '../spinner/Spinner';
import React from 'react';
import './catalog.css';

function Catalog() {
    const [isFetching, setIsFetching] = useState(true);
    const mangaBooks = useGetAllMangaCatalog(setIsFetching);
    const [filterGenre, setFilterGenre] = useState('All');
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        const result = filterByGenre(mangaBooks, filterGenre);
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
                    {(filteredBooks.map(manga => manga.statusDelete == false ? <CatalotItem key={manga._id} manga={manga}/> : ''))} 
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

export default Catalog;
