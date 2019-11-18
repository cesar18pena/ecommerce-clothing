import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const Cart = () => (
  <div className='cart-dropdown'>
    <div className='cart-items' />
    <CustomButton>Go To Checkout</CustomButton>
  </div>
)

export default Cart;
