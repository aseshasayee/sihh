"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Target } from 'lucide-react';

interface EcoQuestProps {
  onEcoPointsEarned: (points: number) => void;
}

export const EcoQuest: React.FC<EcoQuestProps> = ({ onEcoPointsEarned }) => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-4">🎯 EcoQuest Missions</CardTitle>
          <p className="text-purple-100 text-lg">
            Coming Soon! Complete environmental puzzles and quizzes to earn power-ups.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-6xl mb-4">🚧</div>
            <p className="text-lg mb-4">This game is under development!</p>
            <p className="text-sm opacity-80">
              Embark on educational missions and solve environmental challenges.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
