import React, { useState } from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';
import Button from './Button';
import { CartItem } from '../model';

interface AddToCartProps {
  item: CartItem;
}
const AddToCart: React.FC<AddToCartProps> = (props) => {
  
  

  return (
    <>
      

      
    </>
  );
};

export default AddToCart;

const Center = styled.div`
  margin: 0 auto;
`;
