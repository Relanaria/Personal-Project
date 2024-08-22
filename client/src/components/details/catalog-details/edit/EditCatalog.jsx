import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMangaContext } from "../../../../contexts/CurrentMangaContext";
import mangaAPI from "../../../../api/manga-api"; // Assume this is your API module for fetching manga details and updating them

import { useAuthContext } from "../../../../contexts/AuthContext";
import valitadeInputs from "../../../../util/validateFormInputs";
import { useForm } from "../../../../hooks/useForm";

import { useGetOneMangaCatalog } from "../../../../hooks/useMangaCatalog";
import { useEditMangaCatalog } from "../../../../hooks/useMangaCatalog";

import "./editCatalog.css";

const initialValues = {
  title: "",
  author: "",
  description: "",
  genre: "",
  imgUrl: "",
  volume: "",
  price: "",
  state: "",
};

export default function EditCatalog(props) {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { mangaId } = useParams();

  const [isPending, setIsPending] = useState(true);
  const [manga, setManga] = useGetOneMangaCatalog(mangaId, setIsPending)

  const authUserContext = useAuthContext();
  const editMangaCatalog = useEditMangaCatalog()

  const { values, changeHandler, submitHandler } = useForm(
    Object.assign(initialValues, manga),
    async (mangaData) => {
      let formErrors = valitadeInputs.validateCatalogEditInputs(mangaData);

      try {
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }
        
        await editMangaCatalog(mangaId, mangaData, authUserContext.accessToken);

        navigate(`/catalog/${mangaId}/details`);
      } catch (error) {
        if(error.message == "Edit action not authorized!"){
          authUserContext.logout();
        }
        
        formErrors.notAuthorized = error.message;
        setErrors(formErrors);
        return;
      }
    }
  );

  return (
    <div className="edit-manga-page">
      <h1>Edit Manga</h1>
      <form onSubmit={submitHandler} className="edit-manga-form">
        <div className="edit-form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={changeHandler}
            required
          />
            {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="edit-form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={values.author}
            onChange={changeHandler}
          />
          {errors.author && <p className="error">{errors.author}</p>}
        </div>
        <div className="edit-form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={changeHandler}
            required
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div className="edit-form-group">
          <label htmlFor="genre">Genres:</label>
          <select
            id="genre"
            name="genre"
            onChange={changeHandler}
            multiple
          >
            <option value="Fantasy">Fantasy</option>
            <option value="Adventure">Adventure</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Romance">Romance</option>
          </select>
          {errors.genre && <p className="error">{errors.genre}</p>}
        </div>
        <div className="edit-form-group">
          <label htmlFor="volume">Volume:</label>
          <input
            type="number"
            id="volume"
            name="volume"
            value={values.volume}
            onChange={changeHandler}
            required
          />
          {errors.volume && <p className="error">{errors.volume}</p>}
        </div>
        <div className="edit-form-group">
          <label htmlFor="imgUrl">Image URL:</label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={values.imgUrl}
            onChange={changeHandler}
            required
          />
          {errors.imgUrl && <p className="error">{errors.imgUrl}</p>}
        </div>
        <button type="submit">Update Manga</button>
      </form>
    </div>
  );
}
