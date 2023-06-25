import { NowRequest, NowResponse } from '@vercel/node';
import axios from 'axios';

// Map of functions
const functionMap = {
  get_current_weather: async (args) => {
    // Implementation of get_current_weather
    // This is just a placeholder. You'll replace it with the actual implementation.
  },
  another_function: async (args) => {
    // Implementation of another_function
  },
  // Add more functions as needed
};

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method === 'POST') {
    console.log(`Received POST request`); // Log here to check if POST request is received
    try {
      const { userPrompt, apiKey, functions } = req.body;

      const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userPrompt }
      ];

      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        { model: 'gpt-3.5-turbo-0613', messages, functions },
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      
      // check if the assistant's response includes a function call
      if (openaiResponse.data.choices[0].message.function_call) {
        const functionCall = openaiResponse.data.choices[0].message.function_call;

        // call the relevant function based on the function's name
        if (functionMap[functionCall.name]) {
          const result = await functionMap[functionCall.name](functionCall.arguments);

          // Add the result of the function call to the response
          openaiResponse.data.choices[0].message.function_result = result;
        }
      }

      res.status(200).send(openaiResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error communicating with OpenAI' });
    }
  } else {
    res.status(400).send({ error: 'Only POST requests are accepted' });
  }
};
