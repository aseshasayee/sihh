"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, ShoppingBag } from 'lucide-react';

interface PlasticFreeChallengeProps {
  onEcoPointsEarned: (points: number) => void;
}

export const PlasticFreeChallenge: React.FC<PlasticFreeChallengeProps> = ({ onEcoPointsEarned }) => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-500 to-blue-600 text-white overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-4">🛍️ Plastic-Free Challenge</CardTitle>
          <p className="text-green-100 text-lg">
            Coming Soon! Daily eco-choices quiz with streak rewards.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-6xl mb-4">🚧</div>
            <p className="text-lg mb-4">This game is under development!</p>
            <p className="text-sm opacity-80">
              Learn to make sustainable lifestyle decisions and reduce plastic waste in your daily life.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
