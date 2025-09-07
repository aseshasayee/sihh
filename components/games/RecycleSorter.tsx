"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Recycle, Leaf, Zap, Award, RotateCcw, Play, Trophy } from 'lucide-react';

interface WasteItem {
  id: string;
  name: string;
  type: 'organic' | 'plastic' | 'paper' | 'electronic';
  emoji: string;
}

interface RecycleBin {
  type: 'organic' | 'plastic' | 'paper' | 'electronic';
  name: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

const wasteItems: WasteItem[] = [
  { id: '1', name: 'Apple Core', type: 'organic', emoji: '🍎' },
  { id: '2', name: 'Plastic Bottle', type: 'plastic', emoji: '🍼' },
  { id: '3', name: 'Newspaper', type: 'paper', emoji: '📰' },
  { id: '4', name: 'Old Phone', type: 'electronic', emoji: '📱' },
  { id: '5', name: 'Banana Peel', type: 'organic', emoji: '🍌' },
  { id: '6', name: 'Plastic Bag', type: 'plastic', emoji: '🛍️' },
  { id: '7', name: 'Cardboard Box', type: 'paper', emoji: '📦' },
  { id: '8', name: 'Battery', type: 'electronic', emoji: '🔋' },
  { id: '9', name: 'Coffee Grounds', type: 'organic', emoji: '☕' },
  { id: '10', name: 'Yogurt Cup', type: 'plastic', emoji: '🥛' },
  { id: '11', name: 'Lettuce Leaves', type: 'organic', emoji: '🥬' },
  { id: '12', name: 'Plastic Straw', type: 'plastic', emoji: '🥤' },
  { id: '13', name: 'Book Pages', type: 'paper', emoji: '📖' },
  { id: '14', name: 'Broken Tablet', type: 'electronic', emoji: '📟' }
];

const recycleBins: RecycleBin[] = [
  { 
    type: 'organic', 
    name: 'Organic', 
    color: 'text-green-700', 
    bgColor: 'bg-green-100 border-green-300 hover:bg-green-200', 
    icon: <Leaf className="w-6 h-6" /> 
  },
  { 
    type: 'plastic', 
    name: 'Plastic', 
    color: 'text-yellow-700', 
    bgColor: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200', 
    icon: <Recycle className="w-6 h-6" /> 
  },
  { 
    type: 'paper', 
    name: 'Paper', 
    color: 'text-blue-700', 
    bgColor: 'bg-blue-100 border-blue-300 hover:bg-blue-200', 
    icon: <Trash2 className="w-6 h-6" /> 
  },
  { 
    type: 'electronic', 
    name: 'E-Waste', 
    color: 'text-red-700', 
    bgColor: 'bg-red-100 border-red-300 hover:bg-red-200', 
    icon: <Zap className="w-6 h-6" /> 
  }
];

interface RecycleSorterProps {
  onEcoPointsEarned: (points: number) => void;
}

export const RecycleSorter: React.FC<RecycleSorterProps> = ({ onEcoPointsEarned }) => {
  const [currentItems, setCurrentItems] = useState<WasteItem[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const generateRandomItems = useCallback(() => {
    const shuffled = [...wasteItems].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(4 + level, 6));
  }, [level]);

  const startNewRound = useCallback(() => {
    setCurrentItems(generateRandomItems());
  }, [generateRandomItems]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setStreak(0);
    setTimeLeft(60);
    startNewRound();
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setStreak(0);
    setTimeLeft(60);
    setCurrentItems([]);
    setFeedback(null);
  };

  const handleCorrectSort = useCallback((item: WasteItem) => {
    const points = 10 + (streak * 2) + (level * 5);
    setScore(prev => prev + points);
    setStreak(prev => prev + 1);
    onEcoPointsEarned(points);
    
    setFeedback({
      message: `Perfect! +${points} points! Streak: ${streak + 1}`,
      type: 'success'
    });

    setTimeout(() => setFeedback(null), 2000);

    setCurrentItems(prev => prev.filter(i => i.id !== item.id));
    
    // Level up every 100 points
    if ((score + points) >= level * 100) {
      setLevel(prev => prev + 1);
      setTimeLeft(prev => prev + 15); // Bonus time for leveling up
    }
  }, [score, streak, level, onEcoPointsEarned]);

  const handleIncorrectSort = useCallback(() => {
    setStreak(0);
    setTimeLeft(prev => Math.max(0, prev - 5)); // Penalty: lose 5 seconds
    setFeedback({
      message: "Wrong bin! Try again. -5 seconds penalty",
      type: 'error'
    });
    setTimeout(() => setFeedback(null), 2000);
  }, []);

  const handleItemClick = (item: WasteItem, binType: string) => {
    if (item.type === binType) {
      handleCorrectSort(item);
    } else {
      handleIncorrectSort();
    }
  };

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setGameOver(true);
      setGameStarted(false);
    }
  }, [gameStarted, gameOver, timeLeft]);

  // Auto-generate new items when current ones are cleared
  useEffect(() => {
    if (gameStarted && currentItems.length === 0 && !gameOver) {
      setTimeout(() => {
        startNewRound();
      }, 1000);
    }
  }, [currentItems, gameStarted, gameOver, startNewRound]);

  if (!gameStarted && !gameOver) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <Recycle className="h-full w-full" />
          </div>
          <CardHeader className="text-center relative">
            <CardTitle className="text-4xl font-bold mb-4">♻️ Recycle Sorter</CardTitle>
            <p className="text-green-100 text-lg">
              Sort waste items into the correct recycling bins as fast as you can!
            </p>
          </CardHeader>
          <CardContent className="text-center relative">
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {recycleBins.map((bin) => (
                  <div key={bin.type} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-white mb-2">{bin.icon}</div>
                    <div className="text-sm font-medium">{bin.name}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-sm">
                <strong>How to Play:</strong> Click and drag waste items to the correct recycling bins. 
                Earn points for correct sorting and build up streaks for bonus points!
              </div>
              <Button 
                onClick={startGame}
                className="bg-white text-green-700 hover:bg-green-50 font-bold text-lg px-8 py-3 shadow-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🏆</div>
            <CardTitle className="text-4xl font-bold mb-4">Game Over!</CardTitle>
            <div className="space-y-2 text-lg">
              <div>Final Score: <span className="font-bold text-yellow-300">{score} points</span></div>
              <div>Level Reached: <span className="font-bold text-green-300">{level}</span></div>
              <div>Best Streak: <span className="font-bold text-blue-300">{streak}</span></div>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-blue-100">
                Great job! You've learned to properly sort {score / 10} items. 
                Keep practicing to improve your recycling skills!
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2"
              >
                <Play className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              <Button 
                onClick={resetGame}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Back to Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Game Header */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{level}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{streak}</div>
                <div className="text-sm text-gray-600">Streak</div>
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-900'}`}>
                {timeLeft}s
              </div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      {feedback && (
        <Card className={`border-0 shadow-lg ${feedback.type === 'success' ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}`}>
          <CardContent className="p-4 text-center">
            <div className={`font-bold ${feedback.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {feedback.message}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Waste Items */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-xl">Sort These Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center cursor-move hover:shadow-lg transition-all duration-200 hover:scale-105"
                draggable
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <div className="text-sm font-medium text-gray-900">{item.name}</div>
              </div>
            ))}
          </div>
          {currentItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-2xl mb-2">🎉</div>
              <div>Well done! New items coming...</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recycle Bins */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recycleBins.map((bin) => (
          <Card 
            key={bin.type}
            className={`border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${bin.bgColor}`}
          >
            <CardContent className="p-6 text-center">
              <div className={`${bin.color} mb-3`}>{bin.icon}</div>
              <div className={`font-bold ${bin.color}`}>{bin.name}</div>
              <div className="text-xs text-gray-600 mt-2">Drop items here</div>
              
              {/* Click targets for each waste item */}
              <div className="mt-4 space-y-2">
                {currentItems.map((item) => (
                  <Button
                    key={`${bin.type}-${item.id}`}
                    onClick={() => handleItemClick(item, bin.type)}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                  >
                    Sort {item.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
