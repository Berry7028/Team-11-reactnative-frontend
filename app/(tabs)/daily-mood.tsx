import { Image } from "expo-image";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { MoodInputSection } from "@/components/mood-input-section";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

function useTimeOfDay() {
  const hour = new Date().getHours();
  // 05:00-17:59 を日中、それ以外を夜に判定
  return hour >= 5 && hour < 18 ? "day" : "night";
}

export default function DailyMoodScreen() {
  const timeOfDay = useTimeOfDay();

  if (timeOfDay === "night") {
    // 夜モード: 簡略版振り返りUI
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: "#F0FFDF" }}
        contentContainerStyle={{ paddingBottom: 32, gap: 20 }}
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Text
              selectable
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: "#475569",
                fontFamily: Fonts.rounded,
              }}
            >
              今の気分を教えて？
            </Text>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  bottom: -10,
                  left: -10,
                  borderRadius: 999,
                  backgroundColor: "rgba(168, 223, 142, 0.3)",
                  boxShadow: "0 0 18px rgba(168, 223, 142, 0.6)",
                }}
              />
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnRhmMC5GjX_fjyyVvxSvdcURfBGboqlUhBitULtZAOxfPf3LTQB2zghqu2puS_Vf849jjUo759GxZ5Zt-xRCs2F78e_TzgvOr1FJelwwJpaB8PheAHy83gFCWbCSiFKLy_kZQZRsC_ggZvk9JXsUT_gRmTKxqK6O4BIfCHFbkAiUVfQ7rhbdcp9Cr-KGc7ZUdW_rWAvWC1Aevv6kQBErtZOXwFzYwinRNr9FVM606UNpFLuAZuiP6Ib37CmmTmzdVEj7Dva7AARhS",
                }}
                contentFit="contain"
                style={{ width: 84, height: 84 }}
              />
            </View>
          </View>
        </View>

        <MoodInputSection placeholder="今日あったことや、今の気持ちを全部吐き出してみてね..." />

        <View style={{ paddingHorizontal: 24, alignItems: "center", gap: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(255,255,255,0.6)",
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.6)",
            }}
          >
            <IconSymbol name="moon.stars.fill" size={16} color="#FFAAB8" />
            <Text
              selectable
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: "#94A3B8",
                fontFamily: Fonts.rounded,
              }}
            >
              ゆっくり休んでね
            </Text>
          </View>
          <Pressable
            style={{
              width: "100%",
              backgroundColor: "#FFAAB8",
              borderRadius: 999,
              paddingVertical: 16,
              alignItems: "center",
              boxShadow: "0 8px 18px rgba(255, 170, 184, 0.4)",
            }}
          >
            <Text
              selectable
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: Fonts.rounded,
              }}
            >
              おやすみなさい
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // 日中モード
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: "#F0FFDF" }}
      contentContainerStyle={{ paddingBottom: 28, gap: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
          paddingTop: 12,
        }}
      >
        <View
          style={{
            width: 28,
            height: 6,
            borderRadius: 999,
            backgroundColor: "#A8DF8E",
          }}
        />
        <View
          style={{
            width: 8,
            height: 6,
            borderRadius: 999,
            backgroundColor: "rgba(168, 223, 142, 0.3)",
          }}
        />
        <View
          style={{
            width: 8,
            height: 6,
            borderRadius: 999,
            backgroundColor: "rgba(168, 223, 142, 0.3)",
          }}
        />
      </View>

      <View style={{ paddingHorizontal: 24, alignItems: "center", gap: 18 }}>
        <View style={{ alignItems: "center", gap: 12 }}>
          <View style={{ position: "relative" }}>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 14,
                borderRadius: 999,
                borderWidth: 4,
                borderColor: "#FFFFFF",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT_5wjRFwJoR7GXTvgMqmJikC5wzKm5Yvp3tZ51nbh9qIp_B2W5vM_4o64OZATfYIfg6m0K3rehQKcXyDgjP9w8NLa-LwsBvlWlkdLQcZoGiu7gHOgZuBUoMtPoI6M7uz3n4v34ciT3Slcdb-GcVeUm4o3RbxRiy_mwc_ykFJaN1NMKQh4Fgcp43GPnEDHjTTt562Sdo7IGg_z8IfEDgX8s_tcePmkWWR_byDWHNs6LZclP9uErItqdq0vbRnDf9aPmfOTXFIOglFG",
                }}
                contentFit="cover"
                style={{ height: 96, width: 96, borderRadius: 48 }}
              />
            </View>
            <View
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                backgroundColor: "#FFAAB8",
                height: 28,
                width: 28,
                borderRadius: 999,
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 8px rgba(255, 170, 184, 0.4)",
              }}
            >
              <IconSymbol name="heart.fill" size={14} color="#FFFFFF" />
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "rgba(168, 223, 142, 0.2)",
              boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
              borderCurve: "continuous",
            }}
          >
            <View
              style={{
                position: "absolute",
                top: -6,
                left: "50%",
                marginLeft: -6,
                height: 12,
                width: 12,
                backgroundColor: "#FFFFFF",
                transform: [{ rotate: "45deg" }],
                borderLeftWidth: 1,
                borderTopWidth: 1,
                borderColor: "rgba(168, 223, 142, 0.2)",
              }}
            />
            <Text
              selectable
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#141712",
                textAlign: "center",
                fontFamily: Fonts.rounded,
              }}
            >
              今の気分を教えて？
            </Text>
            <Text
              selectable
              style={{
                fontSize: 12,
                color: "#718268",
                textAlign: "center",
                marginTop: 4,
                fontFamily: Fonts.rounded,
              }}
            >
              いつでもお話聞くよ。
            </Text>
          </View>
        </View>
      </View>

      <MoodInputSection placeholder="今の気持ちを自由に書いてね..." />

      <View style={{ paddingHorizontal: 24 }}>
        <Pressable
          style={{
            backgroundColor: "#A8DF8E",
            borderRadius: 999,
            paddingVertical: 16,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
            boxShadow: "0 10px 18px rgba(168, 223, 142, 0.4)",
          }}
        >
          <Text
            selectable
            style={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "700",
              fontFamily: Fonts.rounded,
            }}
          >
            記録を保存する
          </Text>
          <IconSymbol name="checkmark.circle.fill" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </ScrollView>
  );
}
