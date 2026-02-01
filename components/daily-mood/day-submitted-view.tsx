import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

type DaySubmittedViewProps = {
  nextCountdown: string;
  nextWindowLabel: string;
};

export function DaySubmittedView({
  nextCountdown,
  nextWindowLabel,
}: DaySubmittedViewProps) {
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
      <View style={{ alignItems: "center", gap: 12 }}>
        <View style={{ position: "relative" }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              padding: 18,
              borderRadius: 999,
              borderWidth: 4,
              borderColor: "#FFFFFF",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT_5wjRFwJoR7GXTvgMqmJikC5wzKm5Yvp3tZ51nbh9qIp_B2W5vM_4o64OZATfYIfg6m0K3rehQKcXyDgjP9w8NLa-LwsBvlWlkdLQcZoGiu7gHOgZuBUoMtPoI6M7uz3n4v34ciT3Slcdb-GcVeUm4o3RbxRiy_mwc_ykFJaN1NMKQh4Fgcp43GPnEDHjTTt562Sdo7IGg_z8IfEDgX8s_tcePmkWWR_byDWHNs6LZclP9uErItqdq0vbRnDf9aPmfOTXFIOglFG",
              }}
              contentFit="cover"
              style={{ height: 100, width: 100, borderRadius: 50 }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              backgroundColor: "#FFAAB8",
              height: 32,
              width: 32,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(255, 170, 184, 0.5)",
            }}
          >
            <IconSymbol name="checkmark" size={18} color="#FFFFFF" />
          </View>
        </View>
        <Text
          selectable
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#141712",
            fontFamily: Fonts.rounded,
          }}
        >
          回答ありがとう！
        </Text>
        <Text
          selectable
          style={{
            fontSize: 13,
            color: "#718268",
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
            color: "#141712",
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
            color: "#718268",
            fontFamily: Fonts.rounded,
          }}
        >
          {nextWindowLabel} に再回答できます
        </Text>
      </View>
    </View>
  );
}
