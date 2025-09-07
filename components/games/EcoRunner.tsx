"use client"

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Trophy } from 'lucide-react';

interface EcoRunnerProps {
  onEcoPointsEarned: (points: number) => void;
}

interface GameObject {
  id: string;
  x: number;
  y: number;
  type: 'good' | 'bad';
  emoji: string;
  points: number;
}

const goodItems = [
  { emoji: '🌱', points: 10, name: 'Plant' },
  { emoji: '♻️', points: 15, name: 'Recycle' },
  { emoji: '🌳', points: 20, name: 'Tree' },
  { emoji: '💧', points: 12, name: 'Water' },
  { emoji: '☀️', points: 18, name: 'Solar' },
  { emoji: '🍃', points: 8, name: 'Leaf' },
];

const badItems = [
  { emoji: '🏭', points: -15, name: 'Factory' },
  { emoji: '🚗', points: -10, name: 'Car' },
  { emoji: '🗑️', points: -12, name: 'Trash' },
  { emoji: '💨', points: -8, name: 'Smoke' },
  { emoji: '🛢️', points: -20, name: 'Oil' },
];

export const EcoRunner: React.FC<EcoRunnerProps> = ({ onEcoPointsEarned }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(200);
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [speed, setSpeed] = useState(2);
  const [level, setLevel] = useState(1);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const objectIdRef = useRef(0);
  const lastSpawnRef = useRef(0);

  const gameHeight = 400;
  const gameWidth = 800;
  const playerSize = 40;

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setPlayerY(200);
    setObjects([]);
    setSpeed(2);
    setLevel(1);
    lastSpawnRef.current = 0;
    gameLoop();
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setPlayerY(200);
    setObjects([]);
    setSpeed(2);
    setLevel(1);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const movePlayer = useCallback((direction: 'up' | 'down') => {
    setPlayerY(prev => {
      if (direction === 'up') {
        return Math.max(0, prev - 20);
      } else {
        return Math.min(gameHeight - playerSize, prev + 20);
      }
    });
  }, []);

  const spawnObject = useCallback(() => {
    const isGood = Math.random() > 0.4; // 60% chance for good items
    const items = isGood ? goodItems : badItems;
    const item = items[Math.floor(Math.random() * items.length)];
    
    const newObject: GameObject = {
      id: `obj_${objectIdRef.current++}`,
      x: gameWidth,
      y: Math.random() * (gameHeight - 40),
      type: isGood ? 'good' : 'bad',
      emoji: item.emoji,
      points: item.points,
    };

    setObjects(prev => [...prev, newObject]);
  }, []);

  const gameLoop = useCallback(() => {
    const now = Date.now();
    
    // Spawn objects
    if (now - lastSpawnRef.current > 1000 - (speed * 50)) {
      spawnObject();
      lastSpawnRef.current = now;
    }

    // Move objects
    setObjects(prev => {
      const updated = prev.map(obj => ({
        ...obj,
        x: obj.x - speed
      })).filter(obj => obj.x > -50);

      // Check collisions
      updated.forEach(obj => {
        const playerLeft = 50;
        const playerRight = 50 + playerSize;
        const playerTop = playerY;
        const playerBottom = playerY + playerSize;

        const objLeft = obj.x;
        const objRight = obj.x + 40;
        const objTop = obj.y;
        const objBottom = obj.y + 40;

        if (playerLeft < objRight && playerRight > objLeft &&
            playerTop < objBottom && playerBottom > objTop) {
          // Collision detected
          setScore(prevScore => {
            const newScore = Math.max(0, prevScore + obj.points);
            if (obj.type === 'good') {
              onEcoPointsEarned(obj.points);
            }
            return newScore;
          });

          // Remove the object
          setObjects(prevObjects => prevObjects.filter(o => o.id !== obj.id));

          // End game if score goes below 0
          if (score + obj.points < 0) {
            setGameOver(true);
            setGameStarted(false);
            return;
          }
        }
      });

      return updated;
    });

    // Increase difficulty
    setSpeed(prev => Math.min(8, 2 + Math.floor(score / 100)));
    setLevel(Math.floor(score / 100) + 1);

    if (gameStarted && !gameOver) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameStarted, gameOver, score, playerY, speed, spawnObject, onEcoPointsEarned]);

  useEffect(() => {
    if (gameStarted) {
      const gameLoop = () => {
        setObjects(prev => {
          const now = Date.now();
          
          // Spawn new objects occasionally
          if (Math.random() < 0.02) {
            const isGood = Math.random() > 0.4;
            const items = isGood ? goodItems : badItems;
            const item = items[Math.floor(Math.random() * items.length)];
            
            const newObject: GameObject = {
              id: `obj_${now}_${Math.random()}`,
              x: gameWidth,
              y: Math.random() * (gameHeight - 40),
              type: isGood ? 'good' : 'bad',
              emoji: item.emoji,
              points: item.points,
            };
            
            return [...prev, newObject];
          }
          
          return prev;
        });
        
        setObjects(prev => prev.map(obj => ({
          ...obj,
          x: obj.x - speed
        })).filter(obj => obj.x > -50));

        if (gameStarted && !gameOver) {
          setTimeout(gameLoop, 50);
        }
      };
      
      gameLoop();
    }
  }, [gameStarted, gameOver, speed]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        movePlayer('up');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        movePlayer('down');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver, movePlayer]);

  if (!gameStarted && !gameOver) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-500 to-green-600 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <div className="h-full w-full text-8xl flex items-center justify-center">🏃</div>
          </div>
          <CardHeader className="text-center relative">
            <CardTitle className="text-4xl font-bold mb-4">🏃‍♂️ Eco-Run Adventure</CardTitle>
            <p className="text-blue-100 text-lg">
              Run through the world, collect eco-friendly items and avoid pollution!
            </p>
          </CardHeader>
          <CardContent className="text-center relative">
            <div className="space-y-4">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
                <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🌱</div>
                  <div className="text-xs">+10 pts</div>
                </div>
                <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">♻️</div>
                  <div className="text-xs">+15 pts</div>
                </div>
                <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🌳</div>
                  <div className="text-xs">+20 pts</div>
                </div>
                <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🏭</div>
                  <div className="text-xs">-15 pts</div>
                </div>
                <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🚗</div>
                  <div className="text-xs">-10 pts</div>
                </div>
                <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🗑️</div>
                  <div className="text-xs">-12 pts</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-sm">
                <strong>Controls:</strong> Use ↑↓ arrow keys or W/S keys to move up and down. 
                Collect green eco-items for points and avoid pollution!
              </div>
              <Button 
                onClick={startGame}
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-lg px-8 py-3 shadow-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Running
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
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🏃‍♂️</div>
            <CardTitle className="text-4xl font-bold mb-4">Run Complete!</CardTitle>
            <div className="space-y-2 text-lg">
              <div>Distance: <span className="font-bold text-yellow-300">{score} meters</span></div>
              <div>Top Speed: <span className="font-bold text-green-300">Level {level}</span></div>
              <div>Eco Items: <span className="font-bold text-blue-300">{Math.floor(score / 10)}</span></div>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-purple-100">
                Great run! You've learned about {Math.floor(score / 10)} different eco-friendly items. 
                Keep running to discover more!
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Again
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
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Distance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{level}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{speed}</div>
                <div className="text-sm text-gray-600">Speed</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Controls: ↑↓ or W/S</div>
              <div className="text-xs text-gray-500">Collect 🌱 Avoid 🏭</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Area */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-sky-100 to-green-100 overflow-hidden">
        <CardContent className="p-0">
          <div 
            ref={gameAreaRef}
            className="relative bg-gradient-to-r from-sky-200 to-green-200"
            style={{ height: `${gameHeight}px`, width: '100%' }}
          >
            {/* Player */}
            <div
              className="absolute flex items-center justify-center text-3xl bg-white rounded-full border-2 border-blue-500 shadow-lg transition-all duration-100"
              style={{
                left: '50px',
                top: `${playerY}px`,
                width: `${playerSize}px`,
                height: `${playerSize}px`,
              }}
            >
              🏃‍♂️
            </div>

            {/* Objects */}
            {objects.map((obj) => (
              <div
                key={obj.id}
                className={`absolute flex items-center justify-center text-2xl rounded-full transition-all duration-100 ${
                  obj.type === 'good' 
                    ? 'bg-green-200 border-2 border-green-500 shadow-lg' 
                    : 'bg-red-200 border-2 border-red-500 shadow-lg'
                }`}
                style={{
                  left: `${obj.x}px`,
                  top: `${obj.y}px`,
                  width: '40px',
                  height: '40px',
                }}
              >
                {obj.emoji}
              </div>
            ))}

            {/* Ground pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-green-400 to-green-600"></div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Controls */}
      <Card className="border-0 shadow-lg bg-white md:hidden">
        <CardContent className="p-4">
          <div className="flex justify-center gap-4">
            <Button
              onTouchStart={() => movePlayer('up')}
              onClick={() => movePlayer('up')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg"
            >
              ↑ Up
            </Button>
            <Button
              onTouchStart={() => movePlayer('down')}
              onClick={() => movePlayer('down')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
            >
              ↓ Down
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
