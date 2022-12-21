import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';

export const BackToProductsButtonNew: React.FC = () => {
  const history = useHistory();
  return (
    <Button
      text="חזרה לקטלוג המוצרים"
      onClick={() => history.push('/products')}
    />
  );
};
