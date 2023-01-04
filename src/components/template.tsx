import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../store/hooks";
import { OptionalClassName } from "../utils/classNameInterface";
import { device } from "../utils/device.sizes";

interface ComponentNameProps extends OptionalClassName {}

const ComponentName: React.FC<ComponentNameProps> = (props) => {
  const dispatch = useAppDispatch();

  return <Wrapper className={`${props?.className}`}></Wrapper>;
};

const Wrapper = styled.div`
  @media ${device.mobile} {
  }
`;

const PageWrapper: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

interface WrapperProps {}

const Wrapper2 = styled.div.attrs<WrapperProps>({})<WrapperProps>``;

export default ComponentName;
