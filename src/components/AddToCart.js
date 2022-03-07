import React, {useState} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {Link} from "react-router-dom";
import AmountButtons from "./AmountButtons";
import styled from "styled-components";
import {addToCart, useCartDispatch} from "../context/CartContext";

const AddToCart = ({product}) => {
    const {colors}=product
    const cartDispatch=useCartDispatch()
    const [mainColor,setMainColor]=useState(colors[0])
    const [amount,setAmount]=useState(1)
    const decrease = () => {
        if(amount>1)
        setAmount(amount-1)
    }
    const increase = () => {
        if(amount<product.stock)
        setAmount(amount+1)
    }
    return (
        <Wrapper>
            <div className='colors'>
                <span> colors : </span>
                <div>
                    {colors.map((color, index) => {
                        return (
                            <button
                                key={index}
                                style={{ background: color }}
                                className={`${
                                    mainColor === color ? 'color-btn active' : 'color-btn'
                                }`}
                                onClick={() => setMainColor(colors[index])}
                            >
                                {mainColor === color ? <CheckIcon /> : null}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className='btn-container'>
                <AmountButtons
                    amount={amount}
                    increase={increase}
                    decrease={decrease}
                />
                <Link
                    to='/cart'
                    className='btn'
                    onClick={() => {addToCart(cartDispatch,product.id, mainColor, amount, product);}}
                >
                    add to cart
                </Link>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart;