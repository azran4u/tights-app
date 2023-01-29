import { useEffect, useState } from "react";
import styled from "styled-components";
import { Size } from "../../../model/size/Size";

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
        <select
          name="size-selector"
          value={selectedSize.label}
          onChange={(e) => {
            const label = e.target.value;
            setSelectedSize(props.sizes.find((size) => size.label === label)!);
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
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default SizeSelector;
