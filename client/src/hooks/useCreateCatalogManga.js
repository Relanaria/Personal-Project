import { useState, useEffect } from "react";

import mangaAPI from "../api/manga-api";

const directory = 'catalogList';

export const useCreateCatalogManga = () =>{

    const createCatalogManga = async (mangaData, userToken) =>{
        const result = await mangaAPI.createManga(directory, mangaData, userToken);

        if(result.code == 401){
            throw new Error("Unauthorized");
        }
        
        if(result.code == 403){
            throw new Error('Create action not authorized!');
        }
        return result;
    }

    return createCatalogManga;
}