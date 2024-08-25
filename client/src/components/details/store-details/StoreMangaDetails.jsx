import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useGetOneMangaStore } from '../../../hooks/useMangaStore';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useDeleteManga } from '../../../hooks/useMangaStore';
import { useBuyManga } from '../../../hooks/useMangaStore';
import { useMangaContext } from '../../../contexts/CurrentMangaContext';


import Spinner from '../../spinner/Spinner';

import './StoreMangaDetails.css';

export default function StoreMangaDetails(props){
    const [errors, setErrors] = useState({});
    const { mangaId } = useParams();
    const [isPending, setIsPending] = useState(true);
    const { mangaDetails, setMangaDetails } = useMangaContext();
    const [manga, setManga] = useGetOneMangaStore(mangaId, setIsPending, setMangaDetails);
    const authUserContext = useAuthContext();
    const navigate = useNavigate();
    const deleteManga = useDeleteManga();
    const buyManga = useBuyManga()

    
    async function deleteHandleCLick(){
        let deleteError = {};
        try {
            
            await deleteManga(mangaId, authUserContext.accessToken);
            navigate('/store');
        } catch (error) {

            if(error.message == "Edit action not authorized!"){
                authUserContext.logout();
            }
            
            deleteError.isNotAuthorized = error.message;
            setErrors(deleteError)
            return;
        }
    }

    async function buyMangaHandleCiick() {
        const userInfo = JSON.parse(localStorage.getItem('authState'));
        console.log(userInfo);
        
        let buyError = {};
        try {
            
            // await buyManga(mangaId, manga, authUserContext.accessToken);
            
            if(userInfo.products){
                userInfo.products.push(manga);
                authUserContext.products.push(manga);
                localStorage.setItem("authState", JSON.stringify(userInfo));
            }else{
                userInfo.products = [manga];
                authUserContext.products.push(manga);
                localStorage.setItem("authState", JSON.stringify(userInfo));
            }
            navigate('/store');
        } catch (error) {
            buyError.isNotAuthorized = error.message;
            setErrors(buyError)
            return;
        }
    }
    return (
        <>
        {isPending ?  <Spinner/> :
         <div className="details-container">
         <div className="manga-details">
             <div className="manga-image">
                 <img src={manga.imgUrl} alt={manga.title} />
             </div>
             <div className="manga-info">
                 <h2 className="manga-title">Title: {manga.title}</h2>
                 <h3 className="manga-author">Author: {manga.author}</h3>
                 <p className="manga-price">Genre: {manga.genre}</p>
                 <p className="manga-description">Description: {manga.description}</p>
                 <p className="manga-price">Volume: {manga.volume}</p>
                 <p className="manga-price">State: {manga.state}</p>
                 <p className="manga-price">Price: ${manga.price}</p>

                        {authUserContext.isAuthenticated ? 
                        <div className="actions">
                         {authUserContext.userId == manga._ownerId ? 
                            <> 
                                <Link
                                to={`/store/edit/${manga._id}`}
                                state={ {mangaDetails: manga} }
                                className="btn edit-btn">Edit</Link>
                                <button className="btn delete-btn" onClick={deleteHandleCLick}>Delete</button>
                            </>
                            :  
                            manga.statusSold == "false" && <button className="btn buy-btn" onClick={buyMangaHandleCiick}>Buy</button>
                            }
                        </div>: ''}
                    {errors.isNotAuthorized && <p className="error">{errors.isNotAuthorized}</p>}
             </div>
         </div>
     </div>
        }
        </>
    )
}