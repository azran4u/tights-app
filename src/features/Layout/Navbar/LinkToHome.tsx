import { Link } from "react-router-dom";

const LinkToHome = ({ children }: any) => {
  return <Link to="/">{children}</Link>;
};

export default LinkToHome;
