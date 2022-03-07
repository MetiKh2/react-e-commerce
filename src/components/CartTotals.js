import React from 'react';
import styled from "styled-components";
import {formatter} from "../utils/price";
import {Link} from "react-router-dom";
import {clearCart, useCartDispatch, useCartState} from "../context/CartContext";
import {useAuth0} from "@auth0/auth0-react";

const CartTotals = () => {
    const {isAuthenticated,user}
        =useAuth0()
    const {total_amount,shipping_fee}=useCartState()
    const isUser=isAuthenticated&&user
    const cartDispatch=useCartDispatch()
    return (
        <Wrapper>
            <div>
                <article>
                    <h5>
                        subtotal : <span>{formatter.format(total_amount)}</span>
                    </h5>
                    <p>
                        shipping fee : <span>{formatter.format(shipping_fee)}</span>
                    </p>
                    <hr />
                    <h4>
                        order total :{' '}
                        <span>{formatter.format(total_amount + 0)}</span>
                    </h4>
                </article>
                {isUser ? (
                    <Link onClick={()=>clearCart(cartDispatch)} to='/checkout' className='btn'>
                        proceed to checkout
                    </Link>
                ) : (
                    <button type='button' disabled className='btn' >
                        login
                    </button>
                )}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`
export default CartTotals;