import React from "react";
import { Link } from 'react-router-dom';
import './orderConfirmation.css'; 

export default function FinalizeOrder() {
    


    return(
        <div className="confirmation-container">
            <h1>Thank You for Your Purchase!</h1>
            <p>Your books are on their way to your home.</p>
            <p>We hope you enjoy reading them!</p>
            <div className="confirmation-buttons">
                <Link to="/" className="confirmation-btn">Go to Homepage</Link>
                <Link to="/store" className="confirmation-btn">Browse More Books</Link>
            </div>
        </div>
    )
}