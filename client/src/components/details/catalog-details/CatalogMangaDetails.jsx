import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useGetOneMangaCatalog } from '../../../hooks/useMangaCatalog';
import { useCreateFavourite } from '../../../hooks/useFavourite';
import { useDeleteFavouriteCatalog } from '../../../hooks/useFavourite';
import { useDeleteManga } from '../../../hooks/useMangaCatalog';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useCreateComment } from '../../../hooks/useComment';
import { useGetComments } from '../../../hooks/useComment';
import { useForm } from '../../../hooks/useForm';
import {useCheckFavourite} from '../../../util/checkIfFavouriteExist';
import valitadeInputs from '../../../util/validateFormInputs';

import Spinner from '../../spinner/Spinner';
import Comment from './comments/comment';

import './CatalogMangaDetails.css';

export default function CatalogMangaDetails(){
    const [errors, setErrors] = useState({});
    const [isPending, setIsPending] = useState(true);

    const { mangaId } = useParams();
    const [isExisting, setIsExisting] = useState(false);
    const [isExistingId, setIsExistingId] = useState({});

    const navigate = useNavigate();

    const [manga, setManga] = useGetOneMangaCatalog(mangaId, setIsPending);
    const [comments, setComments] = useGetComments(mangaId);
    
    const authUserContext = useAuthContext();
    useCheckFavourite(authUserContext.userId, mangaId, setIsExisting, setIsExistingId);
    
    const createComment = useCreateComment();
    const createFavourite = useCreateFavourite();
    const deleteFavourite = useDeleteFavouriteCatalog(authUserContext.logout);
    const deleteManga = useDeleteManga();

    const initialValues = {
        comment: '',
    };

    const {values, changeHandler, submitHandler, setValues} = useForm(initialValues, async (commentData) => {
        let comentInput = valitadeInputs.validateComment(commentData);

        try {
            
            if (Object.keys(comentInput).length > 0) {
                setErrors(comentInput);
                return;
            }

            const result = await createComment(commentData, mangaId, authUserContext.username, authUserContext.accessToken);
            
            setComments(oldComments => [...oldComments, result]);
            setValues(initialValues)
        } catch (error) {
            comentInput.comment = error.message;
            setErrors(comentInput);
            return;
        }
    });

   async function addToFavouritesHandleClick () {
        
    const result =  await createFavourite(mangaId, authUserContext.accessToken);

       navigate('/profile')
    }

    async function removeFromFavouritesHandleClick() {
        
        const result = await deleteFavourite(isExistingId._id, authUserContext.accessToken);

        setIsExisting(false);
    }

    async function deleteHandleCLick(){
        let deleteError = {};
        try {
            
            await deleteManga(mangaId, authUserContext.accessToken, manga);
            navigate('/catalog');
        } catch (error) {
            if(error.message == "Edit action not authorized!"){
                authUserContext.logout();
                navigate('/login');
                return;
            }
            
            deleteError.isNotAuthorized = error.message;
            setErrors(deleteError)
            return;
        }
    }


    return ( (
        <>
            {isPending ? <Spinner /> : (
                <div className="details-container">
                    <div className="manga-details">
                        <div className="manga-image">
                            <img src={manga.imgUrl} alt={manga.title} />
                        </div>
                        <div className="manga-info">
                            <h2 className="manga-title">Title: {manga.title}</h2>
                            <h3 className="manga-author">Author: {manga.author}</h3>
                            <p className="manga-author">Genre: {manga.genre}</p>
                            <p className="manga-description">Description: {manga.description}</p>
                            {authUserContext.isAuthenticated?
                                isExisting ? 
                                <button className="favorite-btn" onClick={removeFromFavouritesHandleClick}>{"\uD83C\uDF1F"}</button>
                                :
                                <button className="favorite-btn" onClick={addToFavouritesHandleClick}>{"\u2B50"}</button>
                            : 
                            ''
                            }
                            <Link to={`/catalog/read/${mangaId}`} className="edit-btn">Read Manga</Link>
                            {authUserContext.accountStatus != undefined ? 
                                <div className="owner-actions">
                                    <Link to={`/catalog/edit/${manga._id}`} className="edit-btn">Edit</Link>
                                    <button className="delete-btn" onClick={deleteHandleCLick}>Delete</button>
                                </div>
                                : 
                                ' '
                            }
                            {errors.isNotAuthorized && <p className="error">{errors.isNotAuthorized}</p>}
                        </div>
                    </div>
                    <div className="comments-section">
                        <h3 className="comments-title">Comments:</h3>
                        <div className="comments-list">
                            {comments.length > 0 ? 
                            comments.map( comment => <Comment key={comment._id} comment={comment}/>)
                            :
                            "No Comments yet!"
                            }
                               
                        </div>
                        {authUserContext.isAuthenticated ?
                        <form className="add-comment-section" onSubmit={submitHandler}>
                            <h3 className="add-comment-title">Add new comment:</h3>
                            <textarea
                                className="new-comment-input"
                                id="comment"
                                name="comment"
                                value={values.comment}
                                onChange={changeHandler}
                            ></textarea>
                             {errors.comment && <p className="error">{errors.comment}</p>}
                            <button type="submit" className="add-comment-btn">Add Comment</button>
                        </form> 
                        : 
                        ''
                        }
                        
                    </div>
                </div>
            )}
        </>
    )
    )
}