import axios from "axios";
import {Link} from 'react-router-dom';
import L from '@material-ui/core/Link';
import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {setCurrentUser} from '../../../Redux/user/user.actions';
import {connect} from 'react-redux';


const Register = (props) => {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [primaryAddress, setPrimaryAddress] = useState(null);
    const [alternateAddress, setAlternateAddress] = useState(null);
    const [password, setPassword] = useState(null);
    const [repeatPassword, setRepeatPassword] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [errorCondition1, setErrorCondition1] = useState(false);
    const [errorCondition2, setErrorCondition2] = useState(false);
    const [errorCondition3, setErrorCondition3] = useState(false);
    const [errorCondition4, setErrorCondition4] = useState(false);
    const [errorCondition5, setErrorCondition5] = useState(false);
    const [errorCondition6, setErrorCondition6] = useState(false);

    const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    // A function that vaildates input and changes the state of my attributes. 
    const handleChange = (input) => e => {
        e.preventDefault();

        if ([input] == 'firstName' && e.target.value.length != 0) {
            setFirstName(e.target.value);
        } else if ([input] == 'lastName' && e.target.value.length != 0) {
            setLastName(e.target.value);
        } else if ([input] == 'email' && emailRegex.test(e.target.value) == true) {
            setEmail(e.target.value);
        } else if ([input] == 'primaryAddress' && e.target.value.length != 0) {
            setPrimaryAddress(e.target.value);
        } else if ([input] == 'alternateAddress' && e.target.value.length != 0) {
            setAlternateAddress(e.target.value);
        } else if ([input] == 'imageUrl') {
            setImageUrl(e.target.files[0]);
        } else if ([input] == 'password' && e.target.value.length != 0 && e.target.value.length > 7) {
            setPassword(e.target.value);
        } else if ([input] == 'repeat_password' && e.target.value.length != 0 && e.target.value.length > 7) {
            setRepeatPassword(e.target.value);
        }
        //removing this because initial state will be set to null instead
        else {
            switch (input) {
                case 'firstName':
                    setFirstName(null);
                    break;
                case 'lastName':
                    setLastName(null);
                    console.log("\n" + input);
                    break;
                case 'email':
                    setEmail(null);
                    break;
                case 'primaryAddress':
                    setPrimaryAddress(null);
                    break;
                case 'alternateAddress':
                    setAlternateAddress(null);
                    break;
                case  'imageUrl':
                    setImageUrl(null);
                    break;
                case  'password':
                    setPassword(null);
                    break;
                case  'repeat_password':
                    setRepeatPassword(null);
                    break;
                default:
                    console.log(input);
            }
        }
    };

    const displayErrors1 = () => {
        if (firstName != null) {
            setErrorCondition1(false);
        } else {
            setErrorCondition1(true);
        }
    };

    const displayErrors2 = () => {
        if (lastName != null) {
            setErrorCondition2(false);
        } else {
            setErrorCondition2(true);
        }
    };

    const displayErrors3 = () => {
        if (emailRegex.test(email) == true) {
            console.log("email regex: " + emailRegex.test(email));
            setErrorCondition3(false);
        } else {
            console.log("email regex: " + emailRegex.test(email));
            setErrorCondition3(true);
        }
    };

    const displayErrors4 = () => {
        if (primaryAddress != null) {
            setErrorCondition4(false);
        } else
            setErrorCondition4(true);

    };
    const displayErrors5 = () => {
        if (password != null) {
            setErrorCondition5(false);
        } else
            setErrorCondition5(true);

    };
    const displayErrors6 = () => {
        if ((password != null && repeatPassword != null) && password == repeatPassword) {
            setErrorCondition6(false);
        } else
            setErrorCondition6(true);
    };

    // A function that console logs the fields of the form
    const print = () => {
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(primaryAddress);
        console.log(alternateAddress);
        console.log(password);
        console.log(repeatPassword);
        console.log(imageUrl)
    };

    // A function that submits the form to the backend (restAPI)
    const submit = () => {

        displayErrors1();
        displayErrors2();
        displayErrors3();
        displayErrors4();
        displayErrors5();
        displayErrors6();

        // if condition to make sure all the required fields have some input (some value)
        if (firstName != null && lastName != null && email != null && primaryAddress != null && imageUrl != null && password != null && password == repeatPassword) {

            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('primaryAddress', primaryAddress);
            formData.append('alternateAddress', alternateAddress);
            formData.append('password', password);
            formData.append('repeat_password', repeatPassword);
            formData.append('imageUrl', imageUrl, imageUrl.name);
            for (var key of formData.entries()) {
                console.log(key[0] + ' , ' + key[1])
            }

            const emailData = new FormData();
            emailData.append('email', email);

            // Sending the form to the backend 
            axios.post('https://rocky-shore-99218.herokuapp.com/users', formData, {})
                .then(function (response) {
                    if (response.data.is_success) {
                        console.log("success");
                        alert("Thank you for registering to 354TheStars. Check your email for a email conformation");
                        axios.post('https://rocky-shore-99218.herokuapp.com/welcome', emailData, {})
                            .then(function (response) {
                                console.log("Inside the email post request");
                                console.log(response.data.is_success);
                                console.log(response.data.message);
                            })
                            .catch(function (error) {
                                console.log("Inside the email post request");
                                console.log(error);
                            });
                        console.log(response);
                        props.setCurrentUser(response.data.contents[0]);
                    } else {
                        console.log(response.data.message);
                        alert("Something went wrong please try again");
                    }
                    console.log(response);
                    console.log('SUCCESS!!');
                })
                .catch(function (response) {
                    console.log(response);
                    console.log('FAILURE!!');
                });
        } else {
            alert("You have entered something invalid. Please try again: \n Please make sure you have uploaded a profile picture");
            print();
        }

    };


    return (
        <Container component="main" maxWidth="xs">
            <form noValidate>
                <Typography align="center" component="h1" variant="h5"> Create Account </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            margin="normal"
                            fullWidth="true"
                            variant="outlined"
                            label="First Name"
                            placeholder="Enter Your First Name"
                            defaultValue={firstName}
                            onChange={handleChange('firstName')}
                            error={errorCondition1}
                        />
                    </Grid> <br/>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            margin="normal"
                            fullWidth="true"
                            variant="outlined"
                            label="Last Name"
                            placeholder="Enter Your Last Name"
                            defaultValue={lastName}
                            onChange={handleChange('lastName')}
                            error={errorCondition2}
                        />
                    </Grid>
                </Grid>
                <TextField
                    required
                    fullWidth="true"
                    variant="outlined"
                    label="Email"
                    id="email_field"
                    placeholder="Enter Your Email"
                    defaultValue={email}
                    onChange={handleChange('email')}
                    error={errorCondition3}
                /> <br/>
                <TextField
                    required
                    margin="normal"
                    fullWidth="true"
                    variant="outlined"
                    label="Primary Address"
                    placeholder="Enter Your Primary Address"
                    defaultValue={primaryAddress}
                    onChange={handleChange('primaryAddress')}
                    error={errorCondition4}
                /><br/>
                <TextField
                    margin="normal"
                    fullWidth="true"
                    variant="outlined"
                    label="Alternate Address"
                    placeholder="Enter Alternate Address"
                    defaultValue={alternateAddress}
                    onChange={handleChange('alternateAddress')}
                /><br/>
                <TextField
                    required
                    margin="normal"
                    fullWidth="true"
                    type="password"
                    variant="outlined"
                    label="Password"
                    placeholder="Enter A Password"
                    defaultValue={password}
                    onChange={handleChange('password')}
                    error={errorCondition5}
                />
                <TextField
                    required
                    margin="normal"
                    fullWidth="true"
                    type="password"
                    variant="outlined"
                    label="Re-enter Your Password"
                    placeholder="Re-enter Your Password"
                    defaultValue={repeatPassword}
                    onChange={handleChange('repeat_password')}
                    error={errorCondition6}
                /> <br/>
                <input id="image_id" type="file" onChange={handleChange('imageUrl')}/>
                <br/> <br/>
                <Button
                    fullWidth="true"
                    variant="outlined"
                    onClick={submit}
                >
                    Confirm
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <L
                            variant="body2"
                            label="Login"
                            component={Link}
                            to={"/Login"}
                            style={{
                                color: "black"
                            }}
                        >
                            Already have an account? Sign in
                        </L>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(Register);
