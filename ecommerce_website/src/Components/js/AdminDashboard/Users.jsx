import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Title from './Title';
import {SearchBar} from './SearchBar';
import axios from 'axios';

export default function Users(props) {

    const [allUsers, setAllUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        let url = `https://rocky-shore-99218.herokuapp.com/users?page=${page}`;
        axios
            .get(url)
            .then(({data}) => {
                if (data.is_success) {
                    setAllUsers(data.contents);
                }
            });
    }, [page, deleteTrigger, search]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    function deleteUser(id) {
        let url = `http://rocky-shore-99218.herokuapp.com/users/${id}`;
        axios
            .delete(url)
            .then(({data}) => {
                console.log(data);
                //triggers the table to update
                setDeleteTrigger(true);
                setDeleteTrigger(false);
                alert("User with id:" + id + " deleted successfully.")
            })
            .catch(function (response) {
                console.log(response);
            });
    }

    function sendPasswordReset(email) {
        let url = `http://rocky-shore-99218.herokuapp.com/passwordreset`;
        const formData = new FormData();
        formData.append('email', email);
        axios.post(url, formData, {})
            .then(function (response) {
                // The servers response
                console.log(response.data.is_success);
                console.log(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const filteredUsers = allUsers.filter(user =>
        user.email.toLowerCase().includes(search.toLowerCase())
        || user.firstName.toLowerCase().includes(search.toLowerCase())
        || user.lastName.toLowerCase().includes(search.toLowerCase())
        || user.id.toString().includes(search.toString())
    );
    return (
        <React.Fragment>
            <Title>Users</Title>
            <Grid spacing={6}>
                <SearchBar handleChange={e => setSearch(e.target.value)}/>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date Created</TableCell>
                        <TableCell> Email </TableCell>
                        <TableCell> Name </TableCell>
                        <TableCell> ID </TableCell>
                        <TableCell> Delete </TableCell>
                        <TableCell align="right"> Send Password Reset </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers
                        .map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.created}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="secondary" onClick={e => {
                                        deleteUser(user.id)
                                    }}>
                                        Delete </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" color="primary" onClick={e => {
                                        sendPasswordReset(user.email)
                                    }}> Send </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={allUsers.length}
                page={page}
                rowsPerPageOptions={[]}
                rowsPerPage={[]}
                labelDisplayedRows={() => ""}
                onChangePage={handleChangePage}
            />
        </React.Fragment>
    );
}