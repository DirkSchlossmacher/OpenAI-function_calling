import { NowRequest, NowResponse } from '@vercel/node';
import fetch from 'node-fetch';

// ...other code here...

export default async (req: NowRequest, res: NowResponse) => {
  // ...other code here...

  if (req.method === 'POST') {
    try {
      // ...other code here...

      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ model: 'gpt-3.5-turbo-0613', messages, functions })
      });

      const openaiData = await openaiResponse.json();

      // check if the assistant's response includes a function call
      if (openaiData.choices[0].message.function_call) {
        // ...other code here...
      }

      res.status(200).send(openaiData);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error communicating with OpenAI' });
    }
  } else {
    res.status(400).send({ error: 'Only POST requests are accepted' });
  }
};
