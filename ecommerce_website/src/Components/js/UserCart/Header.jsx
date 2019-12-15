import React from 'react';
import CartIcon from "./CartIcon";
import CartDropdown from "./CartDropdown";
import {connect} from "react-redux";

const Header = ({hidden, currentUser}) => (
    <div className="header-outer">
        <div className="icon-outer">
            {currentUser == "admin@354thestars.ca" ? null
                :
                (
                    <div>
                        <CartIcon/>
                        {hidden ? null : <CartDropdown/>}
                    </div>
                )
            }
        </div>
    </div>
);

const mapStateToProps = state => ({
    hidden: state.cart.hidden,
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);