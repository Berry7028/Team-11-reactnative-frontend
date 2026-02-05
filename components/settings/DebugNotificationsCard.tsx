import React from "react";
import { Pressable, Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

type DebugNotificationsCardProps = {
  onSendMorning: () => void;
  onSendNight: () => void;
};

export function DebugNotificationsCard({
  onSendMorning,
  onSendNight,
}: DebugNotificationsCardProps) {
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
        デバッグ通知
      </Text>
      <Pressable
        onPress={onSendMorning}
        style={{
          backgroundColor: "rgba(168, 223, 142, 0.15)",
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 14,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <IconSymbol name="sun.max.fill" size={16} color="#A8DF8E" />
        <Text
          selectable
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: "#3A4D39",
            fontFamily: Fonts.rounded,
          }}
        >
          朝の通知を出す
        </Text>
      </Pressable>
      <Pressable
        onPress={onSendNight}
        style={{
          backgroundColor: "rgba(255, 170, 184, 0.15)",
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 14,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <IconSymbol name="moon.stars.fill" size={16} color="#FFAAB8" />
        <Text
          selectable
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: "#6B3E45",
            fontFamily: Fonts.rounded,
          }}
        >
          夜の通知を出す
        </Text>
      </Pressable>
    </View>
  );
}
