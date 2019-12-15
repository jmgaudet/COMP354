import './App.css';
import React, {Component} from 'react';
import NavBar from "./Components/js/NavBar/NavBar";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./Components/js/Login/Login";
import HomePage from "./Components/js/HomePage/HomePage";
import AccountDashboard from "./Components/js/AccountDashboard/AccountDashboard";
import AdminDashboard from "./Components/js/AdminDashboard/AdminDashboard";
import ItemDetailsPage from "./Components/js/DetailsPage/ItemDetailsPage";
import SellerDetails from "./Components/js/DetailsPage/SellerDetails";
import RegisterPage from "./Components/js/RegisterPage/RegisterPage";
import UserDetails from "./Components/js/RegisterPage/RegisterPage";
import CheckoutPage from "./Components/js/UserCart/CheckoutPage";
import ProfilePage from "./Components/js/ProfilePage/ProfilePage";
import {connect} from "react-redux";
import AboutPage from './Components/js/AboutPage/About';

class App extends Component {

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/COMP354" component={HomePage}/>
                    <Route path="/cart"/>
                    <Route path="/profile"
                           render={() => this.props.currentUser ? <ProfilePage/> : (<Redirect to='/login'/>)}
                    />
                    <Route
                        path='/dashboard'
                        render={() => this.props.currentUser && !(this.props.currentUser == "admin@354thestars.ca") ?
                            <AccountDashboard/> : (<Redirect to='/'/>)}
                    />
                    <Route
                        path='/admindashboard'
                        render={() => this.props.currentUser == "admin@354thestars.ca" ? <AdminDashboard/> : (
                            <Redirect to='/'/>)}
                    />
                    <Route exact path="/about" component={AboutPage}/>
                    <Route path="/product/:id" component={ItemDetailsPage}/>
                    <Route path="/SellerDetails/" component={SellerDetails}/>
                    <Route
                        path='/RegisterPage'
                        render={() => this.props.currentUser ? (<Redirect to='/'/>) : <RegisterPage/>}
                    />
                    <Route path='/Login'
                           render={() => this.props.currentUser ? (<Redirect to='/'/>) : <Login/>}
                    />
                    <Route path='/checkout'
                           render={() => this.props.currentUser == "admin@354thestars.ca" ? (<Redirect to='/'/>) :
                               <CheckoutPage/>}
                    />
                    <Route path='/login' component={UserDetails}/>
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
});
export default connect(mapStateToProps)(App);

