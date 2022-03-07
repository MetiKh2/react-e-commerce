import React, {useEffect} from 'react';
import styled from "styled-components";
import PageHero from "../components/PageHero";
import Filters from "../components/Filters";
import {fetchProductsFailure, fetchProductsRequest, fetchProductsSuccess} from "../context/ProductContext";
import {fetchProducts} from "../api/productApi";
import {useFilterDispatch} from "../context/FilterContext";
import ProductList from "../components/ProductList";
import Sort from "../components/Sort";

const Products = () => {
    const filterDispatch=useFilterDispatch()
    useEffect(()=>{
        fetchProducts((isOk,res)=>{
            if(isOk){
                fetchProductsSuccess(filterDispatch,res)
            }
            else{
                fetchProductsFailure(filterDispatch,res)
            }
        })
    },[])
    return (
            <main>
                <PageHero title='products' />
                <Wrapper className='page'>
                    <div className='section-center products'>
                        <Filters />
                        <div>
                            <Sort />
                            <ProductList />
                        </div>
                    </div>
                </Wrapper>
            </main>
    );
};
const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`
export default Products;