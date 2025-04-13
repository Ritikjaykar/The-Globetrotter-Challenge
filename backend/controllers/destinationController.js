// backend/controllers/destinationController.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // your DeepSeek key
  baseURL: 'https://api.deepseek.com/v1', // DeepSeek's endpoint
});

export const getAIDestinations = async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful travel assistant who provides game-friendly destination data.',
        },
        {
          role: 'user',
          content: `Give me a JSON array of 3 travel destinations. For each, include:
- name (e.g., "Paris, France")
- 2 clues
- 1 fun fact

Format:
{
  "destinations": [
    {
      "name": "...",
      "clues": ["...", "..."],
      "funFacts": ["..."]
    }
  ]
}`,
        },
      ],
      temperature: 0.7,
    });

    const data = JSON.parse(response.choices[0].message.content);
    res.status(200).json({ destinations: data.destinations });
  } catch (error) {
    console.error('AI generation failed:', error.message);

    // Fallback mock data
    res.status(200).json({
      destinations: [
        {
          name: 'London, UK',
          clues: ['Big Ben watches over this rainy city', 'Home to the red double-decker bus'],
          funFacts: ['Over 300 languages are spoken in this city'],
        },
        {
          name: 'Cairo, Egypt',
          clues: ['A river runs through it – and pyramids rise nearby', 'Land of the Pharaohs'],
          funFacts: ['The only remaining ancient wonder is here'],
        },
        {
          name: 'New York, USA',
          clues: ['The city that never sleeps', 'Home to Times Square and Central Park'],
          funFacts: ['Over 800 languages are spoken in NYC'],
        },
      ],
    });
  }
};
