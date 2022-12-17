import styled from 'styled-components';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <StyledButton onClick={() => props.onClick()}>{props.text}</StyledButton>
  );
};

const StyledButton = styled.button`
  text-transform: uppercase;
  background: var(--clr-primary-5);
  color: var(--clr-primary-10);
  padding: 0.375rem 0.75rem;
  letter-spacing: var(--spacing);
  display: inline-block;
  font-weight: 400;
  transition: var(--transition);
  font-size: 0.875rem;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: var(--radius);
  border-color: transparent;
  &:hover {
    color: var(--clr-primary-1);
    background: var(--clr-primary-7);
  }
`;

export default Button;
