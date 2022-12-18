import { useProducts } from '../../model';
import SingleProduct from '../Product';

export const FeaturedProductsCards = () => {
  const products = useProducts();

  return (
    <div className="section-center featured">
      {products &&
        products.map((product) => (
          <SingleProduct key={product.kind} product={product} />
        ))}
    </div>
  );
};
