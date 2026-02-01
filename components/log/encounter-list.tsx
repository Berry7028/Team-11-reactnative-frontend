import React from "react";
import { View } from "react-native";

import { EncounterCard } from "@/components/log/encounter-card";
import type { EncounterWithQuests } from "@/lib/api";

type EncounterListProps = {
  encounters: EncounterWithQuests[];
  stampSentIds: Set<number>;
  sendingEncounterId: number | null;
  onSendThanks: (encounter: EncounterWithQuests) => void;
};

export function EncounterList({
  encounters,
  stampSentIds,
  sendingEncounterId,
  onSendThanks,
}: EncounterListProps) {
  return (
    <View style={{ paddingHorizontal: 16, gap: 14 }}>
      {encounters.map((encounter) => {
        const displayName = encounter.other_user_name || "旅の仲間";
        const stampSent = stampSentIds.has(encounter.id);
        const sending = sendingEncounterId === encounter.id;

        const questsToShow = encounter.completed_quests.slice(0, 3);
        const questText =
          questsToShow.length > 0
            ? `${questsToShow.map((q) => `『${q.title}』`).join("、")}を達成しました`
            : "今日のクエストに挑戦中";

        return (
          <EncounterCard
            key={encounter.id}
            encounter={encounter}
            displayName={displayName}
            questText={questText}
            stampSent={stampSent}
            sending={sending}
            onSendThanks={() => onSendThanks(encounter)}
          />
        );
      })}
    </View>
  );
}
