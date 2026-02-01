import React from "react";
import { Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export function QuestEmptyState() {
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 40, alignItems: "center" }}>
      <IconSymbol name="sparkles" size={48} color="#FFAAB8" />
      <Text
        style={{
          marginTop: 16,
          fontSize: 16,
          fontWeight: "600",
          color: "#5C5254",
          textAlign: "center",
          fontFamily: Fonts.rounded,
        }}
      >
        今日のクエストはまだありません
      </Text>
      <Text
        style={{
          marginTop: 8,
          fontSize: 12,
          color: "#94A3B8",
          textAlign: "center",
          fontFamily: Fonts.rounded,
        }}
      >
        朝の気分を記録するとクエストが生成されます
      </Text>
    </View>
  );
}
