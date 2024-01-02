const Filter = ({ text, value, onChange }) => (
    <div>
        {text} <input value={value} onChange={onChange} />
    </div>
)
export default Filter;