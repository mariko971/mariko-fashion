import { createSelector } from 'reselect';

const selectCart = state => state.cart;

const selectCartItems = createSelector([selectCart], (cart)=>cart.cartItems);

export const selectItemCount = createSelector([selectCartItems],
    cartItems=>cartItems.reduce((accumilatedQuantity, cartItem)=>{
        return accumilatedQuantity + cartItem.quantity;
    },0)
    );