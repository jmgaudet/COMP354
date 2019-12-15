import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Ratings from "./Ratings";
import Review from "./Review";
import CommentButton from "../CustomCommentButton"
import Pagination from "material-ui-flat-pagination"
import {addItem} from '../../../Redux/cart/cart.actions';
import {connect} from 'react-redux';
import {selectUser} from '../../../Redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import "../../css/ContainerDetails.css";
import "../../css/SellerDetails.css";
import axios from "axios";


// Basic style for paper - can't retrieve 'theme.spacing(2)' inside css file
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: "95%",
        minHeight: "100%",
    },
}));

const SellerDetails = props => {
    const classes = useStyles();
    const [sellerFullName, setSellerFullName] = useState("");
    const [sellerEmail, setSellerEmail] = useState("");
    const [sellerProfilePic, setSellerProfilePic] = useState("");
    const [sellerRating, setSellerRating] = useState("");
    const [sellerId, setSellerId] = useState("");
    const [reviewContents, setReviewContents] = useState("");
    const [amountOfBuyerReviews, setAmountOfBuyerReviews] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [amountOfRowsPerPage] = useState(2);
    const [reviewsPerRow] = useState(4);
    const [beginningIndex, setBeginningIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(reviewsPerRow * amountOfRowsPerPage);
    const [didLoggedInUserBuyFromSeller, setDidLoggedInUserBuyFromSeller] = useState("");
    const [didUserAlreadyLeaveReview, setDidUserAlreadyLeaveReview] = useState("");
    const [isUserDetailSet, setIsUserDetailSet] = useState(false);
    const [isUserRatingSet, setIsUserRatingSet] = useState(false);
    const [isPurchaseMatchedWithSellerSet, setIsPurchaseMatchedWithSellerSet] = useState(false);

    // retrieve specific details about the seller
    useEffect(() => {
        if (props.location.state && props.location.state.isFromProductPage && !isUserDetailSet) {
            axios
                .get('https://rocky-shore-99218.herokuapp.com/users/' + props.location.state.sellerId)
                .then(({data}) => {
                    if (data.is_success) {
                        setSellerFullName(data.contents[0].firstName + " " + data.contents[0].lastName);
                        setSellerEmail(data.contents[0].email);
                        setSellerProfilePic(data.contents[0].imageUrl);
                        setSellerId(props.location.state.sellerId);
                        setIsUserDetailSet(true);
                    }
                });
        } else if (props.user && !isUserDetailSet) {
            axios
                .get('https://rocky-shore-99218.herokuapp.com/users/' + props.user.sellerId)
                .then(({data}) => {
                    if (data.is_success) {
                        setSellerFullName(data.contents[0].firstName + " " + data.contents[0].lastName);
                        setSellerEmail(data.contents[0].email);
                        setSellerProfilePic(data.contents[0].imageUrl);
                        setSellerId(props.user.sellerId);
                        setIsUserDetailSet(true);
                    }
                });
        }
    });

    // retrieve ratings and reviews of the seller
    useEffect(() => {
        if (props.location.state && props.location.state.isFromProductPage && !isUserRatingSet) {
            axios
                .get('https://rocky-shore-99218.herokuapp.com/seller/' + props.location.state.sellerId + "/ratings")
                .then(({data}) => {
                    if (data.is_success) {
                        setSellerRating(computeAverageRating(data.contents));
                        setReviewContents(data.contents);
                        verifyIfUserAlreadyLeftAReview(data.contents);
                        setIsUserRatingSet(true);
                    }
                });
        } else if (props.user && !isUserRatingSet) {
            axios
                .get('https://rocky-shore-99218.herokuapp.com/seller/' + props.user.sellerId + "/ratings")
                .then(({data}) => {
                    if (data.is_success) {
                        setSellerRating(computeAverageRating(data.contents));
                        setReviewContents(data.contents);
                        verifyIfUserAlreadyLeftAReview(data.contents);
                        setIsUserRatingSet(true);
                    }
                });
        }
    });

    // Check if user who's logged in purchased a product from the seller
    useEffect(() => {
        if (props.user && props.location.state && !isPurchaseMatchedWithSellerSet) {
            if (props.location.state.isFromProductPage) {
                axios.get("https://rocky-shore-99218.herokuapp.com/users/" + props.user.sellerId + "/orders")
                    .then(({data}) => {
                        if (data.is_success && sellerId) {
                            verifyIfUserPurchasedFromSeller(data.contents);
                            setIsPurchaseMatchedWithSellerSet(true);
                        }
                    });
            }
        }
    },);

    function computeAverageRating(contents) {
        var total = 0, count = 0;
        contents.map(content => {
            if (content.rate != "N/A") {
                count++;
                total += content.rate;
            }
        });
        setAmountOfBuyerReviews(count);
        if (count == 0) {
            return null;
        } else {
            return total / count;
        }
    }

    function computeTotalRows() {
        if (amountOfBuyerReviews && amountOfBuyerReviews != 0) {
            return Math.ceil(amountOfBuyerReviews / reviewsPerRow);
        } else {
            return 0;
        }
    }

    function verifyIfUserPurchasedFromSeller(contents) {
        contents.map(content => {
            if (content.sellerId == sellerId) {
                setDidLoggedInUserBuyFromSeller(true);
            } else {
                setDidLoggedInUserBuyFromSeller(false);
            }
        })
    }

    function verifyIfUserAlreadyLeftAReview(contents) {
        contents.map(content => {
            if (content.userId == props.user.sellerId) {
                setDidUserAlreadyLeaveReview(true);
            } else {
                setDidUserAlreadyLeaveReview(false);
            }
        })
    }

    function retrieveUserId(content) {
        return content.userId;
    }


    function retrieveBuyerReview(content) {
        return content.text;
    }

    function retrieveSellerText(content) {
        return content.sellerText;
    }

    function retrieveReviewId(content) {
        return content.id;
    }

    function updateSellerText(sellerText, reviewId, buyerId, sellerId) {
        if (reviewId != null && sellerText != null && buyerId != null && sellerId != null) {
            axios.put('https://rocky-shore-99218.herokuapp.com/ratings/' + reviewId, {
                userId: buyerId,
                sellerId: sellerId,
                sellerText: sellerText,
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            setIsUserDetailSet(false);
            setIsUserRatingSet(false);
        }
    }

    function updateBuyerComment(buyerId, sellerId, rating, tempText) {
        if (buyerId && sellerId && rating && tempText) {
            axios
                .post("https://rocky-shore-99218.herokuapp.com/ratings", {
                    userId: buyerId,
                    sellerId: sellerId,
                    rate: rating,
                    text: tempText,
                }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
            setIsUserDetailSet(false);
            setIsUserRatingSet(false);
            setIsPurchaseMatchedWithSellerSet(false);
        } else {
            // TODO: Add a popup stating that information is missing
            console.log("Missing an element");
        }
    }

    function retrieveBuyerRating(content) {
        return content.rate;
    }

    function updatePageNumber(pageNumber) {
        if (pageNumber > currentPage) {
            // Clicked on next page
            loadNewReviews(endIndex, (endIndex + (reviewsPerRow * amountOfRowsPerPage)));
        } else {
            // Clicked on previous page
            loadNewReviews((beginningIndex - (reviewsPerRow * amountOfRowsPerPage)), beginningIndex);
        }
        setCurrentPage(pageNumber);
    }

    function loadNewReviews(beginningIndex, endIndex) {
        if (reviewContents.length < endIndex) {
            setBeginningIndex(beginningIndex);
            setEndIndex(reviewContents.length);
        } else {
            setBeginningIndex(beginningIndex);
            setEndIndex(endIndex);
        }
    }

    return (
        <div className="container">
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <ButtonBase className="image">
                            <img className="img" alt="seller image" src={sellerProfilePic}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm={8} container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {sellerFullName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    Seller: {sellerFullName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    Email: {sellerEmail}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    <Ratings
                                        value={sellerRating}
                                        optionalText="Seller"
                                        isReadOnly={true}
                                        totalRatings={sellerRating ? reviewContents.length : 0}
                                    />
                                </Typography>
                            </Grid>
                            {
                                didLoggedInUserBuyFromSeller && !didUserAlreadyLeaveReview ?
                                    (
                                        <Grid item>
                                            <CommentButton
                                                buyerId={props.user.sellerId}
                                                sellerId={props.location.state.sellerId}
                                                descriptionText="Leave a comment for the seller"
                                                updateBuyerComment={updateBuyerComment}
                                            />
                                        </Grid>
                                    )
                                    :
                                    (
                                        <div>{/* Empty Container */}</div>
                                    )
                            }
                        </Grid>
                    </Grid>
                    <Grid container xs={12} className="seller-reviews-grid-container" spacing={2}>
                        {
                            reviewContents ?
                                (
                                    reviewContents.slice(beginningIndex, (endIndex)).map(contents => (
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Review
                                                buyerId={retrieveUserId(contents)}
                                                reviewId={retrieveReviewId(contents)}
                                                buyerReview={retrieveBuyerReview(contents)}
                                                buyerRating={retrieveBuyerRating(contents)}
                                                sellerName={sellerFullName}
                                                sellerId={sellerId}
                                                sellerText={retrieveSellerText(contents)}
                                                updateSellerText={updateSellerText}
                                                currentUserId={props.user ? props.user.sellerId : null}
                                            />
                                        </Grid>
                                    ))
                                )
                                :
                                (
                                    <div>{/*Empty Container*/}</div>
                                )
                        }
                    </Grid>
                </Grid>
                <br/>
                <Pagination
                    size='large'
                    limit={amountOfRowsPerPage}
                    total={computeTotalRows()}
                    offset={currentPage - 1}
                    onClick={(e, offset) => updatePageNumber(offset + 1)}
                />
            </Paper>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    user: selectUser
});

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerDetails);