import whiteLogo from '../../assets/TH.svg';
import styled from 'styled-components';

export const Logo = () => {
  return (
    <StyledLogo>
      <img src={whiteLogo} alt="cute buddy" />
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  img {
    width: 3rem;
    height: 3rem;
  }
`;
