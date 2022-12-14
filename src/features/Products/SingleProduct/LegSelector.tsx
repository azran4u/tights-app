import { Leg } from "../../../model";
import ValueLabelSelector from "./ValueLabelSelector";

interface LegSelectorProps {
  legs: Leg[];
  initialLeg: Leg;
  selectedLeg: (leg: Leg) => void;
}
const LegSelector: React.FC<LegSelectorProps> = (props) => {
  return (
    <ValueLabelSelector<Leg>
      values={props.legs}
      initialValue={props.initialLeg}
      selectedValue={props.selectedLeg}
    />
  );
};

export default LegSelector;
