import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FunctionForm } from '../components/FunctionForm';

// New Hook for managing localStorage
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

const Home = () => {
  const initialFormState = { functions: [{ name: '', description: '', parameters: [] }] };
  const methods = useForm({ defaultValues: initialFormState });
  const { handleSubmit, control, register } = methods;

  const [apiResponse, setApiResponse] = useLocalStorage('apiResponse', null);
  const [userPrompt, setUserPrompt] = useLocalStorage('userPrompt', "");
  const [apiKey, setApiKey] = useLocalStorage('OPENAI_KEY', "");

  const onSubmit = (data) => {
    // Submit the data to your /api/completions.ts function.
    // Remember to include the userPrompt and apiKey in your request.
    console.log(data);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  }

  const handleUserPromptChange = (event) => {
    setUserPrompt(event.target.value);
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            type="text"
            value={userPrompt}
            onChange={handleUserPromptChange}
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
