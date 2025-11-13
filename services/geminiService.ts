import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, FitnessPlan, DailyLog } from '../types';

const initialPlanSchema = {
  type: Type.OBJECT,
  properties: {
    workoutPlan: {
      type: Type.ARRAY,
      description: "Workout plan for the first day.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING, description: "Day of the week (e.g., Monday)." },
          focus: { type: Type.STRING, description: "Main muscle group or activity." },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { name: { type: Type.STRING }, sets: { type: Type.STRING }, reps: { type: Type.STRING }, rest: { type: Type.STRING }, tips: { type: Type.STRING } },
              required: ["name", "sets", "reps", "rest", "tips"]
            }
          }
        },
        required: ["day", "focus", "exercises"]
      }
    },
    mealPlan: {
      type: Type.ARRAY,
      description: "Meal plan for the first day.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING, description: "Day of the week (e.g., Monday)." },
          meals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING }, description: { type: Type.STRING }, calories: { type: Type.STRING },
                macros: { type: Type.OBJECT, properties: { protein: { type: Type.STRING }, carbs: { type: Type.STRING }, fat: { type: Type.STRING } }, required: ["protein", "carbs", "fat"] }
              },
              required: ["name", "description", "calories", "macros"]
            }
          },
          dailyTotals: {
            type: Type.OBJECT,
            properties: { calories: { type: Type.STRING }, protein: { type: Type.STRING }, carbs: { type: Type.STRING }, fat: { type: Type.STRING } },
            required: ["calories", "protein", "carbs", "fat"]
          }
        },
        required: ["day", "meals", "dailyTotals"]
      }
    }
  },
  required: ["workoutPlan", "mealPlan"]
};

const remainingPlanSchema = {
    type: Type.OBJECT,
    properties: {
      workoutPlan: {
        type: Type.ARRAY,
        description: "Workout plan for the remaining 6 days of the week.",
        items: initialPlanSchema.properties.workoutPlan.items
      },
      mealPlan: {
        type: Type.ARRAY,
        description: "Meal plan for the remaining 6 days of the week.",
        items: initialPlanSchema.properties.mealPlan.items
      }
    },
    required: ["workoutPlan", "mealPlan"]
};

const commonPromptDetails = (profile: UserProfile, maintenanceCalories: number) => `
    User Profile:
    - Age: ${profile.age}
    - Weight: ${profile.weight} kg
    - Height: ${profile.height} cm
    - Gender: ${profile.gender}
    - Activity Level: ${profile.activityLevel}
    - Primary Goal: ${profile.goal}
    - Dietary Preference: ${profile.dietaryPreference}
    - Estimated Daily Maintenance Calories: ${maintenanceCalories} kcal

    Instructions for Calorie Targets:
    - If goal is 'lose_weight', target a 300-500 kcal deficit from maintenance.
    - If goal is 'gain_muscle', target a 300-500 kcal surplus with high protein.
    - If goal is 'maintain_weight' or 'gain_strength', stick close to the maintenance calories.
    - The entire meal plan MUST adhere to their dietary preference (${profile.dietaryPreference}).

    For each exercise, provide: name, sets, reps, rest time, and a helpful tip.
    For each meal, provide: name, description, calories, and macros (protein, carbs, fat). Also include daily totals.
    The tone should be encouraging, motivational, and easy to understand.
`;

export const generateInitialPlan = async (ai: GoogleGenAI, profile: UserProfile, maintenanceCalories: number): Promise<FitnessPlan> => {
  const prompt = `
    Create just the first day (e.g., Monday) of a personalized 7-day fitness and diet plan for the following user.
    This first day should be a complete plan for that single day.
    ${commonPromptDetails(profile, maintenanceCalories)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: initialPlanSchema,
        temperature: 0.7,
      }
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as FitnessPlan;
  } catch (error) {
    console.error("Error generating initial plan:", error);
    throw new Error("Failed to generate the initial plan.");
  }
};


export const generateRemainingPlan = async (ai: GoogleGenAI, profile: UserProfile, maintenanceCalories: number, initialPlan: FitnessPlan): Promise<FitnessPlan> => {
  const prompt = `
    You have already created Day 1 of a fitness and meal plan for a user. Here is the data for Day 1:
    ${JSON.stringify(initialPlan, null, 2)}
    
    Now, create the remaining 6 days of the workout and meal plan (e.g., Tuesday through Sunday) to complete the 7-day schedule.
    Ensure the new days are consistent with the user's goals and follow the same structure and tone as Day 1.
    ${commonPromptDetails(profile, maintenanceCalories)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: remainingPlanSchema,
        temperature: 0.7,
      }
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as FitnessPlan;
  } catch (error) {
    console.error("Error generating remaining plan:", error);
    throw new Error("Failed to generate the rest of the plan.");
  }
};

const nutritionSchema = {
    type: Type.OBJECT,
    properties: {
        calories: { type: Type.NUMBER },
        protein: { type: Type.NUMBER },
        carbs: { type: Type.NUMBER },
        fat: { type: Type.NUMBER }
    },
    required: ["calories", "protein", "carbs", "fat"]
};

export const getNutritionalInfoForFood = async (ai: GoogleGenAI, foodName: string): Promise<{ calories: number; protein: number; carbs: number; fat: number; }> => {
    const prompt = `Provide the nutritional information (calories, protein, carbs, and fat) for a standard serving of "${foodName}". Provide numbers only.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: nutritionSchema
            }
        });
        const data = JSON.parse(response.text.trim());
        return data;
    } catch(e) {
        console.error("Error fetching nutritional data:", e);
        throw new Error("Could not fetch nutritional information for the specified food.");
    }
}


export const generateProgressForecast = async (ai: GoogleGenAI, log: DailyLog): Promise<string> => {
    const prompt = `
        Based on the following user data for today, create a simple, encouraging forecast for their weight and BMI in 30 days if they continue with this level of activity and diet.
        - Today's Calorie Intake: ${log.calories} kcal
        - Today's Protein Intake: ${log.protein} g
        - Today's Steps: ${log.steps}
        - Current Weight: ${log.weight} kg
        
        Keep the response brief and present it as a simple text report. Start with a prediction for weight, then BMI. Add a small encouraging tip at the end.
    `;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch(e) {
        console.error("Error generating forecast:", e);
        throw new Error("Failed to generate forecast.");
    }
}