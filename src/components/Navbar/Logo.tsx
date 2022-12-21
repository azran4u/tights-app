import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';

const Logo = () => {
  return <StyledLogo src={logo} alt="cute buddy" />;
};

const StyledLogo = styled.img`
  width: 3rem;
  height: 3rem;
`;

export default Logo;
