import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

type NightSubmittedViewProps = {
  nextCountdown: string;
  nextWindowLabel: string;
};

export function NightSubmittedView({
  nextCountdown,
  nextWindowLabel,
}: NightSubmittedViewProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        minHeight: 500,
        gap: 24,
      }}
    >
      <View style={{ position: "relative" }}>
        <View
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            bottom: -20,
            left: -20,
            borderRadius: 999,
            backgroundColor: "rgba(168, 223, 142, 0.2)",
            boxShadow: "0 0 30px rgba(168, 223, 142, 0.5)",
          }}
        />
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnRhmMC5GjX_fjyyVvxSvdcURfBGboqlUhBitULtZAOxfPf3LTQB2zghqu2puS_Vf849jjUo759GxZ5Zt-xRCs2F78e_TzgvOr1FJelwwJpaB8PheAHy83gFCWbCSiFKLy_kZQZRsC_ggZvk9JXsUT_gRmTKxqK6O4BIfCHFbkAiUVfQ7rhbdcp9Cr-KGc7ZUdW_rWAvWC1Aevv6kQBErtZOXwFzYwinRNr9FVM606UNpFLuAZuiP6Ib37CmmTmzdVEj7Dva7AARhS",
          }}
          contentFit="contain"
          style={{ width: 120, height: 120 }}
        />
      </View>

      <View style={{ alignItems: "center", gap: 8 }}>
        <Text
          selectable
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#475569",
            fontFamily: Fonts.rounded,
          }}
        >
          今日もお疲れ様でした
        </Text>
        <Text
          selectable
          style={{
            fontSize: 13,
            color: "#94A3B8",
            fontFamily: Fonts.rounded,
          }}
        >
          次のアンケート開始まで
        </Text>
      </View>

      <View
        style={{
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
        }}
      >
        <Text
          selectable
          style={{
            fontSize: 48,
            fontWeight: "700",
            color: "#0F172A",
            fontVariant: ["tabular-nums"],
            fontFamily: Fonts.rounded,
            letterSpacing: 2,
          }}
        >
          {nextCountdown}
        </Text>
        <Text
          selectable
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: "#94A3B8",
            fontFamily: Fonts.rounded,
          }}
        >
          {nextWindowLabel} に再回答できます
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: "rgba(255,255,255,0.6)",
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.6)",
        }}
      >
        <IconSymbol name="moon.stars.fill" size={18} color="#FFAAB8" />
        <Text
          selectable
          style={{
            fontSize: 13,
            fontWeight: "700",
            color: "#94A3B8",
            fontFamily: Fonts.rounded,
          }}
        >
          ゆっくり休んでね
        </Text>
      </View>
    </View>
  );
}
