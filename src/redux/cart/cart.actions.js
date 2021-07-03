import CartActionTypes from '../cart/cart.types';

 const ToggleCartHidden = ()=> ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export default ToggleCartHidden;

export const addItem = (item)=>({   
        type: CartActionTypes.ADD_ITEM,
        payload: item
    }
);