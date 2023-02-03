import styled from "styled-components";

const Loading = styled.div`
  width: 6rem;
  height: 6rem;
  margin: 0 auto;
  border-radius: 50%;
  border: 4px solid #ccc;
  border-top-color: var(--clr-primary-5);
  animation: spinner 0.6s linear infinite;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
