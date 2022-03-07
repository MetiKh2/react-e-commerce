import React from "react";

var FilterStateContext = React.createContext();
var FilterDispatchContext = React.createContext();

function FilterReducer(state, action) {
    switch (action.type) {
        case CHANGE_PRICE:{
            return{...state,price:action.payload}
        }
        case CHANGE_SORT:{
            return{...state,sort:action.payload}
        }
        case CHANGE_CATEGORY:{
            return{...state,category:action.payload}
        }
        case CHANGE_ISFREE:{
            return{...state,isFree:!state.isFree}
        }
        case CHANGE_COLOR:{
            console.log(action.payload)
            return{...state,color:action.payload}
        }
        case CHANGE_COMPANY:{
            return{...state,company:action.payload}
        }
        case CHANGE_SEARCH:{
            return{...state,search:action.payload}
        }
        case UPDATE_PRODUCT_SORTED:{
            let tempProducts=[...state.filteredProducts];
            tempProducts=sortWithType(state.sort,tempProducts)
            return{...state,filteredProducts:tempProducts }
        }
        case UPDATE_PRODUCT_FILTERED:{
            let tempProducts=[...state.allProducts]
            if(state.search)
                tempProducts=tempProducts.filter(p=>p.name.includes(state.search))
            if(state.company.toLowerCase()!='all')
                tempProducts=tempProducts.filter(p=>p.company==state.company)
            if(state.category.toLowerCase()!='all')
                tempProducts=tempProducts.filter(p=>p.category==state.category)
              if(state.color!='all')
                  tempProducts=tempProducts.filter(p=>p.colors.includes(state.color))
              if(state.price>0){
                  tempProducts=tempProducts.filter(p=>p.price<state.price)
              }
              if(state.isFree){
                  tempProducts=tempProducts.filter(p=>p.shipping==true)
              }
              tempProducts=sortWithType(state.sort,tempProducts)
            return{...state,filteredProducts: tempProducts}
        }
        case CLEAR_FILTERS:{
            return{...state,category:'all',
                company:'all',
                color:'all',
                isFree:false,
                search:''}
        }
        case SUCCESS_FETCH_PRODUCTS:{
            return {...state,allProducts:action.payload,filteredProducts:action.payload}
        }
        case FAILURE_FETCH_PRODUCTS:{
            return {...state,error:action.payload}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function FilterProvider({children}) {
    var [state, dispatch] = React.useReducer(FilterReducer, {
        category:'all',
        company:'all',
        color:'all',
        price:null,
        isFree:false,
        search:'',
        allProducts:[],
        filteredProducts:[],
        error:'',
        sort:'name-a'
    });
    return (
        <FilterStateContext.Provider value={state}>
            <FilterDispatchContext.Provider value={dispatch}>
                {children}
            </FilterDispatchContext.Provider>
        </FilterStateContext.Provider>
    );
}

function useFilterState() {
    var context = React.useContext(FilterStateContext);
    if (context === undefined) {
        throw new Error("useFilterState must be used within a useFilterState");
    }
    return context;
}

function useFilterDispatch() {
    var context = React.useContext(FilterDispatchContext);
    if (context === undefined) {
        throw new Error("useFilterDispatch must be used within a FilterProvider");
    }
    return context;
}

export {FilterProvider, useFilterState, useFilterDispatch};

// ###########################################################
const CHANGE_CATEGORY='CHANGE_CATEGORY'
const CHANGE_COMPANY='CHANGE_COMPANY'
const CHANGE_COLOR='CHANGE_COLOR'
const CHANGE_PRICE='CHANGE_PRICE'
const CHANGE_ISFREE='CHANGE_ISFREE'
const CHANGE_SEARCH='CHANGE_SEARCH'
const CLEAR_FILTERS='CLEAR_FILTERS'
const SUCCESS_FETCH_PRODUCTS='SUCCESS_FETCH_PRODUCTS'
const FAILURE_FETCH_PRODUCTS='FAILURE_FETCH_PRODUCTS'
const UPDATE_PRODUCT_FILTERED='UPDATE_PRODUCT_FILTERED'
const CHANGE_SORT='CHANGE_SORT'
const UPDATE_PRODUCT_SORTED='UPDATE_PRODUCT_SORTED'
// ###########################################################
export const changeCategory = (dispatch,category) => {
  dispatch({
        type:CHANGE_CATEGORY,
      payload:category
  })
}
export const changeCompany = (dispatch,company) => {
  dispatch({
        type:CHANGE_COMPANY,
      payload:company
  })
}
export const changeColor = (dispatch,color) => {
  dispatch({
        type:CHANGE_COLOR,
      payload:color
  })
}
export const changePrice = (dispatch,price) => {
  dispatch({
        type:CHANGE_PRICE,
      payload:price
  })
}
export const changeIsFree = (dispatch) => {
  dispatch({
        type:CHANGE_ISFREE,
  })
}
export const changeSearch = (dispatch,search) => {
  dispatch({
        type:CHANGE_SEARCH,
      payload:search
  })
}

export const clearFilters = (dispatch) => {
  dispatch({
        type:CLEAR_FILTERS,
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
export const updateProductFiltered = (dispatch) => {
    dispatch({
        type:UPDATE_PRODUCT_FILTERED,
    })
}
export const updateProductSorted = (dispatch) => {
    dispatch({
        type:UPDATE_PRODUCT_SORTED,
    })
}
export const changeSort = (dispatch,sort) => {
    dispatch({
        type:CHANGE_SORT,
        payload:sort
    })
}
//#############################################
const sortWithType=(sort,products)=>{

    switch (sort) {
        case 'price-lowest':{
            return  products.sort((a,b)=>a.price-b.price)
        }
        case 'price-highest':{
            return products.sort((a,b)=>b.price-a.price)
        }
        case 'name-a':{
           return  products.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
        }
        case 'name-z':{
           return  products.sort(function(a, b){
                if(a.name < b.name) { return 1; }
                if(a.name > b.name) { return -1; }
                return 0;
            })
        }
        default :return products
    }
}

