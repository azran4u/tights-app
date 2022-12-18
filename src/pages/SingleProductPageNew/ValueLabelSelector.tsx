import { useEffect, useState } from 'react';
import { ValueLabel } from '../../model';

interface ValueLabelSelectorProps<T> {
  values: T[];
  initialValue: T;
  selectedValue: (selected: T) => void;
}
const ValueLabelSelector = <T extends ValueLabel>(
  props: ValueLabelSelectorProps<T>
) => {
  const [selectedValue, setSelectedValue] = useState<T>(props.initialValue);

  useEffect(() => {
    props.selectedValue(selectedValue);
  }, [props, selectedValue]);

  const [selectOptionsGroupName] = useState<string>(
    `value-selector-${Math.random()}`
  );

  const name = `denier-selector ${Math.random()}`;
  return (
    <>
      {props.values && (
        <div className="values-selector">
          <select
            name={selectOptionsGroupName}
            value={selectedValue.label}
            onChange={(e) => {
              const label = e.target.value;
              const value = props.values.find(
                (value) => value.label === label
              )!;
              setSelectedValue(value);
            }}
          >
            {props.values.map((value) => {
              return (
                <option key={value.value} value={value.label}>
                  {value.label}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </>
  );
};

export default ValueLabelSelector;
