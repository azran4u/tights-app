import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link, useHistory } from 'react-router-dom';
import { CartContent } from '../components';
import Page from '../components/Page';
import Button from '../components/Button';

const CartPage = () => {
  const { items } = useCartContext();
  const history = useHistory();

  if (items.size < 1) {
    return (
      <Page>
        <Wrapper>
          <h2>העגלה שלך ריקה</h2>
          <Button
            text="מלאי את העגלה"
            onClick={() => {
              history.push('/');
            }}
          />
        </Wrapper>
      </Page>
    );
  } else {
    return (
      <Page>
        <CartContent />
      </Page>
    );
  }
};

const Wrapper = styled.div`
  min-height: 80vh;
  text-align: center;
`;

export default CartPage;
