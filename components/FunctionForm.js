import { useFieldArray, Controller } from 'react-hook-form';

export const FunctionForm = ({ control, register, nestIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `functions[${nestIndex}].parameters`,
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex">
          <input {...register(`functions[${nestIndex}].parameters[${index}].name`)} placeholder="Parameter name" className="border-2 border-gray-200 m-2 p-2 rounded-lg" />
          <select {...register(`functions[${nestIndex}].parameters[${index}].type`)} className="border-2 border-gray-200 m-2 p-2 rounded-lg">
            <option value="">Select type</option>
            <option value="string">String</option>
            <option value="number">Number</option>
            {/* Add as many options as needed */}
          </select>
          <button type="button" onClick={() => remove(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '', type: '' })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Parameter</button>
    </div>
  );
};
