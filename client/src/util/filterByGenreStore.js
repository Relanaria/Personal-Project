export default function filterByGenreStore(mangaBooks, genre) {
    if(genre !== 'All'){
        const filterBooks = mangaBooks.filter((mangaBook) => mangaBook.genre == genre && mangaBook.statusSold == "false");
        
        return filterBooks
    }else{
        const filterdBooks = mangaBooks.filter((mangaBook) => mangaBook.statusSold == "false");

        return filterdBooks
    }
}