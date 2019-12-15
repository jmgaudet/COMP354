import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux';
import {addItem, clearItemFromCart, removeItem} from "../../../Redux/cart/cart.actions";
import "../../css/Cart.css";

const CheckoutItem = ({cartItem, clearItem, addItem, removeItem}) => {
    const {name, images, price, quantity} = cartItem;
    return (
        <TableRow>
            <TableCell><img alt="item" src={images}/></TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
                <span className="quantity">
                    <div className="quantity-button" onClick={() => removeItem(cartItem)}>&#10094;</div>
                    <div className="quantity">{quantity}</div>
                    <div className="quantity-button" onClick={() => addItem(cartItem)}>&#10095;</div>
                </span>
            </TableCell>
            <TableCell>${price}</TableCell>
            <TableCell align="right" className="remove-button" onClick={() => clearItem(cartItem)}>&#10005;</TableCell>
        </TableRow>
    );
};


const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);