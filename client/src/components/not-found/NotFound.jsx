import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className='not-found-header'>404</h1>
            <p className='not-found-p'>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className='not-found-a'>Go back to Home</Link>
        </div>
    );
}
