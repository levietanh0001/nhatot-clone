

const ColumnFilter = ({ column }) => {
  
  const { filterValue, setFilter } = column;

  return (
    <span>
      <input
        style={{ marginTop: '10px', padding: 5 }}
        value={filterValue || ''}
        onChange={(e) => setFilter(e.currentTarget.value)}
        placeholder='Search'
      />
    </span>
  );
};

export default ColumnFilter;
