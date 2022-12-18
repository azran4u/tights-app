import { useProducts } from '../model';
import ErrorPage from '../pages/ErrorPage';
import ListViewNew from './ListViewNew';

const ProductList = () => {
  const products = useProducts();

  if (products.length < 1) {
    return <ErrorPage />;
  }
  return <ListViewNew products={products} />;
};

export default ProductList;
