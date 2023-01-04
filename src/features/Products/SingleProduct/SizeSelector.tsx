import { useEffect, useState } from "react";
import { Size } from "../../../model";
import styled from "styled-components";

interface SizeSelectorProps {
  sizes: Size[];
  initialSize: Size;
  selectedSize: (size: Size) => void;
}
const SizeSelector: React.FC<SizeSelectorProps> = (props) => {
  const [selectedSize, setSelectedSize] = useState<Size>(props.initialSize);

  useEffect(() => {
    props.selectedSize(selectedSize);
  }, [props, selectedSize]);
  return (
    <Wrapper>
      {props.sizes && (
        <div className="sizes-selector">
          <select
            name="size-selector"
            value={selectedSize.label}
            onChange={(e) => {
              const label = e.target.value;
              setSelectedSize(
                props.sizes.find((size) => size.label === label)!
              );
            }}
          >
            {props.sizes.map((size) => {
              return (
                <option key={size.value} value={size.label}>
                  {size.label}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SizeSelector;
