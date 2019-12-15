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
import TablePagination from '@material-ui/core/TablePagination';
import Title from './Title';
import axios from 'axios';

export default function Sales(props) {

    const [allItems, setAllItems] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
        let url = `http://rocky-shore-99218.herokuapp.com/users/${props.sellerId}/sales/`;
        axios
            .get(url)
            .then(({data}) => {
                if (data.is_success) {
                    setAllItems(data.contents);
                }
            });
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <React.Fragment>
            <Title>Recent Sales</Title>
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
                    {allItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.created}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.firstName + " " + item.lastName}</TableCell>
                                <TableCell>{item.shippingAddress ? item.shippingAddress : "unknown"}</TableCell>
                                <TableCell align="right">${item.totalCost}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={allItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </React.Fragment>
    );
}