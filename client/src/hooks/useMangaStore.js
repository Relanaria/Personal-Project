import { useState, useEffect } from "react";

import mangaAPI from "../api/manga-api";
const directory = 'productList';
const directoryForHomePage = 'productList?sortBy=_createdOn%20desc&pageSize=3';
const directoryForBoughtProducts = 'boughtProducts';

export function useGetAllMangaStore(setIsFetching){
    const [mangaBooks, setMangaBooks] = useState([]);
    const controller = new AbortController();
    const signal = controller.signal;
    let result = [];

    useEffect(()=>{
       (async()=>{
        try {
            result = await mangaAPI.getAllManga(directory, signal);
            
        } catch (error) {
            console.log(error);
        }    
            setIsFetching(false);
            setMangaBooks(result);
            
        })();
        return () => {
            controller.abort("navigating out of getAllManga");
          };
    }, []);

    return mangaBooks;
};

export function useGetAllMangaStoreLatest(setIsFetching) {
    const [mangaBooks, setMangaBooks] = useState([]);
    const controller = new AbortController();
    const signal = controller.signal;
    let result = [];

    useEffect(()=>{
       (async()=>{
        try {
            result = await mangaAPI.getAllManga(directoryForHomePage, signal);
        } catch (error) {
            console.log(error);
        }
            const checkBooksMarkedAsSold = result.filter(manga => manga.statusSold != 'true');
            setMangaBooks(checkBooksMarkedAsSold);
            setIsFetching(false);
        })();
        return () => {
            controller.abort("navigating out of getAllMangaLatest");
          };
    }, []);


    return [mangaBooks, setMangaBooks];
}


export function useGetOneMangaStore(mangaId, setIsPending, setMangaDetails) {
    const [manga, setManga] = useState({});
    const controller = new AbortController();
    const signal = controller.signal;
    let result = [];
  
    useEffect(()=>{
        (async ()=>{
            try {
                
                result = await mangaAPI.getMangaById(directory, mangaId, signal);
            } catch (error) {
                console.log(error);
            }
            setIsPending(false)
            setMangaDetails != undefined ? setMangaDetails(result) : ''; 
            setManga(result);
        })();
        return () => {
            controller.abort("navigating out of getOneManga");
          };
    },[])

    return [manga, setManga];
}

export function useEditManga(){
    const editManga = async (mangaId, data, accessToken) =>{
       const result = await mangaAPI.editManga(directory, mangaId, data, accessToken);

       if(result.code == 401){
        throw new Error("Unauthorized");
       };
       
       if(result.code == 403){
        throw new Error('Edit action not authorized!');
        }
    }

    return editManga;
}


export function useDeleteManga(){

  const deleteManga = async (mangaId, accessToken) => {
    const result = await mangaAPI.deleteManga(directory, mangaId, accessToken);
    if(result.code == 401){
        throw new Error("Unauthorized");
    };
    if(result.code == 403){
        throw new Error('Edit action not authorized!');
    }
  };

  return deleteManga;
}


export function useBuyManga() {
 
    const buyManga = async (mangaData ,accessToken, adminAccess = true) => {

        const promises = mangaData.map(manga =>{
            manga.statusSold = 'true';
            const createBoughtMangaPromise = mangaAPI.createBoughtManga(directoryForBoughtProducts, { mangaId: manga._id }, accessToken);
            const updateMangaStatusPromise = mangaAPI.buyManga(directory, manga._id, manga, accessToken, adminAccess);
            return Promise.all([createBoughtMangaPromise, updateMangaStatusPromise]);
        })

        const results = await Promise.all(promises);
        return results;
    }

    return buyManga;
}

export function useGetBougthProducts(ownerId, setboutghtProducts){
    const encodedOwnerId = encodeURIComponent(`"${ownerId}"`);

    useEffect(()=>{
        (async ()=>{

            const result = await mangaAPI.getBoughtManga(encodedOwnerId);
            setboutghtProducts(result);
        })();
    }, [])
}