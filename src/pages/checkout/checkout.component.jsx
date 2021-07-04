import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {  selectCartTotal, selectCartItems } from '../../redux/cart/cart-selectors';
import CheckoutItem from '../../components/checkout-item/checkout-Item.component';
import './checkout.styles.scss';

const CheckoutPage = ({cartItems, total})=>(
    <div className='checkout-page'>
        <div className="checkout-header">
           
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Descritpion</span>
            </div>
            <div className="header-block">
                <span>Quantitity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        <div>
            {
            cartItems.map(cartItem=>(
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            ))
            }
        </div>
        <div className="total">
            <span>TOTAL: ${total}</span>
            </div>
        
    </div>
)

const mapStateToProps = createStructuredSelector(
    {
        total: selectCartTotal,
        cartItems: selectCartItems
    }
)

export default connect(mapStateToProps)(CheckoutPage);