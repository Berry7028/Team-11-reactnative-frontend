import React from "react";
import { Pressable, Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

type LogoutCardProps = {
  onLogout: () => void;
};

export function LogoutCard({ onLogout }: LogoutCardProps) {
  return (
    <Pressable
      onPress={onLogout}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
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
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          backgroundColor: "rgba(255, 170, 184, 0.2)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconSymbol
          name="chevron.right"
          size={20}
          color="#FFAAB8"
        />
      </View>
      <Text
        selectable
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: "#FFAAB8",
          fontFamily: Fonts.rounded,
        }}
      >
        ログアウト
      </Text>
    </Pressable>
  );
}
