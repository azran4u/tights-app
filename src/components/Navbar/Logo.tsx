import whiteLogo from '../../assets/TH.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Logo = () => {
  return (
    <Link to="/">
      <StyledLogo>
        <img src={whiteLogo} alt="cute buddy" />
      </StyledLogo>
    </Link>
  );
};

const StyledLogo = styled.div`
  img {
    width: 3rem;
    height: 3rem;
  }
`;
