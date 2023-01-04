import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { closeSidebar } from "../../../store/sidebarSlice";
import styled from "styled-components";
import { OptionalClassName } from "../../../utils/classNameInterface";
import { device } from "../../../utils/device.sizes";

interface Props extends OptionalClassName {
  isSidebar?: boolean;
}
export const NavLinks: React.FC<Props> = ({ className, isSidebar }) => {
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
  a {
    color: var(--clr-grey-3);
    font-size: 1rem;
    letter-spacing: var(--spacing);
  }

  @media ${device.mobile} {
    margin-bottom: 2rem;

    a {
      display: block;
      text-align: center;
      padding: 1rem 1.5rem;
    }
  }

  @media ${device.desktop} {
    display: flex;
    justify-content: center;

    a {
      text-transform: capitalize;
      padding: 0.5rem;
      &:hover {
        border-bottom: 2px solid var(--clr-primary-7);
      }
    }

    li {
      margin: 0 0.5rem;
    }
  }
`;

export const links = [
  {
    id: 1,
    text: "דף הבית",
    url: "/",
  },
  {
    id: 2,
    text: "משלוח",
    url: "/shipping",
  },
  {
    id: 3,
    text: "מוצרים",
    url: "/products",
  },
  {
    id: 4,
    text: "תשלום",
    url: "/checkout",
  },
];
