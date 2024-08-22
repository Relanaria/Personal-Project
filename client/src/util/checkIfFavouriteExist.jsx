import { useState, useEffect } from "react";
import { useGetFavourites } from "../hooks/useFavourite";

export function useCheckFavourite(ownerId, mangaId, setNoFavouritesButton, setIsExistingId) {
  const [isExisting, setIsExisting] = useState(false);

  const [isFetching, setIsFetching] = useState(true);
  const [favourites, setFavourites] = useGetFavourites(ownerId, setIsFetching);
  let favouriteExistsId;

  useEffect(() => {
    if (favourites.length > 0) {
      const favouriteExists = favourites.some(favourite => favourite.mangaId === mangaId);
      favouriteExistsId = favourites.find(favourite => favourite.mangaId === mangaId);
      
      setIsExisting(favouriteExists);
      setIsExistingId(favouriteExistsId);
      setNoFavouritesButton(!!favouriteExists);
    }
  }, [favourites, mangaId]);
}
