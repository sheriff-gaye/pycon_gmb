/**
 * Blog Translation Service using Google Gemini API
 * Free tier: 1,500 requests/day, 60 requests/minute
 */

interface TranslationResult {
  success: boolean;
  translatedText?: string;
  error?: string;
}

interface BlogTranslations {
  title_fr?: string;
  excerpt_fr?: string;
  content_fr?: string;
  authorBio_fr?: string;
}

/**
 * Translate text from English to French using Google Gemini API
 */
async function translateToFrench(text: string, context: string = ''): Promise<TranslationResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in environment variables');
    return {
      success: false,
      error: 'API key not configured'
    };
  }

  if (!text || text.trim().length === 0) {
    return {
      success: true,
      translatedText: ''
    };
  }

  try {
    const prompt = `You are a professional translator specializing in technical and blog content for a Senegambian audience (Gambia and Senegal). 

Translate the following ${context} from English to French. The content is for PyCon Senegambia, a Python conference.

Requirements:
- Maintain technical accuracy
- Keep the same tone and style
- Preserve HTML tags if present
- Keep proper nouns and brand names unchanged
- Use French that resonates with West African audiences
- DO NOT add any explanations or notes, ONLY return the translated text

Text to translate:
${text}

Translation:`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      return {
        success: false,
        error: `API error: ${response.status}`
      };
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      console.error('No translation candidates returned from Gemini');
      return {
        success: false,
        error: 'No translation generated'
      };
    }

    const translatedText = data.candidates[0].content.parts[0].text.trim();
    
    return {
      success: true,
      translatedText
    };

  } catch (error) {
    console.error('Translation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Translate all blog post fields to French
 */
export async function translateBlogPost(data: {
  title: string;
  excerpt?: string | null;
  content: string;
  authorBio?: string | null;
}): Promise<BlogTranslations> {
  const translations: BlogTranslations = {};

  // Translate title
  if (data.title) {
    const titleResult = await translateToFrench(data.title, 'blog post title');
    if (titleResult.success && titleResult.translatedText) {
      translations.title_fr = titleResult.translatedText;
    }
  }

  // Translate excerpt
  if (data.excerpt) {
    const excerptResult = await translateToFrench(data.excerpt, 'blog post excerpt');
    if (excerptResult.success && excerptResult.translatedText) {
      translations.excerpt_fr = excerptResult.translatedText;
    }
  }

  // Translate content
  if (data.content) {
    const contentResult = await translateToFrench(data.content, 'blog post content');
    if (contentResult.success && contentResult.translatedText) {
      translations.content_fr = contentResult.translatedText;
    }
  }

  // Translate author bio
  if (data.authorBio) {
    const bioResult = await translateToFrench(data.authorBio, 'author biography');
    if (bioResult.success && bioResult.translatedText) {
      translations.authorBio_fr = bioResult.translatedText;
    }
  }

  return translations;
}
