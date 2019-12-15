/* eslint-disable no-script-url */
//todo
//this will be current products not yet sold
//need to make a seperate table for products sold
//need to make "add product" function
import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import TablePagination from '@material-ui/core/TablePagination';
import {SearchBar} from './SearchBar';
import Title from './Title';
import axios from 'axios';

export default function Sales(props) {

    const [allItems, setAllItems] = useState([]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");

    const filteredItems = allItems.filter(item =>
        (item.productName && item.productName.toLowerCase().includes(search.toLowerCase()))
        || (item.firstName && item.firstName.toLowerCase().includes(search.toLowerCase()))
        || (item.lastName && item.lastName.toLowerCase().includes(search.toLowerCase()))
        || item.shippingAddress.toLowerCase().includes(search.toLowerCase())
        || item.totalCost.toString().includes(search.toString())
    );

    useEffect(() => {
        let url = `http://rocky-shore-99218.herokuapp.com/orders?page=${page}`;
        axios
            .get(url)
            .then(({data}) => {
                if (data.is_success) {
                    setAllItems(data.contents);
                }
            });
    }, [page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    return (
        <React.Fragment>
            <Title>Recent Sales</Title>
            <Grid spacing={6}>
                <SearchBar handleChange={e => setSearch(e.target.value)}/>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Ship To</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredItems
                        .map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.created}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.firstName + " " + item.lastName}</TableCell>
                                <TableCell>{item.shippingAddress ? item.shippingAddress : "unknown"}</TableCell>
                                <TableCell align="right">${item.totalCost}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={allItems.length}
                page={page}
                rowsPerPageOptions={[]}
                rowsPerPage={[]}
                labelDisplayedRows={() => ""}
                onChangePage={handleChangePage}
            />
        </React.Fragment>
    );
}