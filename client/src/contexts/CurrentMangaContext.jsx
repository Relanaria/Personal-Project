import React, { createContext, useState, useContext } from 'react';

const MangaContext = createContext();

export default function MangaContextProvider ({ children }) {
  const [mangaDetails, setMangaDetails] = useState(null);

  return (
    <MangaContext.Provider value={{ mangaDetails, setMangaDetails }}>
      {children}
    </MangaContext.Provider>
  );
};

export function useMangaContext (){
    const mangaData = useContext(MangaContext);

  return mangaData;
};
