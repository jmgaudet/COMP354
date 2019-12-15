import React from 'react';
import '../../css/Cart.css';

const CartItem = ({item: {id, images, price, name, quantity}}) => (
    <div className='cart-item'>
        <img className="cart-item-image" src={images} alt='item'/>
        <div className='item-details'>
            <span className='name'> {name} </span>
            <span className='name'> {quantity} x ${price} </span>
        </div>
    </div>
);

export default CartItem;