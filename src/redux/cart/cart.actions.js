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
export const clearCartItem = (item)=>({   
        type: CartActionTypes.CLEAR_CART_ITEM,
        payload: item
    }
);
export const removeItem = (item)=>({   
        type: CartActionTypes.REMOVE_ITEM_FROM_CART,
        payload: item
    }    
);