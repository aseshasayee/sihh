"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Leaf, Recycle, PlayCircle, Zap, TreePine, ShoppingBag, Earth, Target, Trophy, Users, Star } from 'lucide-react';
import { RecycleSorter } from './RecycleSorter';
import { EcoRunner } from './EcoRunner';
import { EnergyTycoon } from './EnergyTycoon';
import { PlasticFreeChallenge } from './PlasticFreeChallenge';
import { CarbonFootprint } from './CarbonFootprint';
import { EcoQuest } from './EcoQuest';

type GameType = 'home' | 'recycle-sorter' | 'eco-runner' | 'energy-tycoon' | 'plastic-free' | 'carbon-footprint' | 'eco-quest';

interface GameCardProps {
  title: string;
  description: string;
  ageGroup: string;
  difficulty: string;
  onClick: () => void;
  icon: React.ReactNode;
  players: number;
  points: string;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  ageGroup,
  difficulty,
  onClick,
  icon,
  players,
  points
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'hard': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-300';
      case 'expert': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 bg-white shadow-lg group overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="text-center relative pb-4">
        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center text-4xl bg-gradient-to-br from-green-400 to-blue-500 text-white rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 relative">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Badge className={`border text-xs font-medium ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
              {ageGroup}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{players.toLocaleString()} players</span>
            </div>
            <div className="flex items-center gap-1 text-green-600 font-medium">
              <Star className="h-4 w-4" />
              <span>{points}</span>
            </div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            Play Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const GameHub: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<GameType>('home');
  const [ecoPoints, setEcoPoints] = useState(0);

  const games = [
    {
      id: 'recycle-sorter' as const,
      title: 'Recycle Sorter',
      description: 'Drag & drop waste into correct bins to save the planet! Learn proper recycling techniques.',
      ageGroup: '11-15 years',
      difficulty: 'Easy',
      icon: <Recycle className="w-8 h-8" />,
      players: 1247,
      points: '10-50 pts'
    },
    {
      id: 'eco-runner' as const,
      title: 'Eco-Run Adventure',
      description: 'Endless runner collecting eco-items while avoiding pollution! Test your reflexes.',
      ageGroup: '11-15 years', 
      difficulty: 'Medium',
      icon: <PlayCircle className="w-8 h-8" />,
      players: 892,
      points: '25-100 pts'
    },
    {
      id: 'energy-tycoon' as const,
      title: 'Energy Tycoon',
      description: 'Build sustainable cities and choose renewable energy sources for a better future.',
      ageGroup: '15-18 years',
      difficulty: 'Hard',
      icon: <Zap className="w-8 h-8" />,
      players: 634,
      points: '50-200 pts'
    },
    {
      id: 'plastic-free' as const,
      title: 'Plastic-Free Challenge',
      description: 'Daily eco-choices quiz with streak rewards! Make sustainable lifestyle decisions.',
      ageGroup: '15-18 years',
      difficulty: 'Medium',
      icon: <ShoppingBag className="w-8 h-8" />,
      players: 756,
      points: '30-75 pts'
    },
    {
      id: 'carbon-footprint' as const,
      title: 'Carbon Footprint Simulator',
      description: 'Track your lifestyle impact with an interactive eco-avatar and real-world scenarios.',
      ageGroup: '18+ years',
      difficulty: 'Advanced',
      icon: <Earth className="w-8 h-8" />,
      players: 543,
      points: '75-150 pts'
    },
    {
      id: 'eco-quest' as const,
      title: 'EcoQuest Missions',
      description: 'Complete environmental puzzles and quizzes to earn special power-ups and badges.',
      ageGroup: '18+ years',
      difficulty: 'Expert',
      icon: <Target className="w-8 h-8" />,
      players: 421,
      points: '100-300 pts'
    }
  ];

  const renderGame = () => {
    switch (currentGame) {
      case 'recycle-sorter':
        return <RecycleSorter onEcoPointsEarned={(points) => setEcoPoints(prev => prev + points)} />;
      case 'eco-runner':
        return <EcoRunner onEcoPointsEarned={(points) => setEcoPoints(prev => prev + points)} />;
      case 'energy-tycoon':
        return <EnergyTycoon onEcoPointsEarned={(points) => setEcoPoints(prev => prev + points)} />;
      case 'plastic-free':
        return <PlasticFreeChallenge onEcoPointsEarned={(points) => setEcoPoints(prev => prev + points)} />;
      case 'carbon-footprint':
        return <CarbonFootprint onEcoPointsEarned={(points) => setEcoPoints(prev => prev + points)} />;
      case 'eco-quest':
        return <EcoQuest onEcoPointsEarned={(points) => setEcoPoints(prev => prev + points)} />;
      default:
        return null;
    }
  };

  if (currentGame !== 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="outline"
              onClick={() => setCurrentGame('home')}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Games
            </Button>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg">
              <Leaf className="w-5 h-5" />
              <span className="font-bold text-lg">{ecoPoints} Eco-Points</span>
            </div>
          </div>
          {renderGame()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium shadow-lg">
            <Trophy className="h-4 w-4" />
            Eco Gaming Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              EcoGames
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn sustainability through fun and interactive games! Earn eco-points, unlock achievements, and save the planet one game at a time.
          </p>
          
          {/* Stats Banner */}
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl mx-auto max-w-fit">
            <Leaf className="w-6 h-6" />
            <span>{ecoPoints} Eco-Points Earned</span>
          </div>
        </div>

        {/* Games Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Eco-Adventure!</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each game is designed to teach different aspects of environmental awareness while keeping you engaged and entertained.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {games.map((game) => (
              <GameCard
                key={game.id}
                {...game}
                onClick={() => setCurrentGame(game.id)}
              />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-500 via-blue-500 to-emerald-500 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <TreePine className="h-full w-full" />
          </div>
          <CardHeader className="relative text-center pb-6">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-300" />
              Why Play EcoGames?
              <Leaf className="h-8 w-8 text-green-300" />
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Learning made fun with real-world impact
            </CardDescription>
          </CardHeader>
          <CardContent className="relative pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-lg mb-2">Skill Building</h3>
                <p className="text-blue-100 text-sm">Develop critical thinking and environmental awareness through interactive gameplay.</p>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-bold text-lg mb-2">Achievements</h3>
                <p className="text-blue-100 text-sm">Earn badges, points, and unlock new challenges as you progress through levels.</p>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="font-bold text-lg mb-2">Real Impact</h3>
                <p className="text-blue-100 text-sm">Learn practical skills you can apply in real life to make a positive environmental impact.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
