import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import PageHero from "../components/PageHero";
import {useCartState} from "../context/CartContext";
import StripeCheckout from "../components/StripeCheckout";
import {useNavigate} from "react-router";
import {Alert} from "@mui/material";

const CheckOut = () => {
    const {cart}=useCartState()
    const navigate=useNavigate()
    if(cart.length>0)navigate('/cart')
    return (
        // <main>
        //     <PageHero title='checkout' />
        //     <Wrapper className='page'>
        //         {cart.length < 1 ? (
        //             <div className='empty'>
        //                 <h2>your cart is empty</h2>
        //                 <Link to='/products' className='btn'>
        //                     fill it
        //                 </Link>
        //             </div>
        //         ) : (
        //             <StripeCheckout />
        //         )}
        //     </Wrapper>
        // </main>
        <main className={'my-3 container'}>
            <Alert severity="success">This is a success alert — check it out!</Alert>
        </main>
    )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`
export default CheckOut;