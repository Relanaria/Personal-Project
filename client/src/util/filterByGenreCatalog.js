

export default function filterByGenre(mangaBooks, genre) {
    if(genre !== 'All'){
        const filterBooks = mangaBooks.filter((mangaBook) => mangaBook.genre == genre && mangaBook.statusDelete == false);
        
        return filterBooks
    }else{
        const filterdBooks = mangaBooks.filter((mangaBook) => mangaBook.statusDelete == false);

        return filterdBooks
    }
}