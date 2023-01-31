import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { selectSaleActive } from "../features/Sale/store/saleSlice";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = ({ children, ...rest }) => {
  const activeSale = useAppSelector(selectSaleActive);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    setIsAllowed(activeSale?.active ?? false);
  }, [activeSale]);
  const fallbackRoute = "/sale-closed";

  return (
    <Route
      {...rest}
      render={() => {
        return isAllowed ? children : <Redirect to={fallbackRoute}></Redirect>;
      }}
    ></Route>
  );
};
export default ProtectedRoute;
