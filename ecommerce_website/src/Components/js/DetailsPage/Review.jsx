import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Ratings from "./Ratings";
import axios from "axios";
import "../../css/Review.css";

const Review = (props) => {
    const [areValuesSet, setBooleanValuesSet] = useState(false);
    const [sellerName, setSellerName] = useState("");
    const [sellerText, setSellerText] = useState("");
    const [sellerId, setSellerId] = useState("");
    const [buyerReview, setBuyerReview] = useState("");
    const [buyerId, setBuyerId] = useState("");
    const [buyerRating, setBuyerRating] = useState("");
    const [buyerName, setBuyerName] = useState("");
    const [areSellerIdsMatching, setSellerIdMatchingBoolean] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [tempSellerText, setTempSellerText] = useState("");
    const [reviewId, setReviewId] = useState("");

    useEffect(() => {
        if (props.buyerId) {
            setBooleanValuesSet(true);
            setBuyerId(props.buyerId);
            setReviewId(props.reviewId);
            setBuyerRating(props.buyerRating);
            setBuyerReview(props.buyerReview);
            setSellerId(props.sellerId);
            setSellerText(props.sellerText);
            setSellerIdMatchingBoolean(sellerId == props.currentUserId)
        }
    });

    useEffect(() => {
        if (buyerId) {
            axios
                .get("https://rocky-shore-99218.herokuapp.com/users/" + buyerId)
                .then(({data}) => {
                    if (data.is_success) {
                        setBuyerName(data.contents[0].firstName + " " + data.contents[0].lastName);
                        setSellerName(props.sellerName);
                    }
                })
        }
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const updateSellerText = (sellerText, reviewId, buyerId, sellerId) => {
        props.updateSellerText(sellerText, reviewId, buyerId, sellerId);
    };

    const handleClose = (isSubmit) => {
        if (isSubmit && tempSellerText) {
            updateSellerText(tempSellerText, reviewId, buyerId, sellerId);
            setTempSellerText("");
        } else {
            setSellerText("");
        }
        setOpen(false);
    };

    const textFieldChanged = (value) => {
        setTempSellerText(value);
    };

    return (
        <div className="main-container">
            {
                areValuesSet ?
                    (
                        <Card className="review-card-container">
                            <CardContent>
                                <div className="review-container">
                                    <Ratings
                                        value={buyerRating}
                                        optionalText="Customer"
                                        isReadOnly={true}
                                    />
                                    <Typography component="legend"> <span
                                        className="name">{buyerName}</span></Typography>
                                    {
                                        buyerReview ?
                                            (
                                                <Typography component="h2"> <span
                                                    className="message">{buyerReview}</span> </Typography>
                                            )
                                            :
                                            (
                                                <div>{/* Empty Container */}</div>
                                            )
                                    }
                                    <br/>
                                    {
                                        sellerText ?
                                            (
                                                <div>
                                                    <Typography component="h2"> <span
                                                        className="name">{sellerName}</span> </Typography>
                                                    <Typography component="h2"> <span
                                                        className="message">{sellerText}</span> </Typography>
                                                </div>
                                            )
                                            :
                                            (
                                                areSellerIdsMatching ?
                                                    (
                                                        <CardActions>
                                                            <Button variant="outlined" onClick={handleClickOpen}>
                                                                Reply
                                                            </Button>
                                                            <Dialog open={open} onClose={e => handleClose(false)}
                                                                    aria-labelledby="form-dialog-title">
                                                                <DialogTitle
                                                                    id="form-dialog-title">Comment</DialogTitle>
                                                                <DialogContent>
                                                                    <DialogContentText>
                                                                        Leave a comment to your buyer
                                                                    </DialogContentText>
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
                                                        </CardActions>
                                                    )
                                                    :
                                                    (
                                                        <div>{/* Empty Container */}</div>
                                                    )
                                            )
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    )
                    :
                    (
                        <div>
                            {/* Empty */}
                        </div>
                    )
            }
        </div>
    )
};

export default Review;