import React from "react";
import { Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export function EmptyState() {
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 20, alignItems: "center", gap: 12 }}>
      <IconSymbol name="figure.walk" size={48} color="#FFAAB8" />
      <Text
        selectable
        style={{
          fontSize: 14,
          color: "#718268",
          textAlign: "center",
          fontFamily: Fonts.rounded,
        }}
      >
        今日はまだすれ違いがありません
      </Text>
    </View>
  );
}
