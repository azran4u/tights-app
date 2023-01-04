import styled from 'styled-components';

const Section = styled.section`
  padding: 1rem 0;
  .section-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }

  @include xl {
    .section-center {
      width: 95vw;
    }
  }
`;

export default Section;
