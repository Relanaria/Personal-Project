import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { useAuthContext } from '../../contexts/AuthContext';

import './CartPage.css'; 

export default function CartPage  () {
    const [selectedItem, setSelectedItem] = useState(null);

    const userContext = useAuthContext();
    console.log(userContext);
    

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const calculateTotalPrice = () => {
        return userContext.products.reduce((total, item) => total + Number(item.price), 0);
    };

    return (
        <div className="cart-container">
            <div className="cart-items-section">
                <h2>Products added to cart:</h2>
                <ul className="cart-items-list">
                    {userContext.products?.map((item, index) => (
                        <li 
                            key={index} 
                            className="cart-item" 
                            onClick={() => handleItemClick(item)}
                        >
                            <p>{item.title}</p>
                            <Link to={`/store/${item._id}/details`} className="details-link">Details</Link>
                        </li>
                    ))}
                </ul>
                <div className="cart-summary">
                    <p>Total price: {calculateTotalPrice()}$</p>
                    <button className="finalize-order-btn">Finalize order</button>
                </div>
            </div>
            <div className="product-details-section">
                {selectedItem ? (
                    <>
                        <img src={selectedItem.imgUrl} alt={selectedItem.title} className="product-image"/>
                        <div className='description-cart'>
                        <h3>Title: {selectedItem.title}</h3>
                        <p>Volume: {selectedItem.volume}</p>
                        <p>State: {selectedItem.state}</p>
                        <p>Price: {selectedItem.price}$</p>
                        </div>
                            
                    </>
                ) : (
                    <p>Please select a product to see the details.</p>
                )}
            </div>
        </div>
    );
};


