const router = require('express').Router();
const Plant = require('../models/Plant');
const { GoogleGenAI } = require('@google/genai');

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })
  : null;


/* =========================================================
   LOCAL / DEMO AI
   Used automatically if Gemini is unavailable
========================================================= */

function localAI(message, plantName, cart, catalog) {
  const text = String(message).toLowerCase().trim();

  // LOW LIGHT
  if (
    text.includes('low light') ||
    text.includes('little light') ||
    text.includes('dark room')
  ) {
    const plants = catalog
      .filter(p =>
        String(p.light || '')
          .toLowerCase()
          .includes('low')
      )
      .slice(0, 3);

    if (plants.length) {
      return `🌿 For a low-light room, I recommend ${plants
        .map(p => p.name)
        .join(', ')}. These plants are suitable for spaces with limited sunlight.`;
    }

    return '🌿 For a low-light room, I recommend Snake Plant, ZZ Plant, and Chinese Evergreen.';
  }


  // WATERING
  if (
    text.includes('water') ||
    text.includes('watering') ||
    text.includes('how often')
  ) {
    if (plantName) {
      const plant = catalog.find(
        p =>
          String(p.name).toLowerCase() ===
          String(plantName).toLowerCase()
      );

      if (plant) {
        return `💧 For ${plant.name}, ${
          plant.water ||
          'water when the top layer of soil becomes dry'
        }. Avoid overwatering and make sure the pot has proper drainage.`;
      }
    }

    return '💧 Water your plant according to its type and soil moisture. Avoid overwatering. Succulents and cacti usually need less frequent watering than tropical plants.';
  }


  // SUNLIGHT
  if (
    text.includes('light') ||
    text.includes('sun') ||
    text.includes('sunlight')
  ) {
    if (plantName) {
      const plant = catalog.find(
        p =>
          String(p.name).toLowerCase() ===
          String(plantName).toLowerCase()
      );

      if (plant) {
        return `☀️ ${plant.name} generally prefers ${
          plant.light || 'bright or indirect light'
        }. Avoid sudden exposure to very strong direct sunlight.`;
      }
    }

    return '☀️ Most indoor plants prefer bright, indirect light. Snake Plant and ZZ Plant can also tolerate lower-light conditions.';
  }


  // SOIL
  if (
    text.includes('soil') ||
    text.includes('potting') ||
    text.includes('pot')
  ) {
    return '🪴 Use well-draining soil and a pot with drainage holes. For succulents and cacti, use a soil mix that drains water quickly.';
  }


  // BEGINNER
  if (
    text.includes('beginner') ||
    text.includes('easy plant') ||
    text.includes('easy care')
  ) {
    const plants = catalog
      .filter(p =>
        String(p.difficulty || '')
          .toLowerCase()
          .includes('easy')
      )
      .slice(0, 3);

    if (plants.length) {
      return `🌱 Great choices for beginners are ${plants
        .map(p => p.name)
        .join(', ')}. They are relatively easy to maintain.`;
    }

    return '🌱 Great beginner choices include Snake Plant, ZZ Plant, Aloe Vera, and Cactus.';
  }


  // SUCCULENTS
  if (
    text.includes('succulent') ||
    text.includes('cactus')
  ) {
    const plants = catalog
      .filter(p =>
        ['succulent', 'cactus'].includes(
          String(p.category || '').toLowerCase()
        )
      )
      .slice(0, 3);

    if (plants.length) {
      return `🌵 Some good choices are ${plants
        .map(p => p.name)
        .join(', ')}. These plants generally prefer bright light and less frequent watering.`;
    }

    return '🌵 Aloe Vera, Cactus, Echeveria, and Jade Plant are popular low-water choices.';
  }


  // FLOWERS
  if (
    text.includes('flower') ||
    text.includes('flowering') ||
    text.includes('colorful')
  ) {
    const plants = catalog
      .filter(p =>
        String(p.category || '')
          .toLowerCase()
          .includes('flower')
      )
      .slice(0, 3);

    if (plants.length) {
      return `🌸 You can consider ${plants
        .map(p => p.name)
        .join(', ')} for a flowering plant.`;
    }

    return '🌸 You can consider Rose, Hibiscus, Orchid, Jasmine, or Peace Lily.';
  }


  // CART / SHOPPING
  if (
    text.includes('cart') ||
    text.includes('shopping') ||
    text.includes('buy') ||
    text.includes('recommend') ||
    text.includes('suggest')
  ) {
    if (cart && cart.length > 0) {
      const cartNames = cart
        .map(item => item.name)
        .filter(Boolean)
        .join(', ');

      const suggestions = catalog
        .filter(
          p =>
            !cart.some(
              item =>
                (item._id || item.id) ===
                (p._id || p.id)
            )
        )
        .slice(0, 3);

      if (suggestions.length) {
        return `🛒 You currently have ${cartNames} in your cart. You could also consider ${suggestions
          .map(p => p.name)
          .join(', ')}.`;
      }

      return `🛒 You currently have ${cartNames} in your cart. I can help you choose another plant based on light, care level, or budget.`;
    }

    return '🌿 Tell me what you are looking for, such as a low-light plant, flowering plant, beginner-friendly plant, or a plant within a specific BDT budget.';
  }


  // PRICE / BUDGET
  if (
    text.includes('price') ||
    text.includes('cost') ||
    text.includes('cheap') ||
    text.includes('budget') ||
    text.includes('bdt')
  ) {
    const plants = catalog
      .filter(p => Number(p.price) <= 1000)
      .slice(0, 3);

    if (plants.length) {
      return `💰 Some options under BDT 1,000 include ${plants
        .map(p => `${p.name} (BDT ${p.price})`)
        .join(', ')}.`;
    }

    return '💰 Tell me your budget in BDT and I can suggest suitable plants.';
  }


  // GREETING
  if (
    text === 'hi' ||
    text === 'hello' ||
    text === 'hey'
  ) {
    return '🌿 Hi! I am GreenLeaf AI. Ask me about watering, sunlight, soil, plant care, or which plant would suit your home.';
  }


  // DEFAULT
  return `🌿 I'm GreenLeaf AI!

I can help you with:

💧 Watering
☀️ Sunlight
🪴 Soil and pots
🌱 Beginner-friendly plants
🌵 Succulents
🌸 Flowering plants
💰 Plants by BDT budget
🛒 Shopping recommendations

Try asking:
"Which plant is good for low light?"`;
}


/* =========================================================
   CHAT
========================================================= */

router.post('/chat', async (req, res) => {
  const {
    message,
    plantName,
    cart = []
  } = req.body || {};

  if (!message || !String(message).trim()) {
    return res.status(400).json({
      message: 'Please enter a question.',
    });
  }

  try {
    const catalog = await Plant.find({})
      .select(
        'name category price light water difficulty height bestFor temperature petSafety description'
      )
      .lean();


    /* =====================================================
       TRY GEMINI FIRST
    ===================================================== */

    if (ai) {
      try {
        const prompt = `
You are GreenLeaf AI, a friendly plant-care assistant for GreenLeaf BD,
a plant shopping application in Bangladesh.

Give simple, friendly and practical answers.

You can help with:
- Plant care
- Watering
- Sunlight
- Soil
- Indoor and outdoor plants
- Beginner plants
- Plant recommendations
- Shopping recommendations
- Budget-based recommendations

Use BDT when discussing prices.

IMPORTANT:
Only recommend plants that exist in the catalog.
Do not invent products or prices.

Current plant:
${plantName || 'None'}

Customer cart:
${JSON.stringify(cart)}

Available plant catalog:
${JSON.stringify(catalog)}

Customer question:
${String(message).trim()}

If the user asks for recommendations:
- Recommend up to 3 catalog plants.
- Explain briefly why each plant is suitable.

If the user asks about care:
- Give clear practical steps.
- Keep the answer easy to understand.

Answer as GreenLeaf AI.
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const answer = response.text;

        if (answer && answer.trim()) {
          return res.json({
            source: 'gemini',
            answer: answer.trim(),
          });
        }

        throw new Error('Gemini returned an empty response.');

      } catch (geminiError) {

        console.log(
          'Gemini unavailable. Using GreenLeaf local AI instead.'
        );

        console.log(
          'Gemini error:',
          geminiError.message
        );
      }
    }


    /* =====================================================
       FALLBACK TO LOCAL AI
    ===================================================== */

    const fallbackAnswer = localAI(
      message,
      plantName,
      cart,
      catalog
    );

    return res.json({
      source: 'local-ai',
      answer: fallbackAnswer,
    });

  } catch (error) {

    console.error(
      'GreenLeaf AI error:',
      error.message
    );

    return res.status(500).json({
      message: 'GreenLeaf AI could not process your request.',
    });
  }
});


/* =========================================================
   RECOMMENDATIONS
========================================================= */

router.post('/recommend', async (req, res) => {
  try {
    const {
      goal,
      light,
      budget
    } = req.body || {};

    const plants = await Plant.find({
      ...(budget
        ? {
            price: {
              $lte: Number(budget)
            }
          }
        : {}),
    })
      .limit(40)
      .lean();


    /* =====================================================
       TRY GEMINI RECOMMENDATION
    ===================================================== */

    if (ai) {
      try {
        const prompt = `
You are GreenLeaf AI.

Recommend up to 3 plants from this catalog.

Customer goal:
${goal || 'General home plant'}

Lighting:
${light || 'Unknown'}

Budget:
${budget ? `BDT ${budget}` : 'Not specified'}

Plant catalog:
${JSON.stringify(plants)}

Only recommend plants that exist in the catalog.

Return only the exact plant names separated by commas.
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const text = response.text || '';

        const names = text
          .split(',')
          .map(name => name.trim())
          .filter(Boolean);

        const recommendations = plants
          .filter(plant =>
            names.some(
              name =>
                name.toLowerCase() ===
                plant.name.toLowerCase()
            )
          )
          .slice(0, 3);

        if (recommendations.length) {
          return res.json({
            source: 'gemini',
            recommendations,
          });
        }

      } catch (geminiError) {

        console.log(
          'Gemini recommendation unavailable. Using local recommendation.'
        );

        console.log(
          'Gemini error:',
          geminiError.message
        );
      }
    }


    /* =====================================================
       LOCAL RECOMMENDATION FALLBACK
    ===================================================== */

    let recommendations = plants.filter(p => {

      const lightMatch =
        !light ||
        String(p.light || '')
          .toLowerCase()
          .includes(String(light).toLowerCase());

      const goalMatch =
        !goal ||
        String(p.bestFor || '')
          .toLowerCase()
          .includes(String(goal).toLowerCase()) ||
        String(p.category || '')
          .toLowerCase()
          .includes(String(goal).toLowerCase());

      return lightMatch && goalMatch;

    }).slice(0, 3);


    if (!recommendations.length) {
      recommendations = plants.slice(0, 3);
    }

    return res.json({
      source: 'local-ai',
      recommendations,
    });

  } catch (error) {

    console.error(
      'Recommendation error:',
      error.message
    );

    return res.status(500).json({
      message: 'Could not generate recommendations.',
    });
  }
});


module.exports = router;