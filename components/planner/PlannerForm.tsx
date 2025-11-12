import React from 'react';
import { UserProfile } from '../../types';
import Card from '../ui/Card';

interface PlannerFormProps {
  profile: UserProfile;
  onProfileChange: (field: keyof UserProfile, value: string | number) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{ label: string; type: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, type, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input 
            type={type} 
            value={value} 
            onChange={onChange}
            className="w-full bg-base-300/70 border border-base-300 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
    </div>
);

const SelectField: React.FC<{ label:string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }> = ({ label, value, onChange, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select 
            value={value} 
            onChange={onChange}
            className="w-full bg-base-300/70 border border-base-300 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
        >
            {children}
        </select>
    </div>
);


const PlannerForm: React.FC<PlannerFormProps> = ({ profile, onProfileChange, onSubmit, isLoading }) => {
  return (
    <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
                label="Age" 
                type="number"
                value={profile.age} 
                onChange={(e) => onProfileChange('age', parseInt(e.target.value, 10) || 0)} 
            />
            <InputField 
                label="Weight (kg)" 
                type="number"
                value={profile.weight} 
                onChange={(e) => onProfileChange('weight', parseInt(e.target.value, 10) || 0)} 
            />
            <InputField 
                label="Height (cm)" 
                type="number"
                value={profile.height} 
                onChange={(e) => onProfileChange('height', parseInt(e.target.value, 10) || 0)} 
            />
            <SelectField 
                label="Gender" 
                value={profile.gender}
                onChange={(e) => onProfileChange('gender', e.target.value)}
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </SelectField>
             <SelectField 
                label="Activity Level" 
                value={profile.activityLevel}
                onChange={(e) => onProfileChange('activityLevel', e.target.value)}
            >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (light exercise/sports 1-3 days/week)</option>
                <option value="moderate">Moderate (moderate exercise/sports 3-5 days/week)</option>
                <option value="active">Active (hard exercise/sports 6-7 days a week)</option>
                <option value="very_active">Very Active (very hard exercise/sports & physical job)</option>
            </SelectField>
             <SelectField 
                label="Goal" 
                value={profile.goal}
                onChange={(e) => onProfileChange('goal', e.target.value)}
            >
                <option value="lose_weight">Lose Weight</option>
                <option value="maintain_weight">Maintain Weight</option>
                <option value="gain_muscle">Gain Muscle</option>
            </SelectField>
        </div>
        <div className="mt-8 text-center">
            <button 
                onClick={onSubmit} 
                disabled={isLoading}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-primary text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Generating...' : 'Generate My Plan'}
            </button>
        </div>
    </Card>
  );
};

export default PlannerForm;