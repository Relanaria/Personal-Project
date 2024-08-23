import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetOneMangaCatalog } from '../../../../hooks/useMangaCatalog';

import './readmangs.css'

export default function ReadManga() {
    const [isPending, setIsPending] = useState(true);
    const [currentChapter, setCurrentChapter] = useState("Chapter1");
    const params = useParams();

    const [manga, setManga] = useGetOneMangaCatalog(params.mangaId, setIsPending);
    const chapters = Array.from({ length: manga.numberOfChapters }, (_, index) => index + 1);
    
    const handleChapterChangeClick = (e) =>{
        console.log(`Chapter${e.target.value}`);
        
        setCurrentChapter(`Chapter${e.target.value}`)
    }
    
    return(
        <>
        <div className='container-chapter'>
            <h1>Tittle: {manga.title}</h1>
            <img src={manga.imgUrl} alt={manga.title} className='chapter-img'/>
            <select className='select-chapter' onChange={handleChapterChangeClick}>
                {chapters.map(chap => <option key={chap} value={chap}>Chapter {chap}</option>)}
            </select>
        </div>
        <div className="container-read">
        <ul>
            {
            isPending ?
            <p>There are no chapters added yet!</p>
            : 
            manga.chapters[currentChapter].map( (currentImgPanel, index) => {
                return (    
                    <li key={index}>
                    <img src={currentImgPanel} alt={manga.title + `img: ${index}`} />
                    </li>
                )
            })
            }
        </ul>
    </div>
        </>
    )
}