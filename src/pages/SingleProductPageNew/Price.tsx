interface PriceProps {
  price: number;
}

const Price: React.FC<PriceProps> = (props) => {
  return <h5 className="price">{props.price && MyformatPrice(props.price)}</h5>;
};

function MyformatPrice(price: number): string {
  return `${price} ש"ח`;
}

export default Price;
