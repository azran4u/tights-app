import React from 'react';
import SubHeader from '../SubHeader';

interface ClassName {
  className?: string;
}
export const FeaturedProductsHeader: React.FC<ClassName> = ({ className }) => {
  return <SubHeader text="המוצרים שלנו" className={className} />;
};
