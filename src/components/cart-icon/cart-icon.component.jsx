import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import ToggleCartHidden from '../../redux/cart/cart.actions';

const CartIcon = ({ToggleCartHidden})=> (
    <div className="cart-icon" onClick={ToggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">0</span>
    </div>
);

const mapDisatchToProps = dispatch => ({
    ToggleCartHidden : ()=>dispatch(ToggleCartHidden())
});

export default connect(null,mapDisatchToProps)(CartIcon);