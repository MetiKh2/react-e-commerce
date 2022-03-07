import React from "react";

var CartStateContext = React.createContext();
var CartDispatchContext = React.createContext();

function CartReducer(state, action) {
    switch (action.type) {

        case ADD_TO_CART:{
            let tempItem=state.cart.find(i=>i.id==action.payload.id&&i.color==action.payload.color)
            const itemIndex=state.cart.indexOf(tempItem)
            let tempCart=[];
            let totalItems=state.total_items;
            let totalAmount=state.total_amount;
            if(tempItem){
                tempItem.amount+=action.payload.amount
                tempCart=[...state.cart.slice(0,itemIndex),tempItem,...state.cart.slice(itemIndex+1)]
            }
            else{
                totalItems++
                tempItem=action.payload
                tempCart=[...state.cart,tempItem]
            }
            totalAmount+=action.payload.amount*tempItem.product.price
            setCartToLocalStorage(tempCart)
            setTotalAmountToLocalStorage(totalAmount)
            setTotalItemsToLocalStorage(totalItems)
            return {...state,cart: tempCart,total_items:totalItems,total_amount:totalAmount}
        }
        case CHANGE_ITEM_AMOUNT:{
            let item=state.cart.find(i=>i.id==action.payload.id&&i.color==action.payload.color)
            if(!item)return {...state}
            const itemIndex=state.cart.indexOf(item)
                item.amount=action.payload.value
            const modifiedCart=[...state.cart.slice(0,itemIndex),item,...state.cart.slice(itemIndex+1)];
            const totalAmount=action.payload.isIncrease?state.total_amount+item.product.price:state.total_amount-item.product.price;
            setCartToLocalStorage(modifiedCart)
            setTotalAmountToLocalStorage(totalAmount)
            return {...state,cart:modifiedCart,
                total_amount:totalAmount}
        }
        case CLEAR_CART:{
            setCartToLocalStorage([])
            setTotalAmountToLocalStorage(0)
            setTotalItemsToLocalStorage(0)
            return {...state,cart:[], total_items: 0, total_amount: 0}
        }
        case REMOVE_ITEM_FROM_CART:{
            let item=state.cart.find(i=>i.id==action.payload.id&&i.color==action.payload.color)
            if(!item)return {...state}
            const totalAmount=state.total_amount-(item.amount*item.product.price);
            const modifiedCart=state.cart.filter(i=>i.id!=action.payload.id||i.color!=action.payload.color);
            setCartToLocalStorage(modifiedCart)
            setTotalAmountToLocalStorage(totalAmount)
            setTotalItemsToLocalStorage(state.total_items-1)
            return {...state,cart:modifiedCart,total_items:state.total_items-1,
                total_amount:totalAmount}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function CartProvider({children}) {
    var [state, dispatch] = React.useReducer(CartReducer, {
        cart: getCartLocalStorage(),
        total_items: getTotalItemsLocalStorage(),
        total_amount: getTotalAmountLocalStorage(),
        shipping_fee: 534,
    });
    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
}

function useCartState() {
    var context = React.useContext(CartStateContext);
    if (context === undefined) {
        throw new Error("useCartState must be used within a useCartState");
    }
    return context;
}

function useCartDispatch() {
    var context = React.useContext(CartDispatchContext);
    if (context === undefined) {
        throw new Error("useCartDispatch must be used within a CartProvider");
    }
    return context;
}

export {CartProvider, useCartState, useCartDispatch};

// ###########################################################
const ADD_TO_CART='ADD_TO_CART'
const CHANGE_ITEM_AMOUNT='CHANGE_ITEM_AMOUNT'
const REMOVE_ITEM_FROM_CART='REMOVE_ITEM_FROM_CART'
const CLEAR_CART='CLEAR_CART'
// ###########################################################
export const addToCart = (dispatch,id,color,amount,product) => {
    dispatch({
        type:ADD_TO_CART,
        payload:{
            id,color,amount,product
        }
    })
}
export const changeItemAmount = (dispatch,id,color,isIncrease,value) => {
    dispatch({
        type:CHANGE_ITEM_AMOUNT,
        payload:{
            id,color,isIncrease,value
        }
    })
}
export const removeItemFromCart = (dispatch,id,color) => {
    dispatch({
        type:REMOVE_ITEM_FROM_CART,
        payload: {
            id,color
        }

    })
}
export const clearCart = (dispatch) => {
    dispatch({
        type:CLEAR_CART,

    })
}
//#####################################################
const setCartToLocalStorage = (cart) => {
  localStorage.setItem('cart',JSON.stringify(cart))
}
const getCartLocalStorage = () => {
    let cart = localStorage.getItem('cart')
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'))
    } else {
        return []
    }
}
const setTotalAmountToLocalStorage = (totalAmount) => {
  localStorage.setItem('total-amount',totalAmount)
}
const getTotalAmountLocalStorage = () => {
    let totalAmount = localStorage.getItem('total-amount')
    if (totalAmount&&tryParseInt(totalAmount)) {
        return parseInt(totalAmount)
    } else {
        return 0
    }
}
const setTotalItemsToLocalStorage = (totalItems) => {
  localStorage.setItem('total-items',totalItems)
}
const getTotalItemsLocalStorage = () => {
    let totalItems = localStorage.getItem('total-items')
    if (totalItems&&tryParseInt(totalItems)) {
        return parseInt(totalItems)
    } else {
        return 0
    }
}
const tryParseInt = (value) => {
      if(isNaN(parseInt(value)))
          return false
    return true
}