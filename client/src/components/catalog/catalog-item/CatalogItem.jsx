import { Link } from 'react-router-dom';

export default function CatalotItem({manga}) {

    return(
    <div className="catalog-item">
        <img src={manga.imgUrl} alt={manga.title} className="img-fluid"/>
        <h3>{manga.title}</h3>
        <p>{manga.author}</p>
        <Link to={`${manga._id}/details`} className="details-link">Details</Link>
    </div>
    )
}