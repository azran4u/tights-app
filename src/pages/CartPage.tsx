import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { CartContent } from '../components';
import Page from '../components/Page';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { selectCartItemsTotalAmount } from '../store/cartSlice';

const CartPage = () => {
  const itemsCount = useSelector(selectCartItemsTotalAmount)
  const history = useHistory();

  if (itemsCount < 1) {
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
