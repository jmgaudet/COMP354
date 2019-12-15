import React from 'react';
import "../../css/Items.css";
import "../../css/PopUpAddToCart.css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addItem} from '../../../Redux/cart/cart.actions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Item = ({item, history, addItem}) => {
    const {id, name, price, images, category, manufacturer} = item;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (item) => {
        setOpen(true);
    };

    function confirmPressed(item) {
        addItem(item);
        handleClose();
    }

    function cancelPressed() {
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className="card-container">
            <CardContent
                onClick={() => {
                    history.push("/product/" + item.id);
                }}
            >
                <div className='item-container'>
                    <img alt={name} src={images[0]}/>
                    <Typography variant="h5" component="h3"> {name} </Typography>
                    <Typography> Price: {price} $</Typography>
                    <Typography> Category: {category} </Typography>
                    <Typography> Manufacturer: {manufacturer} </Typography>
                    {/* <Typography> Rating: {props.item.rating} </Typography> */}
                </div>
            </CardContent>
            <div className="item-button-container">
                <Button
                    className="add-to-cart-button"
                    variant="outlined"
                    onClick={() => handleClickOpen(item)}>
                    Add To Cart
                </Button>
                <Dialog
                    className="dialog-container"
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Add to cart?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <div className="image-container">
                                <img alt="item" src={images[0]} style={{width: 200, height: 200}}/>
                            </div>
                            <Typography variant="h5" component="h2"> {name} </Typography>
                            <Typography> Price: {price} $</Typography>
                            <Typography> Category: {category} </Typography>
                            <Typography> Manufacturer: {manufacturer} </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => cancelPressed()}>
                            Cancel
                        </Button>
                        <Button onClick={() => confirmPressed(item)}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Card>
    )
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default withRouter(connect(null, mapDispatchToProps)(Item));
