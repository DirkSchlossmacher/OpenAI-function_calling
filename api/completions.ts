import { NowRequest, NowResponse } from '@vercel/node';
import fetch from 'node-fetch';
export default async (req: NowRequest, res: NowResponse) => {
  if (req.method === 'POST') {
    try {
      const { userPrompt, apiKey, functions } = req.body;

      // Log the incoming request data
      console.log('Incoming request data:', { userPrompt, apiKey, functions });

      const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userPrompt }
      ];

      const chatCompletionRequest = async (bail, attempt) => {
        console.log(`ChatCompletion request attempt: ${attempt}`);

        const payload = {
          model: 'gpt-3.5-turbo-0613',
          messages,
          functions,
        };

        // Log the payload being sent to OpenAI
        console.log('Payload to OpenAI:', payload);

        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(payload)
        });

        // ...

      };

      // ...

    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error communicating with OpenAI' });
    }
  } else {
    res.status(400).send({ error: 'Only POST requests are accepted' });
  }
};

