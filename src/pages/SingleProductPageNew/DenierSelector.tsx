import { useEffect, useState } from 'react';
import { Denier } from '../../model';

interface DenierSelectorProps {
  deniers: Denier[];
  initialDenier: Denier;
  selectedDenier: (denier: Denier) => void;
}
const DenierSelector: React.FC<DenierSelectorProps> = (props) => {
  const [selectedDenier, setSelectedDenier] = useState<Denier>(
    props.initialDenier
  );

  useEffect(() => {
    props.selectedDenier(selectedDenier);
    console.log('DenierSelector change');
  }, [props, selectedDenier]);
  return (
    <>
      {props.deniers && (
        <div className="deniers-selector">
          <select
            name="denier-selector"
            value={selectedDenier.label}
            onChange={(e) => {
              const label = e.target.value;
              const denier = props.deniers.find(
                (denier) => denier.label === label
              )!;
                setSelectedDenier(denier);
            }}
          >
            {props.deniers.map((denier) => {
              return (
                <option key={denier.value} value={denier.label}>
                  {denier.label}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </>
  );
};

export default DenierSelector;
