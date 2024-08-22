import { useState, useEffect } from "react";

import commentsAPI from "../api/comments-api";


export const useCreateComment = () =>{

    const createComment = async (commentData, mangaId ,username, accessToken) =>{

        const newCommentData = {
            username,
            mangaId,
            ...commentData
        }

        const result = await commentsAPI.createComment(newCommentData, accessToken);

        if(result.code == 401){
            throw new Error("Unauthorized");
        }
        if(result.code === 403){
            throw new Error("Invalid accessToken");
        }
        return result;
    };

    return createComment;
};

export const useGetComments = (mangaId) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        let result = [];

        (async () => {
            const encodeMangaId = encodeURIComponent(`"${mangaId}"`);
            try {
             result = await commentsAPI.getComments(encodeMangaId, signal );
            } catch (error) {
                console.log(error);
            }
            setComments(result);
                
        })();

        return () => {
            controller.abort("Navigating out of Page scopre");
        };
    }, [mangaId]);
    return [comments, setComments];

};
