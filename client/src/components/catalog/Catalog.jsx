import { useState, useEffect } from 'react';

import { useGetAllMangaCatalog } from '../../hooks/useMangaCatalog';
import { useGetMangaPage } from '../../hooks/useMangaCatalog';
import filterByGenre from '../../util/filterByGenreCatalog';

import CatalotItem from './catalog-item/CatalogItem';
import Spinner from '../spinner/Spinner';
import React from 'react';
import './catalog.css';

function Catalog() {
    const [isFetching, setIsFetching] = useState(true);
    const [mangaBooks, setMangaBooks] = useGetAllMangaCatalog(setIsFetching);
    const [pageMangaBooks, setPageMangaBooks] = useState([]);
    const [filterGenre, setFilterGenre] = useState('All');
    const [filteredBooks, setFilteredBooks] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageOffSet, setPageOffSet] = useState(0);

    useGetMangaPage(pageOffSet, setMangaBooks);
    
    useEffect(() => {
        const result = filterByGenre(mangaBooks, filterGenre);
        setFilteredBooks(result);
    }, [filterGenre, mangaBooks]);
    
    const handleGenreFilterClick = (e) =>{
        setFilterGenre(e.target.innerText);
    }

    const handlePageClick = (e) =>{
        const numberOfPages = Math.ceil(mangaBooks.length / 2);
        const buttonType = e.target.innerText;

        if(buttonType == "<"){
            currentPage - 1 == 0 ? setCurrentPage(1) : setCurrentPage(currentPage - 1);
            pageOffSet - 3 < 0 ? setPageOffSet(0) : setPageOffSet(pageOffSet - 3);
            
        }else{
            if(!(currentPage + 1 > numberOfPages)){
                setCurrentPage(currentPage + 1);
                setPageOffSet(pageOffSet + 3);
            }
        }   
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
                <div className='page-buttons-container'>
                    <button className='page-buttons' onClick={handlePageClick}>{"<"}</button>
                    <h1 className='currentpage'>{currentPage}</h1>
                    <button className='page-buttons' onClick={handlePageClick}>{">"}</button>
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
