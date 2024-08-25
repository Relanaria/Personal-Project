import React, { useState } from 'react';
import './CartPage.css'; // Assuming you will add the custom CSS here

export default function CartPage  ({ cartItems }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div className="cart-container">
            <div className="cart-items-section">
                <h2>Products added to cart</h2>
                <ul className="cart-items-list">
                    {cartItems.map((item, index) => (
                        <li 
                            key={index} 
                            className="cart-item" 
                            onClick={() => handleItemClick(item)}
                        >
                            <p>{item.title}</p>
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
                        <h3>Title: {selectedItem.title}</h3>
                        <p>Volume: {selectedItem.volume}</p>
                        <p>State: {selectedItem.state}</p>
                        <p>Price: {selectedItem.price}$</p>
                        <img src={selectedItem.imgUrl} alt={selectedItem.title} className="product-image"/>
                    </>
                ) : (
                    <p>Please select a product to see the details.</p>
                )}
            </div>
        </div>
    );
};


