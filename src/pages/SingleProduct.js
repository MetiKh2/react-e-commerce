import React, {useEffect} from 'react';
import {useParams} from "react-router";
import {fetchSingleProduct} from "../api/productApi";
import {
    fetchSingleProductFailure,
    fetchSingleProductRequest,
    fetchSingleProductSuccess,
    useProductsDispatch, useProductsState
} from "../context/ProductContext";
import Loading from "../components/Loading";
import PageHero from "../components/PageHero";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {formatter} from "../utils/price";
import ProductImages from "../components/ProductImages";
import Stars from "../components/Stars";
import AddToCart from "../components/AddToCart";

const SingleProduct = () => {
    const {id}=useParams()
    const {isLoading,singleProduct}=useProductsState()
    const productDispatch=useProductsDispatch()
        useEffect(()=>{
            fetchSingleProductRequest(productDispatch)
            fetchSingleProduct(id,(isOk,res)=>{
                if(isOk){
                    fetchSingleProductSuccess(productDispatch,res)
                }
                else{
                    fetchSingleProductFailure(productDispatch,res)
                }
            })
        },[id])
    if(isLoading) return <div className={'mt-5'}>
        <Loading/>
    </div>
    return (
        <Wrapper>
            <PageHero title={singleProduct.name} product />
            <div className='section section-center page'>
                <Link to='/products' className='btn'>
                    back to products
                </Link>
                <div className=' product-center'>
                    <ProductImages images={singleProduct.images} />
                    <section className='content'>
                        <h2>{singleProduct.name}</h2>
                        <Stars stars={singleProduct.stars} reviews={singleProduct.reviews} />
                        <h5 className='price'> {formatter.format(singleProduct.price)}</h5>
                        <p className='desc'> {singleProduct.description}</p>
                        <p className='info'>
                            <span>Available : </span>
                            {singleProduct.stock > 0 ? 'In stock' : 'out of stock'}
                        </p>
                        <p className='info'>
                            <span>SKU : </span>
                            {singleProduct.id}
                        </p>
                        <p className='info'>
                            <span>Brand : </span>
                            {singleProduct.company}
                        </p>
                        <hr />
                        {singleProduct.stock > 0 && <AddToCart product={singleProduct} />}
                    </section>
                </div>
            </div>
        </Wrapper>
    );
};
const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`
export default SingleProduct;