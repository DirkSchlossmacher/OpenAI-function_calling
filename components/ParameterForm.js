const ParameterForm = ({ param, updateParam }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Parameter Name"
        value={param.name}
        onChange={(e) => updateParam({ ...param, name: e.target.value })}
      />
      <select
        value={param.type}
        onChange={(e) => updateParam({ ...param, type: e.target.value })}
      >
        <option value="string">String</option>
        <option value="integer">Integer</option>
      </select>
      <input
        type="text"
        placeholder="Description"
        value={param.description}
        onChange={(e) => updateParam({ ...param, description: e.target.value })}
      />
    </div>
  );
};
