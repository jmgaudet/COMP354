import axios from "axios";
import {connect} from 'react-redux';
import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ForgetPassword from "./ForgetPassword.jsx";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {setCurrentUser} from '../../../Redux/user/user.actions';

var error1 = false;
var error2 = false;

const Login = ({setCurrentUser}) => {

    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // A function that vaildates input and then changes state
    const handleChange1 = (input) => e => {

        if ([input] == 'email' && emailRegex.test(e.target.value) == true) {
            setEmail(e.target.value);
        } else
            setEmail(null);
    };

    const handleChange2 = (input) => e => {

        if ([input] == 'password' && e.target.value.length != 0) {
            setPassword(e.target.value);
        } else
            setPassword(null);
    };


    const errorCheck = () => {

        if (email != null)
            error1 = false;
        else {
            error1 = true;
        }

        if (password != null)
            error2 = false;
        else {
            error2 = true;
        }

    };

    // A function that submits the form to the backend (restAPI)
    const submit = () => {

        errorCheck();

        // if condition to make sure all the required fields have some input (some value)
        if (email != null && password != null) {

            axios.post('https://rocky-shore-99218.herokuapp.com/login', {
                email: email,
                password: password,
            })
                .then(function (response) {
                    // The servers response
                    if (response.data.is_success) {
                        console.log(response);
                        setCurrentUser(response.data.contents[0]);
                    } else {
                        console.log(response.data.message);
                        alert("User can not be found. Please try again");
                        window.location.reload(true);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("You have entered something invalid. Please try again");
            forceUpdate();
            print();
        }
    };

    // A function that console logs the fields of the form
    const print = () => {
        console.log(email);
        console.log(password)
    };

    return (
        <Container component="main" maxWidth="xs">
            <form noValidate>
                <Typography align="center" component="h1" variant="h5"> Sign In </Typography>
                <TextField
                    required
                    margin="normal"
                    fullWidth="true"
                    variant="outlined"
                    label="Email"
                    placeholder="Enter Your Email"
                    defaultValue=''
                    onChange={handleChange1('email')}
                    error={error1}
                /> <br/>
                <TextField
                    required
                    margin="normal"
                    fullWidth="true"
                    type="password"
                    variant="outlined"
                    label="Password"
                    placeholder="Enter A Password"
                    defaultValue=''
                    onChange={handleChange2('password')}
                    error={error2}
                /> <br/>
                <Button
                    fullWidth="true"
                    variant="outlined"
                    onClick={submit}
                >
                    Sign In
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <ForgetPassword/>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(Login);
