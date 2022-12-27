import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { closeSidebar } from '../../store/sidebarSlice';
import styled from 'styled-components';

export const NavLinks: React.FC<{
  className?: string;
  isSidebar?: boolean;
}> = ({ className, isSidebar }) => {
  const dispatch = useAppDispatch();
  return (
    <Wrapper className={className}>
      {links.map(({ id, text, url }) => {
        return (
          <li
            key={id}
            onClick={isSidebar ? () => dispatch(closeSidebar()) : undefined}
          >
            <Link to={url}>{text}</Link>
          </li>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  margin-bottom: 2rem;

  a {
    display: block;
    text-align: center;
    font-size: 1rem;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    letter-spacing: var(--spacing);
  }
`;

export const links = [
  {
    id: 1,
    text: 'דף הבית',
    url: '/',
  },
  {
    id: 2,
    text: 'משלוח',
    url: '/shipping',
  },
  {
    id: 3,
    text: 'מוצרים',
    url: '/products',
  },
  {
    id: 4,
    text: 'תשלום',
    url: '/checkout',
  },
];
