import styled from 'styled-components';

const Title = () => {
  return (
    <Wrapper className="page">
      <h1>טייץ השומרון</h1>
      <p>טייצים, גרביון ותחרה איכותיים במגוון מידות וצבעים</p>
    </Wrapper>
  );
};

export default Title;

const Wrapper = styled.div`
  min-height: 15vh;
  margin-bottom: 1rem;
  display: grid;
  place-items: center;
`;
