import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FunctionForm } from '../components/FunctionForm';

const Home = () => {
  const methods = useForm({ defaultValues: { functions: [{ name: '', description: '', parameters: [] }] } });
  const { handleSubmit, control, register } = methods;

  const onSubmit = (data) => {
    // submit the data to your /api/completions.ts function.
    // For instance, you might use fetch or axios here to send a POST request.
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Render FunctionForm components here for each function */}
          {methods.watch('functions').map((item, index) => (
            <FunctionForm key={item.id} nestIndex={index} control={control} register={register} />
          ))}
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Home;
