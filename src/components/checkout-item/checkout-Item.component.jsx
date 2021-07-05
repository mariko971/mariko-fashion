import React from 'react';
import { connect } from 'react-redux';

import './checkout-Item.styles.scss';
import { clearCartItem, addItem, removeItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem })=>{
    const { name, quantity, price, imageUrl } = cartItem;
    return(
    <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt="item" />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <span className='remove' onClick={()=>removeItem(cartItem)}>&#10094; </span>
            {quantity} 
            <span className='add' onClick={()=>addItem(cartItem)} > &#10095;</span>
        </span>
        <span className="price">${price}</span>
        <span className="remove-button" onClick={()=>clearItem(cartItem)}>&#10005;</span>
    </div>
)}

const mapDispatchToProps = dispatch =>({
    clearItem: item => dispatch(clearCartItem(item)),
    removeItem: item => dispatch(removeItem(item)),
    addItem: item => dispatch(addItem(item))

})

export default connect(null, mapDispatchToProps)(CheckoutItem);