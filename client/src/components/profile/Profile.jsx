import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { useGetFavourites } from '../../hooks/useFavourite';
import { useDeleteFavourite } from '../../hooks/useFavourite';
import { useGetBougthProducts } from '../../hooks/useMangaStore';

import Spinner from '../spinner/Spinner';
import './profilePage.css';

const ProfilePage = () => {
    const authUserContext = useAuthContext();
    const [isFetching, setIsFetching] = useState(true);
    const [favorites, setFavorites] = useGetFavourites(authUserContext.userId, setIsFetching);
    const [boutghtProducts, setboutghtProducts] = useState([]);

    const deleteHandleClick = useDeleteFavourite(setFavorites, authUserContext.logout);
    useGetBougthProducts(authUserContext.userId, setboutghtProducts);
    
    useEffect(() => {
        return () => {
            // Cleanup function
        };
    }, []);

    return (
        <div className="profile-page">
            <div className="profile-info">
                <h2>Profile Info</h2>
                <p><strong>Username:</strong> {authUserContext.username}</p>
                <p><strong>Email:</strong> {authUserContext.email}</p>
            </div>
            <div className="favorites-section">
                <h2>Favorites</h2>
                <div className="favorites-list">
                    {favorites.length > 0 ?  favorites.map(fav => (
                        fav.manga.statusDelete == false ?
                        <div key={fav.manga._id} className="favorite-item">
                            <img src={fav.manga.imgUrl} alt={fav.manga.title} className="favorite-img" />
                            <h3 className="favorite-title">{fav.manga.title}</h3>
                            <p className="favorite-author">{fav.manga.author}</p>
                            <div className="favorite-actions">
                                <Link to={`/catalog/${fav.manga._id}/details`} className="details-btn">Details</Link>
                                <button className="remove-btn" onClick={() => deleteHandleClick(fav._id, authUserContext.accessToken)}>Remove</button>
                            </div>
                        </div>
                        :
                        ""
                    )) : 
                    (isFetching && favorites.length <= 0) ? <Spinner/> : 'No manga added to favourites!'
                    }
                </div>
            </div>
            <div className="bought-products-section">
                <h2>Bought Books</h2>
                <div className="favorites-list">
                    {boutghtProducts.length > 0 ?  boutghtProducts.map(fav => (
                        fav.manga.statusSold == "true" ?
                        <div key={fav.manga._id} className="favorite-item">
                            <img src={fav.manga.imgUrl} alt={fav.manga.title} className="favorite-img" />
                            <h3 className="favorite-title">Tittle: {fav.manga.title}</h3>
                            <p className="favorite-author">Author: {fav.manga.author}</p>
                            <p className="favorite-author">Volume: {fav.manga.volume}</p>
                            <div className="favorite-actions">
                                <Link to={`/store/${fav.manga._id}/details`} className="details-btn">Details</Link>
                            </div>
                        </div>
                        :
                        ""
                    )) : 
                    (isFetching && boutghtProducts.length <= 0) ? <Spinner/> : 'No manga bougth yet!'
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
