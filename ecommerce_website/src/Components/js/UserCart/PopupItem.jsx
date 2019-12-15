import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import "../../css/Cart.css";

const PopupItem = ({cartItem}) => {
    const {name, price, quantity} = cartItem;
    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>
                <span className="quantity">
                    <div className="quantity">{quantity}</div>
                </span>
            </TableCell>
            <TableCell>${price}</TableCell>
        </TableRow>
    );
};


export default PopupItem;