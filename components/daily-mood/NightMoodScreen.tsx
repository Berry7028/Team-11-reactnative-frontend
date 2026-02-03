import { Image } from "expo-image";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { GrassBackground } from "@/components/grass-background";
import { MoodInputSection, type MoodInputData } from "@/components/mood-input-section";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export interface NightMoodScreenProps {
  hasSubmittedThisWindow: boolean;
  nextCountdown: string;
  nextWindowLabel: string;
  moodData: MoodInputData;
  onMoodChange: (data: MoodInputData) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function NightMoodScreen({
  hasSubmittedThisWindow,
  nextCountdown,
  nextWindowLabel,
  moodData: _moodData,
  onMoodChange,
  isSubmitting,
  onSubmit,
}: NightMoodScreenProps) {
  return (
    <GrassBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 8, gap: 20 }}
      >
        {hasSubmittedThisWindow ? (
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
        ) : (
          <>
            <View style={{ paddingHorizontal: 20 }}>
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
                    source={require("../../assets/images/bear.png")}
                    contentFit="contain"
                    style={{ width: 84, height: 84 }}
                  />
                </View>
              </View>
            </View>

            <MoodInputSection
              placeholder="今日あったことや、今の気持ちを全部吐き出してみてね..."
              onChange={onMoodChange}
            />

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
                onPress={onSubmit}
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  backgroundColor: "#FFAAB8",
                  borderRadius: 999,
                  paddingVertical: 16,
                  alignItems: "center",
                  boxShadow: "0 8px 18px rgba(255, 170, 184, 0.4)",
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFAAB8" />
                ) : (
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
                )}
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </GrassBackground>
  );
}
