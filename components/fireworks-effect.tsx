import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';

// 花火のパーティクル型
type Particle = {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  scale: Animated.Value;
  opacity: Animated.Value;
  color: string;
  size: number;
};

interface FireworksEffectProps {
  onComplete: () => void;
  particleCount?: number;
  colors?: string[];
}

export function FireworksEffect({
  onComplete,
  particleCount = 48,
  colors = ['#FFAAB8', '#FFD8DF', '#A8DF8E', '#FFE4B5', '#E6E6FA', '#FFB6C1'],
}: FireworksEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 40 + Math.random() * 30;
      const particle: Particle = {
        id: i,
        x: new Animated.Value(0),
        y: new Animated.Value(0),
        scale: new Animated.Value(0),
        opacity: new Animated.Value(1),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 4,
      };
      newParticles.push(particle);

      // アニメーション
      Animated.sequence([
        Animated.parallel([
          Animated.timing(particle.scale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(particle.x, {
            toValue: Math.cos(angle) * distance,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(particle.y, {
            toValue: Math.sin(angle) * distance - 20,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(particle.opacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(particle.y, {
            toValue: Math.sin(angle) * distance + 20,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }

    setParticles(newParticles);

    const timer = setTimeout(() => {
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete, particleCount, colors]);

  return (
    <View
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            borderRadius: particle.size / 2,
            backgroundColor: particle.color,
            transform: [
              { translateX: particle.x },
              { translateY: particle.y },
              { scale: particle.scale },
            ],
            opacity: particle.opacity,
          }}
        />
      ))}
    </View>
  );
}
