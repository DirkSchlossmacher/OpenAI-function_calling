import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FunctionForm } from '../components/FunctionForm';

const Home = () => {
  const methods = useForm({ defaultValues: { functions: [{ name: '', description: '', parameters: [] }] } });
  const { handleSubmit, control, register } = methods;

  const [apiResponse, setApiResponse] = useState(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [apiKey, setApiKey] = useState(localStorage.getItem("OPENAI_KEY") || "");

  const onSubmit = (data) => {
    // Submit the data to your /api/completions.ts function.
    // Remember to include the userPrompt and apiKey in your request.
    console.log(data);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
    localStorage.setItem("OPENAI_KEY", event.target.value);
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            type="text"
            value={userPrompt}
            onChange={(event) => setUserPrompt(event.target.value)}
            placeholder="Enter your user message"
          />
          <input 
            type="text"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your OpenAI API Key"
          />
          {/* Render FunctionForm components here for each function */}
          {methods.watch('functions').map((item, index) => (
            <FunctionForm key={item.id} nestIndex={index} control={control} register={register} />
          ))}
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
      {apiResponse && <div>{apiResponse}</div>}
    </div>
  );
};

export default Home;
