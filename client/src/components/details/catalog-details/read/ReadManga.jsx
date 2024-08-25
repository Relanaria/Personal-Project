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
        const updateChapter = currentChapter.split('Chapter');
        if(e.target.innerText == 'Next chapter' && Number(updateChapter[1]) + 1 <= chapters.length){
            setCurrentChapter(`Chapter${Number(updateChapter[1]) + 1}`);
            return;
        }
        
        if(e.target.innerText == 'Previous Chapter' && Number(updateChapter[1]) - 1 >= 1){
            setCurrentChapter(`Chapter${Number(updateChapter[1]) - 1}`)
            return;
        }

        if(e.target.type == 'select-one'){
            setCurrentChapter(`Chapter${e.target.value}`);
            return;
        }      
        
    };
    
    return (
        <>
        <div className='container-chapter'>
            <h1>Tittle: {manga.title}</h1>
            <img src={manga.imgUrl} alt={manga.title} className='chapter-img'/>
            <div className='readbtn-container'>
                <button onClick={handleChapterChangeClick}>Previous Chapter</button>
                <select className='select-chapter' onChange={handleChapterChangeClick} value={currentChapter.replace('Chapter', '')}>
                    {chapters.map(chap => <option key={chap} value={chap}>Chapter {chap}</option>)}
                </select>
                <button onClick={handleChapterChangeClick}>Next chapter</button>
            </div>
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
        <div className='container-chapter'>
            <h1>Tittle: {manga.title}</h1>
            <div className='readbtn-container'>
                <button onClick={handleChapterChangeClick}>Previous Chapter</button>
                <select className='select-chapter' value={currentChapter.replace('Chapter', '')} onChange={handleChapterChangeClick}>
                    {chapters.map(chap => <option key={chap} value={chap}>Chapter {chap}</option>)}
                </select>
                <button onClick={handleChapterChangeClick}>Next chapter</button>
            </div>
        </div>
    </>
    )
}
