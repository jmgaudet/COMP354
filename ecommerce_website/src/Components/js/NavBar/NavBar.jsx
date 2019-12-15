import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import Header from "../UserCart/Header";
import {connect} from 'react-redux';
import {logoutCurrentUser} from '../../../Redux/user/user.actions';
import logo from '../../../ImageAssets/logo_smaller.svg';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InfoIcon from '@material-ui/icons/Info';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ListAltIcon from '@material-ui/icons/ListAlt';
import "../../css/NavBar.css";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        position: "absolute",
        right: 0,
    },
    shopButton: {

        right: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const NavBar = ({firstName, isAdmin, currentUser, logoutCurrentUser}) => {
    const [navItemValue, setNavItemValue] = useState(1);
    const [homePageIndex] = useState(1);
    const [checkoutPageIndex] = useState(2);
    const [profilePageIndex] = useState(3);
    const [registerPageIndex] = useState(3);
    const [loginPageIndex] = useState(4);
    const [dashboardPageIndex] = useState(4);
    const [adminDashboardPageIndex] = useState(4);
    const [aboutPageIndexOne] = useState(5);
    const [sellerDetailsPageIndex] = useState(6);
    const [aboutPageIndexTwo] = useState(7);
    const [localHostString] = useState("http://localhost:3000");
    const [homePageString] = useState("/");
    const [checkoutPageString] = useState("/checkout");
    const [profilePageString] = useState("/profile");
    const [sellerDetailsPageString] = useState("/SellerDetails");
    const [dashboardPageString] = useState("/dashboard");
    const [adminDashboardString] = useState("/admindashboard");
    const [registerPageString] = useState("/RegisterPage");
    const [loginPageString] = useState("/Login");
    const [aboutPageString] = useState("/about");
    const [right, setRight] = useState(false);

    const classes = useStyles();

    const setIndexOfNavLocation = (currentLocation) => {
        if (currentLocation == (localHostString + homePageString)) {
            setNavItemValue(homePageIndex);
        } else if (currentLocation == (localHostString + checkoutPageString)) {
            setNavItemValue(checkoutPageIndex);
        } else if (currentLocation == (localHostString + profilePageString)) {
            setNavItemValue(profilePageIndex);
        } else if (currentLocation == (localHostString + dashboardPageString)) {
            setNavItemValue(dashboardPageIndex);
        } else if (currentLocation == (localHostString + adminDashboardString)) {
            setNavItemValue(adminDashboardPageIndex);
        } else if (currentLocation == (localHostString + registerPageString)) {
            setNavItemValue(registerPageIndex);
        } else if (currentLocation == (localHostString + loginPageString)) {
            setNavItemValue(loginPageIndex);
        } else if (currentUser && currentLocation == (localHostString + sellerDetailsPageString)) {
            setNavItemValue(sellerDetailsPageIndex);
        } else if (currentUser && currentLocation == (localHostString + aboutPageString)) {
            setNavItemValue(aboutPageIndexTwo);
        } else if (!currentUser && currentLocation == (localHostString + aboutPageString)) {
            setNavItemValue(aboutPageIndexOne)
        } else {
            console.log("Not a recognized url");
        }
    };

    useEffect(() => {
        let currentLocation = window.location.href;
        setIndexOfNavLocation(currentLocation);
    });

    const handleChange = (event, newValue) => {
        setNavItemValue(parseInt(newValue));
    };

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setRight(open);
    };

    const sideList = side => (
        // {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
        <div
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <Typography className="logged-in" display="block">
                <Box fontWeight="fontWeightBold" m={1}>
                    {currentUser == null ? "" : "Welcome, " + firstName}
                </Box>
            </Typography>
            {
                currentUser ?
                    (
                        <div>
                            <List>
                                <ListItem className="nav-items" button key="Home" component={Link} to={homePageString}
                                          index={homePageIndex}>
                                    <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
                                    <ListItemText primary="Home"/>
                                </ListItem>

                                {currentUser == "admin@354thestars.ca" ?
                                    (
                                        <ListItem className="nav-items" button key="Admin Dashboard" component={Link}
                                                  to={adminDashboardString} index={adminDashboardPageIndex}>
                                            <ListItemIcon>{<DashboardIcon/>}</ListItemIcon>
                                            <ListItemText primary="Admin Dashboard"/>
                                        </ListItem>
                                    )
                                    :
                                    (
                                        <div>
                                            <ListItem className="nav-items" button key="Checkout" component={Link}
                                                      to={checkoutPageString} index={checkoutPageIndex}>
                                                <ListItemIcon>{<ShoppingCartIcon/>}</ListItemIcon>
                                                <ListItemText primary="Checkout"/>
                                            </ListItem>

                                            <ListItem className="nav-items" button key="Seller Dashboard"
                                                      component={Link} to={dashboardPageString}
                                                      index={dashboardPageIndex}>
                                                <ListItemIcon>{<DashboardIcon/>}</ListItemIcon>
                                                <ListItemText primary="Seller Dashboard"/>
                                            </ListItem>
                                        </div>
                                    )
                                }
                                <ListItem className="nav-items" button key="About" component={Link} to={aboutPageString}
                                          index={aboutPageIndexTwo}>
                                    <ListItemIcon>{<InfoIcon/>}</ListItemIcon>
                                    <ListItemText primary="About"/>
                                </ListItem>
                            </List>
                            <Divider/>
                            <List>
                                <ListItem className="nav-items" button key="Profile" component={Link}
                                          to={profilePageString} index={profilePageIndex}>
                                    <ListItemIcon>{<PersonIcon/>}</ListItemIcon>
                                    <ListItemText primary="Profile"/>
                                </ListItem>
                                {currentUser == "admin@354thestars.ca" ? (<div></div>)
                                    :
                                    (
                                        <ListItem className="nav-items" button key="Seller Details" component={Link}
                                                  to={sellerDetailsPageString}
                                                  index={sellerDetailsPageIndex}
                                        >
                                            <ListItemIcon>{<BusinessIcon/>}</ListItemIcon>
                                            <ListItemText primary="Seller Details"/>
                                        </ListItem>
                                    )
                                }

                                <ListItem className="nav-items" button key="Logout" component={Link} to={homePageString}
                                          onClick={() => logoutCurrentUser()}>
                                    <ListItemIcon>{<ExitToAppIcon/>}</ListItemIcon>
                                    <ListItemText primary="Logout"/>
                                </ListItem>
                            </List>
                        </div>
                    )
                    :
                    (
                        <div>
                            <List>
                                <ListItem className="nav-items" button key="Home" component={Link} to={homePageString}
                                          index={homePageIndex}>
                                    <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
                                    <ListItemText primary="Home"/>
                                </ListItem>
                                <ListItem className="nav-items" button key="Checkout" component={Link}
                                          to={checkoutPageString} index={checkoutPageIndex}>
                                    <ListItemIcon>{<ShoppingCartIcon/>}</ListItemIcon>
                                    <ListItemText primary="Checkout"/>
                                </ListItem>
                                <ListItem className="nav-items" button key="About" component={Link} to={aboutPageString}
                                          index={aboutPageIndexOne}>
                                    <ListItemIcon>{<InfoIcon/>}</ListItemIcon>
                                    <ListItemText primary="About"/>
                                </ListItem>
                            </List>
                            <Divider/>
                            <List>
                                <ListItem className="nav-items" button key="Login" component={Link} to={loginPageString}
                                          index={loginPageIndex}>
                                    <ListItemIcon>{<MeetingRoomIcon/>}</ListItemIcon>
                                    <ListItemText primary="Login"/>
                                </ListItem>
                                <ListItem className="nav-items" button key="Register" component={Link}
                                          to={registerPageString} index={registerPageIndex}>
                                    <ListItemIcon>{<ListAltIcon/>}</ListItemIcon>
                                    <ListItemText primary="Register"/>
                                </ListItem>
                            </List>
                        </div>
                    )
            }

        </div>
    );

    return (
        <div className="navigation-bar">
            <AppBar position="static">
                <Toolbar className="toolbar">
                    <Tab className="no-hover" icon={<img className="logo_top_left" src={logo}/>}/>
                    <div edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Header/>
                    </div>
                    <IconButton onClick={toggleDrawer('right', true)} edge="end" className={classes.menuButton}
                                color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Drawer anchor="right" open={right} onClose={toggleDrawer('right', false)}>
                        {sideList('right')}
                    </Drawer>
                </Toolbar>
            </AppBar>
            <hr></hr>

        </div>
    )
};

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser,
    firstName: user.firstName,
    isAdmin: user.isAdmin
});

const mapDispatchToProps = dispatch => ({
    logoutCurrentUser: () => dispatch(logoutCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
