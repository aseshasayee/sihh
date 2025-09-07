"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, Zap, Building, Sun, Wind } from 'lucide-react';

interface EnergyTycoonProps {
  onEcoPointsEarned: (points: number) => void;
}

export const EnergyTycoon: React.FC<EnergyTycoonProps> = ({ onEcoPointsEarned }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [money, setMoney] = useState(1000);
  const [energy, setEnergy] = useState(0);
  const [population, setPopulation] = useState(100);
  const [powerPlants, setPowerPlants] = useState({
    solar: 0,
    wind: 0,
    coal: 0,
    nuclear: 0,
  });

  const powerPlantTypes = [
    {
      type: 'solar',
      name: 'Solar Panel',
      icon: <Sun className="w-6 h-6" />,
      cost: 500,
      energy: 10,
      pollution: 0,
      description: 'Clean solar energy',
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
    },
    {
      type: 'wind',
      name: 'Wind Turbine',
      icon: <Wind className="w-6 h-6" />,
      cost: 800,
      energy: 15,
      pollution: 0,
      description: 'Renewable wind power',
      color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    {
      type: 'coal',
      name: 'Coal Plant',
      icon: <Building className="w-6 h-6" />,
      cost: 300,
      energy: 25,
      pollution: 10,
      description: 'Cheap but polluting',
      color: 'bg-gray-100 border-gray-300 text-gray-800'
    },
    {
      type: 'nuclear',
      name: 'Nuclear Plant',
      icon: <Zap className="w-6 h-6" />,
      cost: 2000,
      energy: 50,
      pollution: 2,
      description: 'High energy, low carbon',
      color: 'bg-purple-100 border-purple-300 text-purple-800'
    },
  ];

  const buildPowerPlant = (type: string) => {
    const plant = powerPlantTypes.find(p => p.type === type);
    if (!plant || money < plant.cost) return;

    setMoney(prev => prev - plant.cost);
    setPowerPlants(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof prev] + 1
    }));
    setEnergy(prev => prev + plant.energy);
    
    if (plant.pollution === 0) {
      onEcoPointsEarned(20); // Bonus for clean energy
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setMoney(1000);
    setEnergy(0);
    setPopulation(100);
    setPowerPlants({ solar: 0, wind: 0, coal: 0, nuclear: 0 });
  };

  const resetGame = () => {
    setGameStarted(false);
    setMoney(1000);
    setEnergy(0);
    setPopulation(100);
    setPowerPlants({ solar: 0, wind: 0, coal: 0, nuclear: 0 });
  };

  // Calculate pollution
  const totalPollution = powerPlants.coal * 10 + powerPlants.nuclear * 2;
  const isEcoFriendly = totalPollution <= 20;

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <Zap className="h-full w-full" />
          </div>
          <CardHeader className="text-center relative">
            <CardTitle className="text-4xl font-bold mb-4">⚡ Energy Tycoon</CardTitle>
            <p className="text-orange-100 text-lg">
              Build sustainable cities and choose the best energy sources for the future!
            </p>
          </CardHeader>
          <CardContent className="text-center relative">
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {powerPlantTypes.map((plant) => (
                  <div key={plant.type} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-white mb-2">{plant.icon}</div>
                    <div className="text-sm font-medium">{plant.name}</div>
                    <div className="text-xs opacity-80">${plant.cost}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-sm">
                <strong>Goal:</strong> Build a sustainable energy grid for your city. 
                Balance cost, energy output, and environmental impact!
              </div>
              <Button 
                onClick={startGame}
                className="bg-white text-orange-700 hover:bg-orange-50 font-bold text-lg px-8 py-3 shadow-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Building
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-green-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">${money}</div>
            <div className="text-sm text-gray-600">Budget</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-blue-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{energy} MW</div>
            <div className="text-sm text-gray-600">Energy Output</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-purple-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{population}</div>
            <div className="text-sm text-gray-600">Population</div>
          </CardContent>
        </Card>
        <Card className={`border-0 shadow-lg ${isEcoFriendly ? 'bg-green-50' : 'bg-red-50'}`}>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${isEcoFriendly ? 'text-green-600' : 'text-red-600'}`}>
              {totalPollution}
            </div>
            <div className="text-sm text-gray-600">Pollution</div>
          </CardContent>
        </Card>
      </div>

      {/* Eco Status */}
      {isEcoFriendly && (
        <Card className="border-0 shadow-lg bg-green-100 border-green-300">
          <CardContent className="p-4 text-center">
            <div className="text-green-800 font-bold">🌱 Eco-Friendly City! Bonus points earned!</div>
          </CardContent>
        </Card>
      )}

      {/* Power Plants */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Power Plant Construction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {powerPlantTypes.map((plant) => (
              <Card key={plant.type} className={`border-2 ${plant.color} hover:shadow-lg transition-all`}>
                <CardContent className="p-4 text-center">
                  <div className="mb-3">{plant.icon}</div>
                  <h3 className="font-bold mb-2">{plant.name}</h3>
                  <div className="text-xs mb-2">{plant.description}</div>
                  <div className="space-y-1 text-xs mb-3">
                    <div>Cost: ${plant.cost}</div>
                    <div>Energy: +{plant.energy} MW</div>
                    <div>Pollution: +{plant.pollution}</div>
                    <div>Built: {powerPlants[plant.type as keyof typeof powerPlants]}</div>
                  </div>
                  <Button
                    onClick={() => buildPowerPlant(plant.type)}
                    disabled={money < plant.cost}
                    className="w-full text-xs"
                    variant={money >= plant.cost ? "default" : "outline"}
                  >
                    Build ${plant.cost}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* City Visualization */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-sky-100 to-green-100">
        <CardHeader>
          <CardTitle className="text-center">Your City</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 md:grid-cols-10 gap-2 p-4">
            {Array.from({ length: powerPlants.solar }, (_, i) => (
              <div key={`solar-${i}`} className="text-2xl text-center">☀️</div>
            ))}
            {Array.from({ length: powerPlants.wind }, (_, i) => (
              <div key={`wind-${i}`} className="text-2xl text-center">💨</div>
            ))}
            {Array.from({ length: powerPlants.coal }, (_, i) => (
              <div key={`coal-${i}`} className="text-2xl text-center">🏭</div>
            ))}
            {Array.from({ length: powerPlants.nuclear }, (_, i) => (
              <div key={`nuclear-${i}`} className="text-2xl text-center">⚛️</div>
            ))}
          </div>
          {Object.values(powerPlants).every(count => count === 0) && (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">🏙️</div>
              <div>Your city awaits power plants!</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Controls */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-4 text-center">
          <Button 
            onClick={resetGame}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset City
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
