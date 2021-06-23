import React from 'react';

import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/Custom-button.component';

const CartDropdown = ()=>(
    <div className="cart-dropdown">
        <div className="cart-items">

        </div>
        <CustomButton>CHECK OUT</CustomButton>
    </div>
)

export default CartDropdown;