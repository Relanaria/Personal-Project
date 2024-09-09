import { useState, useEffect } from "react";

import mangaAPI from "../api/manga-api";
const directory = "catalogList";
const directoryForHomePage = "catalogList?sortBy=_createdOn%20desc&pageSize=3";

export function useGetAllMangaCatalog(setIsFetching) {
  const [mangaBooks, setMangaBooks] = useState([]);
  const controller = new AbortController();
  const signal = controller.signal;
  let result = [];

  useEffect(() => {
    (async () => {
      try {
        
        result = await mangaAPI.getAllManga(directory, signal);
      } catch (error) {
        console.log(error);
        
      }
      setIsFetching(false);
      setMangaBooks(result);
    })();
    return () => {
      controller.abort("Navigating out of Page");
    };
  }, []);

  return [mangaBooks, setMangaBooks];
}

export function useGetAllMangaCatalogLatest() {
  const [mangaBooks, setMangaBooks] = useState([]);
  const controller = new AbortController();
  const signal = controller.signal;
  let result = [];

  useEffect(() => {
    (async () => {
      try {
        result = await mangaAPI.getAllManga(directoryForHomePage, signal);
      } catch (error) {
        console.log(error);
      }
      setMangaBooks(result);
    })();
    return () => {
        controller.abort("Navifating out of page!");
      };
  }, []);

  return [mangaBooks, setMangaBooks];
}

export function useGetOneMangaCatalog(mangaId, setIsPending) {
  const [manga, setManga] = useState({});
  const controller = new AbortController();
  const signal = controller.signal;
  let result = [];


  useEffect(() => {  

    (async () => {
      try {
         result = await mangaAPI.getMangaById(directory, mangaId, signal);
      } catch (error) {
        console.log(error);
      }
      setIsPending(false);
      setManga(result);
    })();
    return () => {
        controller.abort("Navigating out of Page");
      };
  }, []);

  return [manga, setManga];
}

export function useEditMangaCatalog() {
  const editManga = async (mangaId, data, accessToken) => {
    const result = await mangaAPI.editManga(
      directory,
      mangaId,
      data,
      accessToken
    );

    if (result.code == 401) {
      throw new Error("Unauthorized");
    }

    if (result.code == 403) {
      throw new Error("Edit action not authorized!");
    }
  };

  return editManga;
}

export function useDeleteManga() {
  const deleteManga = async (mangaId, accessToken, manga) => {
    const deletedMangaData = { ...manga };
    deletedMangaData.statusDelete = true;
    
    const result = await mangaAPI.deleteManga(directory, mangaId, accessToken, deletedMangaData);

    if (result.code == 401) {
      throw new Error("Unauthorized");
    }
    if (result.code == 403) {
      throw new Error("Edit action not authorized!");
    }
  };

  return deleteManga;
}


export function useGetMangaPage(offSetPage, genre, setMangaBooks, setIsFetching){
  const directoryPageSize = `catalogList?offset=${offSetPage}&pageSize=3`;
  const directoryPageSizeAndGenre = `catalogList?offset=${offSetPage}&pageSize=3&where=genre%3D%22${genre}%22`;
  let result = {};

  useEffect(()=>{

    (async ()=>{
      try {  
        if(genre == "All"){
          result.books =  await  mangaAPI.getCatalogPageSize(directoryPageSize);
          const numberOfBooksInCollection = await mangaAPI.getCatalogPageSize(`catalogList?count`);
          result.bookCount = numberOfBooksInCollection <= 3 ? 2 : numberOfBooksInCollection;

        }else{
          result.books = await mangaAPI.getCatalogPageSize(directoryPageSizeAndGenre);
          const numberOfBooksInCollection = await mangaAPI.getCatalogPageSize(`catalogList?where=genre%3D%22${genre}%22&count`);

          result.bookCount = numberOfBooksInCollection <= 3 ? 2 : numberOfBooksInCollection;
        };
        setMangaBooks(result);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
      }
    })();
    
  },[offSetPage, genre])
  
}



