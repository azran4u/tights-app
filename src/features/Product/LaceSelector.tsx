import { Lace } from "../../domain/entities/lace/Lace";
import ValueLabelSelector from "../../shared/ValueLabelSelector";

interface LaceSelectorProps {
  laces: Lace[];
  initialLace: Lace;
  selectedLace: (lace: Lace) => void;
}
const LaceSelector: React.FC<LaceSelectorProps> = (props) => {
  return (
    <ValueLabelSelector<Lace>
      values={props.laces}
      initialValue={props.initialLace}
      selectedValue={props.selectedLace}
    />
  );
};

export default LaceSelector;
