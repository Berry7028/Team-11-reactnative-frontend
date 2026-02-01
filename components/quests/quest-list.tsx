import React from "react";
import { View } from "react-native";

import { AnimatedQuestCard } from "@/components/quests/animated-quest-card";
import type { Quest } from "@/lib/api";

type QuestListProps = {
  quests: Quest[];
  animationKey: number;
  togglingQuestId: number | null;
  fireworkQuestId: number | null;
  onToggleComplete: (questId: number) => void;
  onFireworkComplete: () => void;
};

export function QuestList({
  quests,
  animationKey,
  togglingQuestId,
  fireworkQuestId,
  onToggleComplete,
  onFireworkComplete,
}: QuestListProps) {
  return (
    <View style={{ paddingHorizontal: 16, gap: 18 }}>
      {quests.map((quest, index) => (
        <AnimatedQuestCard
          key={`${quest.id}-${animationKey}`}
          quest={quest}
          index={index}
          isToggling={togglingQuestId === quest.id}
          onToggle={onToggleComplete}
          showFireworks={fireworkQuestId === quest.id}
          onFireworkComplete={onFireworkComplete}
        />
      ))}
    </View>
  );
}
