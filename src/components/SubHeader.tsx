import React from 'react';
import styled from 'styled-components';
import Underline from './Underline';

interface SubHeaderProps {
  text: string;
  className?: string;
}
const SubHeader: React.FC<SubHeaderProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <h2>{props.text}</h2>
      <Underline />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
`;

export default SubHeader;
