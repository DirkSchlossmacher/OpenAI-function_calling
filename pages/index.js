import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FunctionForm } from '../components/FunctionForm';

import axios from 'axios';


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
    const { functions } = data;
    
    // This logs the list of functions with their parameters, which are submitted with the form.
    // Each function is an object with 'name', 'description', and 'parameters' fields.
    functions.forEach((func, index) => {
      console.log(`Function ${index + 1}:`);
      console.log(`Name: ${func.name}`);
      console.log(`Description: ${func.description}`);
      console.log('Parameters:');
      func.parameters.forEach((param, paramIndex) => {
        console.log(`Parameter ${paramIndex + 1}: ${param}`);
      });
    });
  
    // Here you can make API calls or other processing with the data.
    // For example:
    axios.post('/api/completions', {
      userPrompt: userPrompt, // assuming userPrompt is in the state
      apiKey: apiKey, // assuming apiKey is in the state
      functions: functions
    })
    .then((response) => {
      // Handle response
      setApiResponse(response.data); // assuming setApiResponse is a function that updates the state
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  }

  const handleUserPromptChange = (event) => {
    setUserPrompt(event.target.value);
  }

  const [functions, setFunctions] = useState([{ name: '', description: '', parameters: [] }]);

  const addFunction = () => {
    setFunctions([...functions, { name: '', description: '', parameters: [] }]);
  };
  
  const removeFunction = (index) => {
    setFunctions(functions.filter((_, i) => i !== index));
  };


  
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            type="textarea"
            value={userPrompt}
            onChange={handleUserPromptChange}
            placeholder="Enter your user message"
          />
          <label 
            value="API Key"
          />
          <input 
            type="text"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your OpenAI API Key"
          />
          {/* Render FunctionForm components here for each function */}
          {functions.map((func, index) => (
            <div key={index}>
              <FunctionForm 
                func={func} 
                updateFunc={(updatedFunc) => {
                  const newFunctions = [...functions];
                  newFunctions[index] = updatedFunc;
                  setFunctions(newFunctions);
                }}
              />
              <button onClick={() => removeFunction(index)}>Remove this function</button>
            </div>
          ))}
          <button onClick={addFunction}>Add function</button>
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
