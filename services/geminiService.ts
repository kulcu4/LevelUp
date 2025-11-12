
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, FitnessPlan } from '../types';

const planSchema = {
  type: Type.OBJECT,
  properties: {
    workoutPlan: {
      type: Type.ARRAY,
      description: "A 7-day workout plan.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING, description: "Day of the week (e.g., Monday)." },
          focus: { type: Type.STRING, description: "Main muscle group or activity for the day (e.g., Upper Body Strength, Cardio)." },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sets: { type: Type.STRING, description: "e.g., 3-4" },
                reps: { type: Type.STRING, description: "e.g., 8-12" },
                rest: { type: Type.STRING, description: "e.g., 60s" },
                tips: { type: Type.STRING, description: "A brief tip for performing the exercise." }
              },
              required: ["name", "sets", "reps", "rest", "tips"]
            }
          }
        },
        required: ["day", "focus", "exercises"]
      }
    },
    mealPlan: {
      type: Type.ARRAY,
      description: "A 7-day meal plan.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING, description: "Day of the week (e.g., Monday)." },
          meals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "e.g., Breakfast, Lunch, Dinner, Snack" },
                description: { type: Type.STRING, description: "Example food items for the meal." },
                calories: { type: Type.STRING },
                macros: {
                  type: Type.OBJECT,
                  properties: {
                    protein: { type: Type.STRING },
                    carbs: { type: Type.STRING },
                    fat: { type: Type.STRING }
                  },
                  required: ["protein", "carbs", "fat"]
                }
              },
              required: ["name", "description", "calories", "macros"]
            }
          },
          dailyTotals: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.STRING },
              protein: { type: Type.STRING },
              carbs: { type: Type.STRING },
              fat: { type: Type.STRING }
            },
            required: ["calories", "protein", "carbs", "fat"]
          }
        },
        required: ["day", "meals", "dailyTotals"]
      }
    }
  },
  required: ["workoutPlan", "mealPlan"]
};


export const generateFitnessPlan = async (ai: GoogleGenAI, profile: UserProfile): Promise<FitnessPlan> => {
  const prompt = `
    Create a comprehensive, personalized 7-day fitness and diet plan for the following user.
    The plan should be detailed, realistic, and tailored to their specific profile and goals.

    User Profile:
    - Age: ${profile.age}
    - Weight: ${profile.weight} kg
    - Height: ${profile.height} cm
    - Gender: ${profile.gender}
    - Activity Level: ${profile.activityLevel}
    - Primary Goal: ${profile.goal}

    Instructions:
    1.  **Workout Plan:** Create a balanced 7-day workout schedule. Include a mix of strength training, cardio, and rest days. For each exercise, provide the name, number of sets, repetition range, rest time, and a brief, helpful tip.
    2.  **Meal Plan:** Create a 7-day meal plan with 3 main meals and 1-2 snacks per day. For each meal, provide a description, approximate calories, and macronutrient breakdown (protein, carbs, fat). Also, calculate and provide the total daily calories and macros for each day.
    3.  **Tone:** The tone should be encouraging, motivational, and easy to understand.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: planSchema,
        temperature: 0.7,
      }
    });

    const jsonText = response.text.trim();
    const plan = JSON.parse(jsonText);
    
    // Basic validation
    if (!plan.workoutPlan || !plan.mealPlan) {
        throw new Error("Invalid plan structure received from API.");
    }

    return plan as FitnessPlan;
  } catch (error) {
    console.error("Error generating fitness plan:", error);
    throw new Error("Failed to generate plan. The AI model may be temporarily unavailable or the request was invalid.");
  }
};
