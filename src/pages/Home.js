import React, {useEffect} from 'react';
import Header from "../components/Header";
import Design from "../components/Design";
import {
    fetchProductsFailure,
    fetchProductsRequest,
    fetchProductsSuccess,
    useProductsDispatch, useProductsState
} from "../context/ProductContext";
import FeatureProducts from "../components/FeatureProducts";
import {fetchProducts} from "../api/productApi";
import Loading from "../components/Loading";
import Services from "../components/Services";
import Contact from "../components/Contact";

const Home = () => {
    const productsDispatch=useProductsDispatch()
    const {isLoading}=useProductsState()
    useEffect(()=>{
        fetchProductsRequest(productsDispatch)
        fetchProducts((isOk,res)=>{
            if(isOk){
                fetchProductsSuccess(productsDispatch,res)
            }
            else{
                fetchProductsFailure(productsDispatch,res)
            }
        })
    },[])
    if(isLoading){
        return <>
            <main className={'mt-5'}>
                <Design></Design>
                <Loading/>
                <Services/>
                <Contact/>
            </main>
        </>
    }
    return (
        <>
            <main className={'mt-5'}>
                <Design></Design>
                <FeatureProducts/>
                <Services/>
                <Contact/>
            </main>
        </>
    );
};

export default Home;