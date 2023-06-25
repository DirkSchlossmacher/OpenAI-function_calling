const FunctionForm = ({ func, updateFunc }) => {
  const [parameters, setParameters] = useState(func.parameters || []);

  const updateParameter = (index) => (updatedParam) => {
    const newParameters = [...parameters];
    newParameters[index] = updatedParam;
    setParameters(newParameters);
    updateFunc({ ...func, parameters: newParameters });
  };

  const addParameter = () => {
    setParameters([...parameters, { name: "", type: "", description: "" }]);
  };

  const removeParameter = (index) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Function Name"
        value={func.name}
        onChange={(e) => updateFunc({ ...func, name: e.target.value })}
      />
      <textarea
        placeholder="Function Description"
        value={func.description}
        onChange={(e) => updateFunc({ ...func, description: e.target.value })}
      />
      {/* Render ParameterForm components here for each parameter */}
      {parameters.map((param, index) => (
        <div key={index}>
          <ParameterForm
            param={param}
            updateParam={updateParameter(index)}
          />
          <button onClick={() => removeParameter(index)}>Remove this parameter</button>
        </div>
      ))}
      <button onClick={addParameter}>Add parameter</button>
    </div>
  );
};
