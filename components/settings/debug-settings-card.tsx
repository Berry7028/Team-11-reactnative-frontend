import React from "react";
import { Switch, Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

type DebugSettingsCardProps = {
  skipQuestionnaireLimit: boolean;
  showEncountersWithoutNight: boolean;
  onToggleSkipLimit: (value: boolean) => void;
  onToggleShowEncounters: (value: boolean) => void;
};

export function DebugSettingsCard({
  skipQuestionnaireLimit,
  showEncountersWithoutNight,
  onToggleSkipLimit,
  onToggleShowEncounters,
}: DebugSettingsCardProps) {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        gap: 12,
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
      <Text
        selectable
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: "#141712",
          fontFamily: Fonts.rounded,
        }}
      >
        デバッグ設定
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(168, 223, 142, 0.1)",
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 14,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
          <IconSymbol name="exclamationmark.triangle.fill" size={16} color="#FFA500" />
          <View style={{ flex: 1 }}>
            <Text
              selectable
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: "#3A4D39",
                fontFamily: Fonts.rounded,
              }}
            >
              アンケート回答制限をスキップ
            </Text>
            <Text
              selectable
              style={{
                fontSize: 10,
                color: "#718268",
                fontFamily: Fonts.rounded,
                marginTop: 2,
              }}
            >
              デバッグ用: 時間制限なしで回答可能
            </Text>
          </View>
        </View>
        <Switch
          value={skipQuestionnaireLimit}
          onValueChange={onToggleSkipLimit}
          trackColor={{ false: "#E5E5E5", true: "rgba(168, 223, 142, 0.5)" }}
          thumbColor={skipQuestionnaireLimit ? "#A8DF8E" : "#F4F3F4"}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 170, 184, 0.1)",
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 14,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
          <IconSymbol name="eye.fill" size={16} color="#FFAAB8" />
          <View style={{ flex: 1 }}>
            <Text
              selectable
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: "#3A4D39",
                fontFamily: Fonts.rounded,
              }}
            >
              すれ違いをデバッグモードで見る
            </Text>
            <Text
              selectable
              style={{
                fontSize: 10,
                color: "#718268",
                fontFamily: Fonts.rounded,
                marginTop: 2,
              }}
            >
              デバッグ用: 夜のアンケート未回答でもすれ違いを表示
            </Text>
          </View>
        </View>
        <Switch
          value={showEncountersWithoutNight}
          onValueChange={onToggleShowEncounters}
          trackColor={{ false: "#E5E5E5", true: "rgba(255, 170, 184, 0.5)" }}
          thumbColor={showEncountersWithoutNight ? "#FFAAB8" : "#F4F3F4"}
        />
      </View>
    </View>
  );
}
