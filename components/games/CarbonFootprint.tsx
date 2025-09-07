"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Earth } from 'lucide-react';

interface CarbonFootprintProps {
  onEcoPointsEarned: (points: number) => void;
}

export const CarbonFootprint: React.FC<CarbonFootprintProps> = ({ onEcoPointsEarned }) => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-4">🌍 Carbon Footprint Simulator</CardTitle>
          <p className="text-blue-100 text-lg">
            Coming Soon! Track your lifestyle impact with an interactive eco-avatar.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-6xl mb-4">🚧</div>
            <p className="text-lg mb-4">This game is under development!</p>
            <p className="text-sm opacity-80">
              Calculate and visualize your environmental impact through real-world scenarios.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
