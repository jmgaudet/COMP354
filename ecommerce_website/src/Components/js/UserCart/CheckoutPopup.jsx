import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {ReactComponent as PaypalIcon} from '../../../ImageAssets/PayPal.svg';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PopupItem from '../UserCart/PopupItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import {removeAllItem} from "../../../Redux/cart/cart.actions";
import {connect} from 'react-redux';

const CheckoutPopup = ({address, user, cartItems, removeAllItem, open, handleClose, total}) => {

    let arrFormData = [];

    //adds all the productIds and quantitys to formdata then adds them to an array
    for (let i = 0; i < cartItems.length; i++) {
        let data = `{"productId":"${cartItems[i].id}","quantity":"${cartItems[i].quantity}"}`;
        let obj = JSON.parse(data);
        arrFormData.push(obj);
    }

    function completePurchase(user, address) {
        let data = `{"shippingAddress":"${address}"}`;
        let obj = JSON.parse(data);
        axios
            .post(`https://rocky-shore-99218.herokuapp.com/users/${user}/orders`, obj, {})
            .then(({data}) => {
                if (!data.is_success) {
                    alert("something went wrong and we couldn't process your cart.");
                }
            })
            .catch(function (response) {
                console.log(response);
            });

        window.open('https://www.paypal.com/ca/signin', '_blank');
        removeAllItem();
        handleClose1();
    }

    function addToCart(arrFormData, user) {
        //  looping with async = a bad time, I hope this works
        for (let i = 0; i < arrFormData.length; i++) {
            axios
                .post(`https://rocky-shore-99218.herokuapp.com/users/${user}/cart`, arrFormData[i], {})
                .then(({data}) => {
                    console.log(data);
                })
                .catch(function (response) {
                    console.log(response);
                });
        }

        handleClose();
    }

    const [open1, setOpen1] = useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    return (
        <div>
            <Dialog open={open1} onClose={handleClose1} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Complete Order</DialogTitle>
                <DialogContentText>
                    Thanks for Shopping with us!
                </DialogContentText>
                <DialogContent>
                    You are one step away, just click the PayPal button to finish this order.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose1}>
                        Cancel
                    </Button>
                    <Button onClick={e => {
                        completePurchase(user, address);
                    }}>
                        <PaypalIcon/>
                    </Button>

                </DialogActions>
            </Dialog>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Finalize Order</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here is a breakdown of your order.
                    </DialogContentText>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell> Quantity </TableCell>
                                <TableCell> Price </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map(cartItem => (
                                <PopupItem key={cartItem.id} cartItem={cartItem}/>
                            ))}
                        </TableBody>
                    </Table>

                    <Table>
                        <TableRow>
                            <TableCell>
                                Shipping Address:
                            </TableCell>
                            <TableCell>
                                {address}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                SubTotal:
                            </TableCell>
                            <TableCell>
                                ${total}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Taxes (15% QC + 8% commission):
                            </TableCell>
                            <TableCell>
                                ${(total * 0.15 + total * 0.08).toFixed(2)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {<strong>Total:</strong>}
                            </TableCell>
                            <TableCell>
                                {<strong>${(total * 1.23).toFixed(2)}</strong>}
                            </TableCell>
                        </TableRow>
                    </Table>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={e => {
                        addToCart(arrFormData, user);
                        handleClickOpen1();
                    }}>
                        Finalize Purchase
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    removeAllItem: () => dispatch(removeAllItem())
});

export default connect(null, mapDispatchToProps)(CheckoutPopup);