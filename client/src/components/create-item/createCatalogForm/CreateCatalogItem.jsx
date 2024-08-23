// src/listProduct/ListProduct.jsx
import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useNavigate } from "react-router-dom";

import { useCreateCatalogManga } from "../../../hooks/useCreateCatalogManga";
import { useAuthContext } from "../../../contexts/AuthContext";
import valitadeInputs from '../../../util/validateFormInputs';

import "./createItem.css"

export default function CreateCatalogItem() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const initialValues = {
        title: "",
        author: "",
        description: "",
        genre: "",
        imgUrl: "",
        volume: "",
        state: "",
    }
    const AuthUserData = useAuthContext();
    const create = useCreateCatalogManga();

    const {values, changeHandler, submitHandler} = useForm(initialValues, async (mangaData) => {
        let formErrors = valitadeInputs.validateCatalogEditInputs(mangaData);
        try {
            
            if (Object.keys(formErrors).length > 0) {
                setErrors(formErrors);
                return;
            }
            
            const createdManga = await create(mangaData, AuthUserData.accessToken);

            navigate(`/catalog/${createdManga._id}/details`)
        } catch (error) {
            if(error.message == 'Create action not authorized!'){
                AuthUserData.logout();
            };
            
            formErrors.notAuthorized = error.message;
            setErrors(formErrors);
            return;
        }
    })

    return (
        <div className="create-item-container">
        <h1>Create New Catalog Item</h1>
        <form onSubmit={submitHandler}>
            <label htmlFor="title">Title:</label>
            <input 
            placeholder="title" 
            type="input" 
            id="title" 
            name="title"
            value={values.title}
            onChange={changeHandler}
            />
            {errors.title && <p className="error">{errors.title}</p>}

            <label htmlFor="author">Author:</label>
            <input 
            placeholder="author" 
            type="text" 
            id="author" 
            name="author"
            value={values.author}
            onChange={changeHandler}
            />
            {errors.author && <p className="error">{errors.author}</p>}

            <label htmlFor="description">Description:</label>
            <textarea 
            placeholder='description' 
            id="description" 
            name="description"
            value={values.description}
            onChange={changeHandler}
            ></textarea>
            {errors.description && <p className="error">{errors.description}</p>}

            <label htmlFor="genre">Genres:</label>
            <select id="genre" name="genre" onChange={changeHandler} multiple>
                <option value="Fantasy">Fantasy</option>
                <option value="Adventure">Adventure</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Romance">Romance</option>
            </select>
            {errors.genre && <p className="error">{errors.genre}</p>}

            <label htmlFor="imgUrl">ImageURL:</label>
            <input 
            placeholder="imgUrl" 
            type="text" 
            id="imgUrl" 
            name="imgUrl"
            value={values.imgUrl}
            onChange={changeHandler}
            />
            {errors.imgUrl && <p className="error">{errors.imgUrl}</p>}

            <label htmlFor="volume">Volume:</label>
            <input 
            placeholder="volume" 
            type="number" 
            id="volume" 
            name="volume"
            value={values.volume}
            onChange={changeHandler}
            />
            {errors.volume && <p className="error">{errors.volume}</p>}

            <label htmlFor="state">State:</label>
            <input 
            placeholder="state" 
            type="text" 
            id="state" 
            name="state"
            value={values.state}
            onChange={changeHandler}
            />
            {errors.state && <p className="error">{errors.state}</p>}
            {errors.notAuthorized && <p className="error">{errors.notAuthorized}</p>}
            <button type="submit">Submit</button>
        </form>
    </div>
    );
}
