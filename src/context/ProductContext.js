import React from "react";
import image from '../images/hero-bcg.a876f19f.jpeg'
var ProductsStateContext = React.createContext();
var ProductsDispatchContext = React.createContext();

function ProductsReducer(state, action) {
    switch (action.type) {
        case REQUEST_FETCH_PRODUCTS:{
            return {...state,isLoading:true,products:[],error:''}
        }
        case SUCCESS_FETCH_PRODUCTS:{
            return {...state,isLoading:false,products:action.payload}
        }
        case FAILURE_FETCH_PRODUCTS:{
            return {...state,isLoading:false,error:action.payload}
        }
        case REQUEST_FETCH_SINGLE_PRODUCT:{
            return {...state,isLoading:true,singleProduct:null,error:''}
        }
        case SUCCESS_FETCH_SINGLE_PRODUCT:{
            return {...state,isLoading:false,singleProduct:action.payload}
        }
        case FAILURE_FETCH_SINGLE_PRODUCT:{
            return {...state,isLoading:false,singleProduct:action.payload}
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function ProductsProvider({children}) {
    var [state, dispatch] = React.useReducer(ProductsReducer, {
        isLoading:true,
        error:'',
        products:[],
        singleProduct:{images:[{url:''}]}
    });
    return (
        <ProductsStateContext.Provider value={state}>
            <ProductsDispatchContext.Provider value={dispatch}>
                {children}
            </ProductsDispatchContext.Provider>
        </ProductsStateContext.Provider>
    );
}

function useProductsState() {
    var context = React.useContext(ProductsStateContext);
    if (context === undefined) {
        throw new Error("useProductsState must be used within a useProductsState");
    }
    return context;
}

function useProductsDispatch() {
    var context = React.useContext(ProductsDispatchContext);
    if (context === undefined) {
        throw new Error("useProductsDispatch must be used within a ProductsProvider");
    }
    return context;
}

export {ProductsProvider, useProductsState, useProductsDispatch};

// ###########################################################
 const REQUEST_FETCH_PRODUCTS='REQUEST_FETCH_PRODUCTS'
 const SUCCESS_FETCH_PRODUCTS='SUCCESS_FETCH_PRODUCTS'
 const FAILURE_FETCH_PRODUCTS='FAILURE_FETCH_PRODUCTS'
 const REQUEST_FETCH_SINGLE_PRODUCT='REQUEST_FETCH_SINGLE_PRODUCT'
 const SUCCESS_FETCH_SINGLE_PRODUCT='SUCCESS_FETCH_SINGLE_PRODUCT'
 const FAILURE_FETCH_SINGLE_PRODUCT='FAILURE_FETCH_SINGLE_PRODUCT'
// ###########################################################
export const fetchProductsRequest = (dispatch) => {
dispatch({
    type:REQUEST_FETCH_PRODUCTS
})
}
export const fetchProductsSuccess = (dispatch,products) => {
    dispatch({
        type:SUCCESS_FETCH_PRODUCTS,
        payload:products
    })
}
export const fetchProductsFailure = (dispatch,error) => {
    dispatch({
        type:FAILURE_FETCH_PRODUCTS,
        payload:error
    })
}
export const fetchSingleProductRequest = (dispatch) => {
dispatch({
    type:REQUEST_FETCH_SINGLE_PRODUCT
})
}
export const fetchSingleProductSuccess = (dispatch,product) => {
    dispatch({
        type:SUCCESS_FETCH_SINGLE_PRODUCT,
        payload:product
    })
}
export const fetchSingleProductFailure = (dispatch,error) => {
    dispatch({
        type:FAILURE_FETCH_SINGLE_PRODUCT,
        payload:error
    })
}