import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector([selectCart], (cart)=>cart.cartItems);

export const selectItemCount = createSelector([selectCartItems],
    cartItems=>cartItems.reduce((accumilatedQuantity, cartItem)=>{
        return accumilatedQuantity + cartItem.quantity;
    },0)
    );

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems=>cartItems.reduce((accumilatedQuantity, cartItem)=>{
        return accumilatedQuantity + cartItem.quantity*cartItem.price;
    },0)
);