import React from 'react';
import { Link } from 'react-router-dom';

export const BackToProductsButtonNew: React.FC = () => {
  return (
    <Link to="/products" className="btn">
      חזרה לקטלוג המוצרים
    </Link>
  );
};
