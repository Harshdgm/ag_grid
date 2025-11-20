export default function AgeFilterComponent({ model, onModelChange }) {
  const value = model == null ? "" : model.value;

  const onChange = (e) => {
    const newVal = e.target.value === "" ? null : Number(e.target.value);
    onModelChange({ value: newVal });
  };

  return (
    <div style={{ padding: '4px' }}>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder="Min age"
      />
    </div>
  );
}
