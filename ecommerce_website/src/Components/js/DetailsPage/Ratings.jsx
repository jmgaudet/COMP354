import React, {useEffect, useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import "../../css/Ratings.css";

const Ratings = props => {
    const [totalRatings, setTotalRatings] = useState();
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [ratingChosen, setRatingChosen] = useState("");

    useEffect(() => {
        setTotalRatings(props.totalRatings);
        setIsReadOnly(props.isReadOnly);
        if (ratingChosen) {
            setRatingChosen(ratingChosen);
        } else {
            setRatingChosen(props.value);
        }
    });

    function getChosenRating(value) {
        setRatingChosen(value);
        props.getChosenRating(value);
    }

    return (
        <div className="rating-container">
            <Box className="rating-box" borderColor="transparent">
                <Typography className="rating-text"
                            component="legend">{props.optionalText} Rating: {ratingChosen}</Typography>
                {
                    isReadOnly == true ?
                        (
                            <Rating
                                className="rating-component"
                                name="customized-empty"
                                value={ratingChosen}
                                readOnly
                                precision={0.25}
                                emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                            />
                        )
                        :
                        (
                            <Rating
                                className="rating-component"
                                name="customized-empty"
                                value={ratingChosen}
                                precision={0.25}
                                onChange={e => getChosenRating(e.target.value)}
                                emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                            />
                        )
                }
                {
                    totalRatings ?
                        (
                            <Typography variant="body2" component="legend">{totalRatings} ratings</Typography>
                        )
                        :
                        (
                            <div>{/* Empty Container */}</div>
                        )
                }
            </Box>
        </div>
    );
};

export default Ratings;