import React, { useState } from 'react';
import styled from 'styled-components';
import { productDataType } from '../utils/productData';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';
import Button from './Button';

const AddToCart: React.FC<{ singleProduct: productDataType | {} }> = ({
  singleProduct,
}) => {
  const { addToCart } = useCartContext();
  // need the number of stock here as well after setting up in productData array
  const { id, slug } = { ...singleProduct };
  const [amount, setAmount] = useState(1);

  // if there's stock variable, add logic to allow adding the amount === stock
  const increaseAmount = () => setAmount(amount + 1);

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  return (
    <>
      <Center>
        <AmountButtons
          amount={amount}
          increase={increaseAmount}
          decrease={decreaseAmount}
        />
      </Center>

      <Center>
        <Button
          text="הוסף לעגלה"
          onClick={() => addToCart(id, slug, amount, singleProduct)}
        />
      </Center>
    </>
  );
};

export default AddToCart;

const Center = styled.div`
  margin: 0 auto;
`;
