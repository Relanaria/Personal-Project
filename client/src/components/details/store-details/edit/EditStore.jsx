import React, { useState, useEffect } from "react";
import { useForm } from "../../../../hooks/useForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useEditManga } from "../../../../hooks/useMangaStore";
import { useAuthContext } from "../../../../contexts/AuthContext";
import valitadeInputs from "../../../../util/validateFormInputs";
import { useGetOneMangaStore } from "../../../../hooks/useMangaStore";

import "./editMangaPage.css";
import Spinner from "../../../spinner/Spinner";

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

export default function EditMangaPage() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { mangaId } = useParams();

  const [isPending, setPending] = useState(true);
  const [manga, setManga] = useGetOneMangaStore(mangaId, setPending);

  const authUserContext = useAuthContext();

  const editManga = useEditManga();

  const { values, changeHandler, submitHandler } = useForm(
    Object.assign(initialValues, manga),
    async (mangaData) => {
      let formErrors = valitadeInputs.validateCreateEditInputs(mangaData);

      try {
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }

        await editManga(mangaId, mangaData, authUserContext.accessToken);

        navigate(`/store/${mangaId}/details`);
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
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <div className="edit-manga-page">
          <h2 className="edit-title">Edit Manga</h2>
          <form onSubmit={submitHandler} className="edit-form">
            <div className="edit-form-group">
              <label htmlFor="title" className="edit-label">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={changeHandler}
                className="edit-input"
              />
              {errors.title && <p className="error">{errors.title}</p>}
            </div>
            <div className="edit-form-group">
              <label htmlFor="author" className="edit-label">
                Author:
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={values.author}
                onChange={changeHandler}
                className="edit-input"
              />
              {errors.author && <p className="error">{errors.author}</p>}
            </div>
            <div className="edit-form-group">
              <label htmlFor="description" className="edit-label">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={changeHandler}
                className="edit-textarea"
              ></textarea>
              {errors.description && (
                <p className="error">{errors.description}</p>
              )}
            </div>
            <div className="edit-form-group">
              <label htmlFor="genre">Genres:</label>
              <select id="genre" name="genre" onChange={changeHandler} multiple>
                <option value="Fantasy">Fantasy</option>
                <option value="Adventure">Adventure</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Romance">Romance</option>
              </select>
              {errors.genre && <p className="error">{errors.genre}</p>}
            </div>
            <div className="edit-form-group">
              <label htmlFor="imgUrl" className="edit-label">
                Image URL:
              </label>
              <input
                type="text"
                id="imgUrl"
                name="imgUrl"
                value={values.imgUrl}
                onChange={changeHandler}
                className="edit-input"
              />
              {errors.imgUrl && <p className="error">{errors.imgUrl}</p>}
            </div>
            <div className="edit-form-group">
              <label htmlFor="volume" className="edit-label">
                Volume:
              </label>
              <input
                type="number"
                id="volume"
                name="volume"
                value={values.volume}
                onChange={changeHandler}
                className="edit-input"
              />
              {errors.volume && <p className="error">{errors.volume}</p>}
            </div>
            <div className="edit-form-group">
              <label htmlFor="state" className="edit-label">
                State:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={values.state}
                onChange={changeHandler}
                className="edit-input"
              />
              {errors.state && <p className="error">{errors.state}</p>}
            </div>
            <div className="edit-form-group">
              <label htmlFor="price" className="edit-label">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={values.price}
                onChange={changeHandler}
                className="edit-input"
              />
              {errors.price && <p className="error">{errors.price}</p>}
            </div>
            {errors.notAuthorized && (
              <p className="error">{errors.notAuthorized}</p>
            )}
            <button type="submit" className="edit-submit-btn">
              Save Changes
            </button>
          </form>
        </div>
      )}
      {/* <div className="edit-manga-page">
            <h2 className="edit-title">Edit Manga</h2>
            <form onSubmit={submitHandler} className="edit-form">
                <div className="edit-form-group">
                    <label htmlFor="title" className="edit-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={changeHandler}
                        className="edit-input"
                    />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>
                <div className="edit-form-group">
                    <label htmlFor="author" className="edit-label">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={values.author}
                        onChange={changeHandler}
                        className="edit-input"
                    />
                    {errors.author && <p className="error">{errors.author}</p>}
                </div>
                <div className="edit-form-group">
                    <label htmlFor="description" className="edit-label">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={changeHandler}
                        className="edit-textarea"
                    ></textarea>
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>
                <div className="edit-form-group">
                    <label htmlFor="genre">Genres:</label>
                    <select id="genre" name="genre" onChange={changeHandler} multiple>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Romance">Romance</option>
                    </select>
                    {errors.genre && <p className="error">{errors.genre}</p>}
                </div>
                <div className="edit-form-group">
                    <label htmlFor="imgUrl" className="edit-label">Image URL:</label>
                    <input
                        type="text"
                        id="imgUrl"
                        name="imgUrl"
                        value={values.imgUrl}
                        onChange={changeHandler}
                        className="edit-input"
                    />
                    {errors.imgUrl && <p className="error">{errors.imgUrl}</p>}
                </div>
                <div className="edit-form-group">
                    <label htmlFor="volume" className="edit-label">Volume:</label>
                    <input
                        type="number"
                        id="volume"
                        name="volume"
                        value={values.volume}
                        onChange={changeHandler}
                        className="edit-input"
                    />
                    {errors.volume && <p className="error">{errors.volume}</p>}
                </div>
                <div className="edit-form-group">
                    <label htmlFor="state" className="edit-label">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={values.state}
                        onChange={changeHandler}
                        className="edit-input"
                    />
                    {errors.state && <p className="error">{errors.state}</p>}
                </div>
                <div className="edit-form-group">
                    <label htmlFor="price" className="edit-label">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={values.price}
                        onChange={changeHandler}
                        className="edit-input"
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>
                {errors.notAuthorized && <p className="error">{errors.notAuthorized}</p>}
                <button type="submit" className="edit-submit-btn">Save Changes</button>
            </form>
            </div> */}
    </>
  );
}
