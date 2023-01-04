import { useProducts } from "../../../model";
import ErrorPage from "../../Error/ErrorPage";
import ProductsListView from "./ProductsListView";

const ProductList = () => {
  const products = useProducts();

  if (products.length < 1) {
    return <ErrorPage />;
  }
  return <ProductsListView products={products} />;
};

export default ProductList;
