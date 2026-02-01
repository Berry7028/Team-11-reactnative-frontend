import React from "react";
import { Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

type SummaryCardsProps = {
  encountersCount: number;
  thanksStampsCount: number;
  cardWidth: number;
  cardGap: number;
  cardRowMargin: number;
};

export function SummaryCards({
  encountersCount,
  thanksStampsCount,
  cardWidth,
  cardGap,
  cardRowMargin,
}: SummaryCardsProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: cardRowMargin,
        gap: cardGap,
        alignItems: "stretch",
      }}
    >
      <View
        style={{
          width: cardWidth,
          minHeight: 120,
          paddingVertical: 16,
          paddingHorizontal: 14,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#EEF1ED",
          shadowColor: "#141712",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 6,
          borderCurve: "continuous",
        }}
      >
        <View
          style={{
            marginBottom: 4,
            width: 38,
            height: 34,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            backgroundColor: "rgba(125, 161, 94, 0.08)",
          }}
        >
          <IconSymbol name="person.3.fill" size={22} color="#7DA15E" />
        </View>
        <Text
          selectable
          style={{
            fontSize: 10,
            fontWeight: "600",
            color: "#718268",
            fontFamily: Fonts.rounded,
            letterSpacing: 0.5,
            textAlign: "center",
          }}
        >
          今日すれ違った
        </Text>
        <Text
          selectable
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#141712",
            fontFamily: Fonts.rounded,
            textAlign: "center",
            lineHeight: 28,
          }}
        >
          {encountersCount}人
        </Text>
      </View>
      <View
        style={{
          width: cardWidth,
          minHeight: 120,
          paddingVertical: 16,
          paddingHorizontal: 14,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#EEF1ED",
          shadowColor: "#141712",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 6,
          borderCurve: "continuous",
        }}
      >
        <View
          style={{
            marginBottom: 4,
            width: 38,
            height: 34,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            backgroundColor: "rgba(255, 170, 184, 0.12)",
          }}
        >
          <IconSymbol name="heart.fill" size={22} color="#D87D8E" />
        </View>
        <Text
          selectable
          style={{
            fontSize: 10,
            fontWeight: "600",
            color: "#718268",
            fontFamily: Fonts.rounded,
            letterSpacing: 0.5,
            textAlign: "center",
          }}
        >
          お疲れ様スタンプ
        </Text>
        <Text
          selectable
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#332D2E",
            fontFamily: Fonts.rounded,
            textAlign: "center",
            lineHeight: 28,
          }}
        >
          {thanksStampsCount}件
        </Text>
      </View>
    </View>
  );
}
