import React from 'react';
import {Route,Routes} from "react-router";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import NotFound from "./pages/NotFound";

const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route element={<Home/>} path={'/'}></Route>
                <Route element={<About/>} path={'/about'}></Route>
                <Route element={<Cart/>} path={'/cart'}></Route>
                <Route element={<CheckOut/>} path={'/checkout'}></Route>
                <Route element={<Products/>} path={'/products'}></Route>
                <Route element={<SingleProduct/>} path={'/products/:id'}></Route>
                <Route element={<NotFound/>} path={'*'}></Route>
            </Routes>
            <Footer/>
        </>
    );
};

export default App;