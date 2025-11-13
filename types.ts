

export type Tab = 'home' | 'planner' | 'insights' | 'me' | 'log_meal' | 'music';

export interface UserProfile {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose_weight' | 'maintain_weight' | 'gain_muscle' | 'gain_strength';
  dietaryPreference: 'omnivore' | 'vegetarian' | 'vegan' | 'keto' | 'pescetarian';
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  tips: string;
}

export interface DailyWorkout {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface Meal {
  name: string;
  description: string;
  calories: string;
  macros: {
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface DailyMealPlan {
    day: string;
    meals: Meal[];
    dailyTotals: {
        calories: string;
        protein: string;
        carbs: string;
        fat: string;
    };
}

export interface FitnessPlan {
  workoutPlan: DailyWorkout[];
  mealPlan: DailyMealPlan[];
}

export interface Song {
    title: string;
    artist: string;
    duration?: string;
}

export interface LoggedMeal {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export interface DailyLog {
    calories: number;
    protein: number;
    steps: number;
    weight: number;
    sleep: string;
    meals: LoggedMeal[];
    caloriesGoal?: number;
    proteinGoal?: number;
    maintenanceCalories?: number;
    caloriesBurned: number;
    workoutsCompleted: string[];
    isTrackingSteps: boolean;
    isTrackingSleep: boolean;
    sleepStartTime: number | null;
}