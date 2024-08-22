import { useState, useEffect } from "react";

import favouriteAPI from "../api/favourite-api";

export function useCreateFavourite() {
  const createFavourite = async (mangaId, accessToken) => {
    const newFavouriteManga = {
      mangaId: mangaId,
    };

    const result = await favouriteAPI.addMangaToFavourite(
      newFavouriteManga,
      accessToken
    );

    if (result.code == 401) {
      throw new Error("Unauthorized");
    }
    return result;
  };

  return createFavourite;
}

export function useGetFavourites(ownerId, setIsFetching) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let result = [];

    (async () => {
      const encodedOwnerId = encodeURIComponent(`"${ownerId}"`);
      try {
        result = await favouriteAPI.getAllFavourites(encodedOwnerId, signal);
      } catch (error) {}
      setIsFetching(false);
      setFavourites(result);
    })();

    return () => {
      controller.abort("Navigating out of Page scopre");
    };
  }, []);

  return [favourites, setFavourites];
}

export function useDeleteFavourite(setFavorites, logoutCallBack) {
  const deleteFavourite = async (favouriteId, accessToken) => {
    try {
      const result = await favouriteAPI.deleteFavourite(
        favouriteId,
        accessToken
      );

      if (result.code == 403) {
        logoutCallBack();
        throw new Error("AccessToken has expired!");
      }
    } catch (error) {
      console.log(error);
    }
    setFavorites((prevFavourites) =>
      prevFavourites?.filter((fav) => fav._id !== favouriteId)
    );
  };

  return deleteFavourite;
}


export function useDeleteFavouriteCatalog(logoutCallBack) {
  const deleteFavourite = async (favouriteId, accessToken) => {
    try {
      const result = await favouriteAPI.deleteFavourite(
        favouriteId,
        accessToken
      );

      if (result.code == 403) {
        logoutCallBack();
        throw new Error("AccessToken has expired!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return deleteFavourite;
}