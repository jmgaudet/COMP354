import React from 'react';
import "../../css/Cart.css";
import Button from '@material-ui/core/Button';
import CartItem from '../UserCart/CartItem';
import Card from '@material-ui/core/Card';
import {connect} from 'react-redux';
import {selectCartItems} from '../../../Redux/cart/cart.selectors';
import {withRouter} from 'react-router-dom';
import {toggleCartHidden} from "../../../Redux/cart/cart.actions";

const CartDropdown = ({cartItems, history, dispatch}) => (
    <Card className="cart-dropdown">

        <div className="cart-items">

            {cartItems.length ?
                (
                    cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} item={cartItem}/>
                    ))
                )
                :
                (<span align="center">Your cart is empty</span>)}
        </div>
        <Button className="checkout-button" variant="outlined" onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }}
        >
            Go To Checkout</Button>
    </Card>
);

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
});
export default withRouter(connect(mapStateToProps)(CartDropdown));