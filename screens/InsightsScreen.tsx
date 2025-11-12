
import React from 'react';
import Card from '../components/ui/Card';

const InsightsScreen: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white">Insights & Forecasts</h1>
        <p className="text-gray-400">Track your progress and see what's ahead.</p>
      </header>
      
      <Card>
        <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Coming Soon!</h2>
            <p className="text-gray-300">
                This section will feature detailed reports on your calories, macros, steps, sleep, and readiness.
                You'll also get AI-powered forecasts predicting your BMI, weight, and future progress.
            </p>
            <div className="mt-6 text-5xl text-primary animate-pulse">
                📊
            </div>
        </div>
      </Card>
    </div>
  );
};

export default InsightsScreen;
