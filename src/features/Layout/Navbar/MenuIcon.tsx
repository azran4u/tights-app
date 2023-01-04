import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useAppDispatch } from "../../../store/hooks";
import { openSidebar } from "../../../store/sidebarSlice";
import { OptionalClassName } from "../../../utils/classNameInterface";

export const MenuButton: React.FC<OptionalClassName> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <Wrapper
      type="button"
      className={props.className}
      onClick={() => dispatch(openSidebar())}
    >
      <FaBars />
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background: transparent;
  border: transparent;
  color: var(--clr-primary-5);
  cursor: pointer;
  svg {
    font-size: 2rem;
  }
`;
