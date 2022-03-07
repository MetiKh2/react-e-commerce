import React from 'react';
import logo from '../images/logo.221f6b13.svg'
import {Link} from "react-router-dom";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {Badge} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import {PersonRemove} from "@mui/icons-material";
import {useCartState} from "../context/CartContext";
const Header = () => {
    const {isAuthenticated,logout,user,loginWithRedirect}
        =useAuth0()
    const isUser=isAuthenticated&&user
    const {total_items}=useCartState()
    return (
        <header className={'mt-2'}>
            <section className={'container'}>
                <section className={'d-flex justify-content-around align-items-center flex-column flex-md-row'}>
                    <img src={logo} width={175}/>
                    <div className={'d-flex links my-3 my-md-0'}>
                        <Link className={'px-3 fs-6 pb-2'} to={'/'}>Home</Link>
                        <Link className={'px-3 fs-6 pb-2'} to={'/ABOUT'}>About</Link>
                        <Link className={'px-3 fs-6 pb-2'} to={'/products'}>Products</Link>
                    </div>
                    <div>
                        <Link className={'px-3 fs-5 pb-2'} to={'/cart'}>Cart <Badge badgeContent={total_items} color={'info'}><ShoppingCartCheckoutIcon/></Badge></Link>
                        {!isUser&&<a className={'fs-5'} onClick={loginWithRedirect}>Login <PersonAddAltIcon/></a>}
                        {isUser&&<a className={'fs-5'} onClick={logout}>Logout <PersonRemove/></a>}
                    </div>
                </section>
            </section>
        </header>
    );
};

export default Header;