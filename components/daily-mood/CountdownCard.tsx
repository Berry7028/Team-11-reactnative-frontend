import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Fonts } from "@/constants/theme";

export interface CountdownCardProps {
  nextCountdown: string;
  nextWindowLabel: string;
  variant?: "morning" | "night";
}

const variantColors = {
  morning: {
    countdown: "#141712",
    label: "#718268",
  },
  night: {
    countdown: "#0F172A",
    label: "#94A3B8",
  },
} as const;

export function CountdownCard({
  nextCountdown,
  nextWindowLabel,
  variant = "morning",
}: CountdownCardProps) {
  const colors = variantColors[variant];

  return (
    <View style={styles.card}>
      <Text
        selectable
        style={[styles.countdown, { color: colors.countdown }]}
      >
        {nextCountdown}
      </Text>
      <Text
        selectable
        style={[styles.label, { color: colors.label }]}
      >
        {nextWindowLabel} に再回答できます
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "center",
    gap: 12,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  },
  countdown: {
    fontSize: 48,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
    fontFamily: Fonts.rounded,
    letterSpacing: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: Fonts.rounded,
  },
});
