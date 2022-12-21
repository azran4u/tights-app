import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { items } = useCartContext();

  if (items.size < 1) {
    return (
      <PageWrapper>
        <div className="empty">
          <h2>העגלה שלך ריקה</h2>
          <Link to="products" className="btn">
            מלאי את העגלה
          </Link>
        </div>
      </PageWrapper>
    );
  } else {
    return <PageWrapper>{/* <StripeCheckout /> */}</PageWrapper>;
  }
};

const PageWrapper: React.FC = ({ children }) => {
  return (
    <main>
      {/* <PageHero title="checkout" /> */}
      {/* <Wrapper1 /> */}
      <Wrapper className="page">{children}</Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  min-height: 81vh;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
