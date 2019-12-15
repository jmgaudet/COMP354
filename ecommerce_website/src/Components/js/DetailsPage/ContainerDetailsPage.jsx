import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import {addItem} from '../../../Redux/cart/cart.actions';
import {connect} from 'react-redux';
import "../../css/ContainerDetails.css"
import axios from "axios";
import L from '@material-ui/core/Link';
import {Link} from 'react-router-dom';


// Basic style for paper - can't retrieve 'theme.spacing(2)' inside css file
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: "95%",
    },
}));

const ContainerDetailsPage = ({addItem, item, name, description, imageUrl, category, price, sellerId}) => {
    const classes = useStyles();
    const [sellerFullName, setSellerFullName] = useState("");
    const [isRedirect, setRedirect] = useState(false);

    // retrieve specific name for seller personal info
    useEffect(() => {
        axios
            .get('https://rocky-shore-99218.herokuapp.com/users/' + sellerId)
            .then(({data}) => {
                if (data.is_success) {
                    setSellerFullName(data.contents[0].firstName + " " + data.contents[0].lastName);
                }
            });
    });

    return (
        <div className="container">
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <ButtonBase className="image">
                            {/* TODO: Add props.imageURL */}
                            <img className="img" alt="product image" src={imageUrl}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm={8} container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {description}
                                </Typography>
                                {/* <Typography variant="body2" color="textSecondary">
                  {props.id}
                </Typography> */}
                                <Typography variant="body2" color="textSecondary">
                                    Category: {category}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Price: {price}
                                </Typography>
                                <L variant="body2" color="textSecondary" label="Login" component={Link} to={
                                    {
                                        pathname: '/SellerDetails',
                                        state: {
                                            name: sellerFullName,
                                            sellerId: sellerId,
                                            isFromProductPage: true
                                        }
                                    }
                                }> Seller: {sellerFullName} </L>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={() => {
                                    addItem(item);
                                }}>
                                    Add To Cart
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(ContainerDetailsPage);