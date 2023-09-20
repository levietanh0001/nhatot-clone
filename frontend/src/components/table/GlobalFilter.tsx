import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export const GlobalFilter = (props) => {
  const {
    filter,
    setFilter,

    className,
  } = props;

  const [value, setValue] = useState(filter);

  // prevent setFilter from executing on every change
  const handleInputChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 300); // 1s delay between each change

  return (
    <div className={className} style={{ textAlign: 'right' }}>
      <input
        placeholder='Search in every column'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          handleInputChange(e.target.value);
        }}
      />
    </div>
  );
};

export default GlobalFilter;
