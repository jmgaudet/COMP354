import React from 'react';
import {ReactComponent as ShoppingIcon} from '../../../ImageAssets/shopping-bag.svg';
import '../../css/Cart.css';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../../Redux/cart/cart.actions';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
);

//toggle cart hidden action
const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = ({cart: {cartItems}}) => ({
    itemCount: cartItems.reduce((accQuantity, cartItem) => accQuantity + cartItem.quantity, 0)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);