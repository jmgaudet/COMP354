import React, {useEffect, useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from "./DetailsPage/Ratings";

const CustomCommentButton = (props) => {
    const [open, setOpen] = useState(false);
    const [buyerId, setBuyerId] = useState("");
    const [sellerId, setSellerId] = useState("");
    const [rating, setRating] = useState("");
    const [tempText, setTempText] = useState("");

    useEffect(() => {
        setBuyerId(props.buyerId);
        setSellerId(props.sellerId);
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (isSubmit) => {
        if (isSubmit) {
            updateBuyerComment(buyerId, sellerId, rating, tempText);
        }
        setTempText("");
        setOpen(false);
    };

    const textFieldChanged = (value) => {
        setTempText(value);
    }

    function getChosenRating(value) {
        setRating(value);
    }

    function updateBuyerComment(buyerId, sellerId, rating, tempText) {
        props.updateBuyerComment(buyerId, sellerId, rating, tempText);
    }

    return (
        <div className="custom-dialog-container">
            <Button variant="outlined" onClick={handleClickOpen}>
                Leave a review
            </Button>
            <Dialog open={open} onClose={e => handleClose(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Comment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.descriptionText}
                    </DialogContentText>
                    <Rating
                        getChosenRating={getChosenRating}
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="name"
                        label="Comment"
                        type="email"
                        fullWidth
                        maxLength="2"
                        onChange={e => textFieldChanged(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={e => handleClose(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={e => handleClose(true)}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CustomCommentButton;