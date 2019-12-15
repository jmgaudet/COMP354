import React from 'react';
import axios from "axios";
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

var email = null;

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        e.preventDefault();
        email = e.target.value;
    };

    const submit = () => {

        console.log(email);

        const formData = new FormData();
        formData.append('email', email);

        axios.post('https://rocky-shore-99218.herokuapp.com/passwordreset', formData, {})
            .then(function (response) {
                // The servers response
                console.log(response.data.is_success);
                console.log(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });
        handleClose();
    };

    return (
        <div>
            <Link
                variant="body2"
                onClick={handleClickOpen}
                style={{
                    color: "black"
                }}
            >
                Forgot your password ?
            </Link>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> Forget Password </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your email address here, and we will send you a new password.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submit} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}