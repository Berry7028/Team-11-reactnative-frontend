import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { IconSymbol, type IconSymbolName } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export interface IconBadgeProps {
  icon: IconSymbolName;
  text: string;
  size?: "normal" | "small";
}

const sizeStyles = {
  normal: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 13,
    iconSize: 18,
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 11,
    iconSize: 16,
  },
} as const;

export function IconBadge({
  icon,
  text,
  size = "normal",
}: IconBadgeProps) {
  const s = sizeStyles[size];

  return (
    <View
      style={[
        styles.badge,
        {
          paddingHorizontal: s.paddingHorizontal,
          paddingVertical: s.paddingVertical,
        },
      ]}
    >
      <IconSymbol name={icon} size={s.iconSize} color="#FFAAB8" />
      <Text
        selectable
        style={[styles.text, { fontSize: s.fontSize }]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  text: {
    fontWeight: "700",
    color: "#94A3B8",
    fontFamily: Fonts.rounded,
  },
});
