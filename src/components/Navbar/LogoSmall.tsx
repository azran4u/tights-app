import styled from "styled-components";
import { OptionalClassName } from "../../utils/classNameInterface";
import Logo from "./Logo";

const SmallLogo = (props: OptionalClassName) => {
  return <StyledLogo className={props.className} />;
};

const StyledLogo = styled(Logo)`
  width: 3rem;
  height: 3rem;
`;

export default SmallLogo;
