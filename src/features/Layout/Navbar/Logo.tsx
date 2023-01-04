import logo from "../../../assets/images/logo.svg";
import { OptionalClassName } from "../../../utils/classNameInterface";

const Logo = (props: OptionalClassName) => {
  return <img src={logo} alt="cute buddy" className={props.className} />;
};

export default Logo;
