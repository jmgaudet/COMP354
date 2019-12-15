import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import axios from 'axios';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function TotalSales(props) {

    const [totalUnits, setTotalUnits] = useState("");
    const [totalRevenue, setTotalRevenue] = useState("");
    const [commission, setCommission] = useState("");


    useEffect(() => {
        let url = `https://rocky-shore-99218.herokuapp.com/admin/stats`;
        axios
            .get(url)
            .then(({data}) => {
                if (data.is_success) {
                    setTotalUnits(data.contents[0].totalUnitsSold);
                    setTotalRevenue(data.contents[0].totalRevenues.toFixed(2));
                    setCommission(data.contents[0].commission.toFixed(2));
                }
            });
    });


    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Total Sales</Title>
            <Typography component="p" variant="h4">
                ${totalRevenue}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                from {totalUnits} products sold
            </Typography>
            <Typography className={classes.depositContext}>
                Commission: ${commission}
            </Typography>
            <div>
            </div>
        </React.Fragment>
    );
}