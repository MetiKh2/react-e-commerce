import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import styled from "styled-components";
const AmountButtons = ({amount,decrease,increase}) => {
    return (
        <Wrapper className='amount-btsn'>
            <button type='button' className='amount-btn' onClick={decrease}>
                <RemoveIcon />
            </button>
            <h2 className='amount'>{amount}</h2>
            <button type='button' className='amount-btn' onClick={increase}>
                <AddIcon />
            </button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`

export default AmountButtons;