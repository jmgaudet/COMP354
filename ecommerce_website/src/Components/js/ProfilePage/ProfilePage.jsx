import React, {useEffect, useState} from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../../css/ProfilePage.css";
import axios from "axios";
import {connect} from 'react-redux';
import {selectUser} from '../../../Redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';

const ProfilePage = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [primaryAddress, setPrimaryAddress] = useState("");
    const [alternateAddress, setAlternateAddress] = useState("");
    const [currentUser, setCurrentuser] = useState(props.user.currentUser);
    const [refreshPage, setRefreshPage] = useState(true);

    useEffect(() => {
        if (props.user) {
            axios
                .get("https://rocky-shore-99218.herokuapp.com/users/" + props.user.sellerId)
                .then(({data}) => {
                    if (data.is_success && refreshPage) {
                        setFirstName(data.contents[0].firstName);
                        setLastName(data.contents[0].lastName);
                        setImageUrl(data.contents[0].imageUrl);
                        setPrimaryAddress(data.contents[0].primaryAddress);
                        setAlternateAddress(data.contents[0].alternateAddress);
                        setRefreshPage(false);
                    }
                });
        }
    });

    function setUserInfo() {
        axios.put('https://rocky-shore-99218.herokuapp.com/users/' + props.user.sellerId + "/details", {
            firstName: firstName,
            lastName: lastName,
            primaryAddress: primaryAddress,
            alternateAddress: alternateAddress,
        })
            .then(function (response) {
                setRefreshPage(true);
                console.log(response);
            })
            .catch(function (error) {
                    console.log(error);
                }
            );
    }

    return (
        <div className="container">
            <Paper className="paper">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <img alt="User Profile Image" src={imageUrl}/>
                    </Grid>
                    <Grid item xs={12} sm={8} container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="First Name"
                                    defaultValue="First Name"
                                    className="text-field"
                                    margin="normal"
                                    value={firstName}
                                    onChange={e =>
                                        setFirstName(e.target.value)
                                    }
                                    InputProps={{
                                        readOnly: false,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Last Name"
                                    defaultValue="Last Name"
                                    className="text-field"
                                    margin="normal"
                                    value={lastName}
                                    onChange={e =>
                                        setLastName(e.target.value)
                                    }
                                    InputProps={{
                                        readOnly: false,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label="Email Address"
                                    defaultValue="Email Address"
                                    className="text-field"
                                    margin="normal"
                                    variant="outlined"
                                    value={currentUser}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Primary Address"
                                    defaultValue="Primary Address"
                                    className="text-field"
                                    margin="normal"
                                    value={primaryAddress}
                                    onChange={e =>
                                        setPrimaryAddress(e.target.value)
                                    }
                                    InputProps={{
                                        readOnly: false,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Alternate Address"
                                    defaultValue="Alternate Address"
                                    className="text-field"
                                    margin="normal"
                                    value={alternateAddress}
                                    onChange={e =>
                                        setAlternateAddress(e.target.value)
                                    }
                                    InputProps={{
                                        readOnly: false,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            style={{
                                margin: "25px"
                            }}
                            onClick={e => {
                                setUserInfo();
                            }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    user: selectUser
});

export default connect(mapStateToProps)(ProfilePage);