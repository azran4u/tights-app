import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import shopLogo from '../assets/shop_logo.jpg';

const ShippingPage = () => {
  return (
    <main>
      {/* <PageHero title="shipping" /> */}
      <Wrapper className="page section section-center">
        {/* insert about page image here */}
        {/* <img src={shopLogo} alt="square logo" /> */}
        <article className="title">
          <h2>משלוח חינם לנקודות חלוקה בכל רחבי הארץ</h2>
          <div className="underline"></div>
          <p>לרשימת נקודות החלוקה</p>
          <p>מעוניינת לפתוח נקודת חלוקה באזורך? - צרי איתנו קשר</p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  min-height: 81vh;
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: right;
  }
  .underline {
    margin-right: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default ShippingPage;
