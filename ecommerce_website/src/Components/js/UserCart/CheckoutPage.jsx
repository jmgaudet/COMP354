import React, {useState} from 'react';
import '../../css/Cart.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import {selectCartItems, selectCartTotal} from '../../../Redux/cart/cart.selectors';
import {selectUser} from '../../../Redux/user/user.selectors';
import CheckoutItem from "./CheckoutItem";
import L from '@material-ui/core/Link';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckoutPopup from './CheckoutPopup';

const CheckoutPage = ({cartItems, total, user}) => {

    const [checkOne, setCheckOne] = useState(true);
    const [checkTwo, setCheckTwo] = useState(false);
    const [address, setAddress] = useState(user.primaryAddress);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = name => event => {

        if (name == "checkOne") {
            setCheckOne(true);
            setCheckTwo(false);
            console.log(checkOne);
            console.log(checkTwo);
            setAddress(user.primaryAddress);
        }
        if (name == "checkTwo") {
            setCheckOne(false);
            setCheckTwo(true);
            console.log(checkOne);
            console.log(checkTwo);
            setAddress(user.alternateAddress);
        }
    };


    return (
        <div>
            {cartItems.length ?
                (
                    <div className="checkout">
                        <CheckoutPopup
                            cartItems={cartItems}
                            total={total}
                            open={open}
                            handleClose={handleClose}
                            address={address}
                            user={user.sellerId}
                        />
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell> Quantity </TableCell>
                                    <TableCell> Price </TableCell>
                                    <TableCell align="right">Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map(cartItem => (
                                    <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                                ))}
                            </TableBody>
                        </Table>


                        {user.alternateAddress != "null" && user.sellerId != null ? (
                            <div class="">
                                <br/>
                                <br/>
                                <br/>
                                Please choose a shipping address.
                                <p></p>

                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Primary Address </TableCell>
                                            <TableCell>Alternate Address </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell>
                                            <p> {user.primaryAddress}</p>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={handleChange("checkOne")}
                                                        checked={checkOne}
                                                        color="black"
                                                    />
                                                } label="Primary"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <p> {user.alternateAddress}</p>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={handleChange("checkTwo")}
                                                        checked={checkTwo}
                                                        color="black"
                                                    />
                                                } label="Alternate"
                                            />
                                        </TableCell>
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (<p></p>)
                        }
                        <p></p> <br></br>

                        {user.sellerId != null ? (
                                <div class="pay_button">
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={handleClickOpen}
                                    >
                                        Complete Purchase
                                    </Button>
                                </div>
                            )
                            :
                            (

                                <div className="pay_button">
                                    <L variant="body2" label="Login" component={Link} to={"/Login"}>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                        > Please Log In Before Purchase
                                        </Button>
                                    </L>
                                </div>

                            )
                        }
                    </div>
                )
                :
                (
                    <div align="center"><h2> Your cart is empty </h2></div>
                )
            }
        </div>
    )
};


const mapStateToProps = createStructuredSelector({
    user: selectUser,
    cartItems: selectCartItems,
    total: selectCartTotal
});
export default connect(mapStateToProps)(CheckoutPage);
