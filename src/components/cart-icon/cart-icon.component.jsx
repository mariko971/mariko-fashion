import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import ToggleCartHidden from '../../redux/cart/cart.actions';
import { selectItemCount } from '../../redux/cart/cart-selectors';

const CartIcon = ({ToggleCartHidden, itemCount})=> (
    <div className="cart-icon" onClick={ToggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{itemCount}</span>
    </div>
);

const mapDisatchToProps = dispatch => ({
    ToggleCartHidden : ()=>dispatch(ToggleCartHidden())
});

const mapStateToProps = (state) =>({
    itemCount: selectItemCount(state)
})

export default connect(mapStateToProps,mapDisatchToProps)(CartIcon);