import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

interface ProductAmountButtonsProps {
  amount: number;
  increase: () => void;
  decrease: () => void;
  className?: string;
  allowEdit?: boolean;
}
const ProductAmountButtons: React.FC<ProductAmountButtonsProps> = ({
  amount,
  increase,
  decrease,
  className,
  allowEdit,
}) => {
  allowEdit = allowEdit ?? true;
  return (
    <Wrapper className={`amount-btns ${className}`}>
      {allowEdit && (
        <button type="button" className="amount-btn" onClick={increase}>
          <FaPlus />{" "}
        </button>
      )}
      <h2 className="amount">{amount}</h2>
      {allowEdit && (
        <button type="button" className="amount-btn" onClick={decrease}>
          <FaMinus />{" "}
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default ProductAmountButtons;
