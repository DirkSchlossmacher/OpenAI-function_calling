import { NowRequest, NowResponse } from '@vercel/node';
import axios from 'axios';

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method === 'POST') {
    try {
      const { messages, functions, function_call } = req.body;

      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        { model: 'gpt-3.5-turbo-0613', messages, functions, function_call },
        { headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` } }
      );

      res.status(200).send(openaiResponse.data);
    } catch (error) {
      res.status(500).send({ error: 'Error communicating with OpenAI' });
    }
  } else {
    res.status(400).send({ error: 'Only POST requests are accepted' });
  }
};
