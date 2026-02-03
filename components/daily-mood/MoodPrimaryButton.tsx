import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export interface MoodPrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading: boolean;
  disabled?: boolean;
  variant: "green" | "pink";
  showIcon?: boolean;
  fullWidth?: boolean;
}

const variantStyles = {
  green: {
    backgroundColor: "#A8DF8E",
    boxShadow: "0 10px 18px rgba(168, 223, 142, 0.4)",
    activityColor: "#FFAAB8",
  },
  pink: {
    backgroundColor: "#FFAAB8",
    boxShadow: "0 8px 18px rgba(255, 170, 184, 0.4)",
    activityColor: "#FFAAB8",
  },
} as const;

export function MoodPrimaryButton({
  label,
  onPress,
  loading,
  disabled,
  variant,
  showIcon = false,
  fullWidth = false,
}: MoodPrimaryButtonProps) {
  const effectiveDisabled = disabled ?? loading;
  const v = variantStyles[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={effectiveDisabled}
      style={[
        styles.button,
        {
          backgroundColor: v.backgroundColor,
          boxShadow: v.boxShadow,
          width: fullWidth ? "100%" : undefined,
        },
        effectiveDisabled && styles.buttonDisabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.activityColor} />
      ) : (
        <View style={styles.content}>
          <Text selectable style={styles.label}>
            {label}
          </Text>
          {showIcon && (
            <IconSymbol
              name="checkmark.circle.fill"
              size={18}
              color="#FFFFFF"
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: Fonts.rounded,
  },
});
