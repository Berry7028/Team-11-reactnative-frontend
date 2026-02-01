import React from "react";
import { Text, View } from "react-native";

import { Fonts } from "@/constants/theme";

type QuestProgressProps = {
  completedCount: number;
  totalCount: number;
};

export function QuestProgress({ completedCount, totalCount }: QuestProgressProps) {
  if (totalCount === 0) return null;

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text
        selectable
        style={{
          color: "#5C5254",
          fontSize: 12,
          textAlign: "center",
          fontFamily: Fonts.rounded,
        }}
      >
        {completedCount}/{totalCount} 完了
      </Text>
    </View>
  );
}
