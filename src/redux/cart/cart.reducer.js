import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INIT_STATE = {
    hidden : true,
    cartItems: []
}

const CartReducer = (state=INIT_STATE, action)=>{
   switch(action.type){
       case CartActionTypes.TOGGLE_CART_HIDDEN:
           return {
               ...state,
               hidden: !state.hidden
           };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
               cartItems: addItemToCart(state.cartItems, action.payload)
            };
        case CartActionTypes.CLEAR_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item=>item.id!==action.payload.id)
            };
        case CartActionTypes.REMOVE_ITEM_FROM_CART:
            return{
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            };
        case CartActionTypes.CLEAR_CART_OUT_SUCCESS: {
            return {
                ...state,
                cartItems: []
            }
        }
        default:
            return state; 
   }
};

export default CartReducer;