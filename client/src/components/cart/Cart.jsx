import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from '../../contexts/AuthContext';
import { useBuyManga } from '../../hooks/useMangaStore';

import './CartPage.css'; 

export default function CartPage  () {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    const userContext = useAuthContext();
    const buyManga = useBuyManga();

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const calculateTotalPrice = () => {
        return userContext.products.reduce((total, item) => total + Number(item.price), 0);
    };

    const handleRemoveItemClick = (e, mangaId) =>{
        
        const cartProducts = JSON.parse(localStorage.getItem('authState'));
        const result = cartProducts.products.filter(x => x._id != mangaId);
        cartProducts.products = result;
        localStorage.setItem('authState', JSON.stringify(cartProducts));
        
        userContext.products = userContext.products.filter(x => x._id != mangaId);
    }

    const handleFinalizeOrderClick = () =>{
        const res =  buyManga(userContext.products, userContext.accessToken);

        const cartProducts = JSON.parse(localStorage.getItem('authState'));
        cartProducts.products = [];
        localStorage.setItem('authState', JSON.stringify(cartProducts));
        userContext.products = [];
        navigate('/orderSend');
    }

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
                            <p>Title: {item.title}</p>
                            <p>Volume: {item.volume}</p>
                            <Link to={`/store/${item._id}/details`} className="details-link">Details</Link>
                            <button onClick={(e) =>handleRemoveItemClick(e, item._id)} className="details-link">Remove</button>
                        </li>
                    ))}
                </ul>
                <div className="cart-summary">
                    <p>Total price: {calculateTotalPrice()}$</p>
                    <button onClick={handleFinalizeOrderClick} className="finalize-order-btn">Finalize order</button>
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


