import React, { useMemo } from 'react';
import { UserProfile } from '../../types';
import Card from '../ui/Card';

interface PlannerFormProps {
  profile: UserProfile;
  onProfileChange: (field: keyof UserProfile, value: string | number) => void;
  onSubmit: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  maintenanceCalories: number;
}

const InputField: React.FC<{ label: string; type: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: keyof UserProfile; }> = ({ label, type, value, onChange, name }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input 
            id={name}
            name={name}
            type={type} 
            value={value} 
            onChange={onChange}
            className="w-full bg-base-300/70 border border-base-300 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
    </div>
);

const SelectField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode; name: keyof UserProfile; }> = ({ label, value, onChange, children, name }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select 
            id={name}
            name={name}
            value={value} 
            onChange={onChange}
            className="w-full bg-base-300/70 border border-base-300 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
        >
            {children}
        </select>
    </div>
);

const ProgressBar: React.FC<{step: number}> = ({ step }) => {
    const steps = ["BMI", "Details", "Lifestyle", "Review"];
    return (
        <div className="flex justify-between items-center mb-6">
            {steps.map((name, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${step > index ? 'bg-secondary text-white' : step === index + 1 ? 'bg-primary text-white' : 'bg-base-300 text-gray-400'}`}>
                            {step > index + 1 ? '✓' : index + 1}
                        </div>
                        <p className={`mt-2 text-xs ${step >= index + 1 ? 'text-white' : 'text-gray-500'}`}>{name}</p>
                    </div>
                    {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${step > index + 1 ? 'bg-secondary' : 'bg-base-300'}`}></div>}
                </React.Fragment>
            ))}
        </div>
    );
};


const PlannerForm: React.FC<PlannerFormProps> = ({ profile, onProfileChange, onSubmit, currentStep, setCurrentStep, maintenanceCalories }) => {
    const { weight, height, age, gender, activityLevel, goal, dietaryPreference } = profile;
    
    const bmi = useMemo(() => {
        if (weight > 0 && height > 0) {
            const heightInMeters = height / 100;
            return (weight / (heightInMeters * heightInMeters)).toFixed(1);
        }
        return '0.0';
    }, [weight, height]);

    const bmiCategory = useMemo(() => {
        const bmiValue = parseFloat(bmi);
        if (bmiValue < 18.5) return { text: "Underweight", color: "text-blue-400" };
        if (bmiValue < 25) return { text: "Healthy", color: "text-green-400" };
        if (bmiValue < 30) return { text: "Overweight", color: "text-yellow-400" };
        return { text: "Obese", color: "text-red-400" };
    }, [bmi]);
    
    const isStep1Valid = weight > 0 && height > 0;
    const isStep2Valid = age > 0;

  return (
    <Card className="p-6">
        <ProgressBar step={currentStep} />

        {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
                <h2 className="text-xl font-bold text-center text-white mb-4">Step 1: Calculate Your BMI</h2>
                <InputField name="weight" label="Weight (kg)" type="number" value={weight} onChange={(e) => onProfileChange('weight', parseInt(e.target.value, 10) || 0)} />
                <InputField name="height" label="Height (cm)" type="number" value={height} onChange={(e) => onProfileChange('height', parseInt(e.target.value, 10) || 0)} />
                {isStep1Valid && (
                    <div className="text-center p-4 bg-base-300/50 rounded-lg mt-4">
                        <p className="text-gray-300">Your BMI is</p>
                        <p className={`text-4xl font-bold ${bmiCategory.color}`}>{bmi}</p>
                        <p className={`font-semibold ${bmiCategory.color}`}>{bmiCategory.text}</p>
                    </div>
                )}
                 <div className="mt-6 text-right">
                    <button onClick={() => setCurrentStep(2)} disabled={!isStep1Valid} className="bg-primary text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50">Next</button>
                </div>
            </div>
        )}

        {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
                 <h2 className="text-xl font-bold text-center text-white mb-4">Step 2: Personal Details</h2>
                 <InputField name="age" label="Age" type="number" value={age} onChange={(e) => onProfileChange('age', parseInt(e.target.value, 10) || 0)} />
                 <SelectField name="gender" label="Gender" value={gender} onChange={(e) => onProfileChange('gender', e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </SelectField>
                <div className="mt-6 flex justify-between">
                    <button onClick={() => setCurrentStep(1)} className="bg-base-300 text-white font-bold py-2 px-6 rounded-lg">Back</button>
                    <button onClick={() => setCurrentStep(3)} disabled={!isStep2Valid} className="bg-primary text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50">Next</button>
                </div>
            </div>
        )}
        
        {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
                <h2 className="text-xl font-bold text-center text-white mb-4">Step 3: Lifestyle & Goals</h2>
                 <SelectField name="activityLevel" label="Activity Level" value={activityLevel} onChange={(e) => onProfileChange('activityLevel', e.target.value)}>
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Light (light exercise/sports 1-3 days/week)</option>
                    <option value="moderate">Moderate (moderate exercise/sports 3-5 days/week)</option>
                    <option value="active">Active (hard exercise/sports 6-7 days a week)</option>
                    <option value="very_active">Very Active (very hard exercise & physical job)</option>
                </SelectField>
                 <SelectField name="goal" label="Primary Goal" value={goal} onChange={(e) => onProfileChange('goal', e.target.value)}>
                    <option value="lose_weight">Lose Weight</option>
                    <option value="maintain_weight">Maintain Weight</option>
                    <option value="gain_muscle">Gain Muscle</option>
                    <option value="gain_strength">Gain Strength</option>
                </SelectField>
                <SelectField name="dietaryPreference" label="Dietary Preference" value={dietaryPreference} onChange={(e) => onProfileChange('dietaryPreference', e.target.value)}>
                    <option value="omnivore">Omnivore</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="keto">Keto</option>
                </SelectField>
                <div className="mt-6 flex justify-between">
                    <button onClick={() => setCurrentStep(2)} className="bg-base-300 text-white font-bold py-2 px-6 rounded-lg">Back</button>
                    <button onClick={() => setCurrentStep(4)} className="bg-primary text-white font-bold py-2 px-6 rounded-lg">Next</button>
                </div>
            </div>
        )}
        
        {currentStep === 4 && (
             <div className="space-y-4 animate-fadeIn">
                <h2 className="text-xl font-bold text-center text-white mb-4">Step 4: Review Your Details</h2>
                <div className="p-4 bg-base-300/50 rounded-lg space-y-2 text-gray-300">
                    <p><strong>BMI:</strong> {bmi} ({bmiCategory.text})</p>
                    <p><strong>Age:</strong> {age}</p>
                    <p><strong>Gender:</strong> <span className="capitalize">{gender}</span></p>
                    <p><strong>Activity:</strong> <span className="capitalize">{activityLevel.replace('_', ' ')}</span></p>
                    <p><strong>Goal:</strong> <span className="capitalize">{goal.replace('_', ' ')}</span></p>
                    <p><strong>Diet:</strong> <span className="capitalize">{dietaryPreference}</span></p>
                    <hr className="border-base-300 my-2" />
                    <p className="font-bold text-white">Est. Maintenance Calories: <span className="text-primary">{maintenanceCalories.toLocaleString()} kcal/day</span></p>
                </div>
                <div className="mt-6 flex justify-between">
                    <button onClick={() => setCurrentStep(3)} className="bg-base-300 text-white font-bold py-2 px-6 rounded-lg">Back</button>
                    <button onClick={onSubmit} className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105">Generate My Plan</button>
                </div>
            </div>
        )}
    </Card>
  );
};

export default PlannerForm;
