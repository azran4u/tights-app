import { useEffect, useState } from 'react';
import { Leg } from '../../model';

interface LegSelectorProps {
  legs: Leg[];
  initialLeg: Leg;
  selectedLeg: (leg: Leg) => void;
}
const LegSelector: React.FC<LegSelectorProps> = (props) => {
  const [selectedLeg, setSelectedLeg] = useState<Leg>(props.initialLeg);

  useEffect(() => {
    props.selectedLeg(selectedLeg);
  }, [props, selectedLeg]);
  return (
    <>
      {props.legs && (
        <div className="legs-selector">
          <select
            name="leg-selector"
            value={selectedLeg.label}
            onChange={(e) => {
              const label = e.target.value;
              setSelectedLeg(props.legs.find((leg) => leg.label === label)!);
            }}
          >
            {props.legs.map((leg) => {
              return (
                <option key={leg.value} value={leg.label}>
                  {leg.label}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </>
  );
};

export default LegSelector;
