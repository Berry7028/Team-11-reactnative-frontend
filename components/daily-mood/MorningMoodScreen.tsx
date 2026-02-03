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

export interface MorningMoodScreenProps {
  hasSubmittedThisWindow: boolean;
  nextCountdown: string;
  nextWindowLabel: string;
  moodData: MoodInputData;
  onMoodChange: (data: MoodInputData) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function MorningMoodScreen({
  hasSubmittedThisWindow,
  nextCountdown,
  nextWindowLabel,
  moodData: _moodData,
  onMoodChange,
  isSubmitting,
  onSubmit,
}: MorningMoodScreenProps) {
  return (
    <GrassBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentContainerStyle={{ paddingBottom: 28, paddingTop: 8, gap: 20 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {!hasSubmittedThisWindow && (
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
        )}

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
        ) : (
          <>
            <MoodInputSection
              placeholder="今の気持ちを自由に書いてね..."
              onChange={onMoodChange}
            />

            <View style={{ paddingHorizontal: 24 }}>
              <Pressable
                onPress={onSubmit}
                disabled={isSubmitting}
                style={{
                  backgroundColor: "#A8DF8E",
                  borderRadius: 999,
                  paddingVertical: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 8,
                  boxShadow: "0 10px 18px rgba(168, 223, 142, 0.4)",
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFAAB8" />
                ) : (
                  <>
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
                    <IconSymbol
                      name="checkmark.circle.fill"
                      size={18}
                      color="#FFFFFF"
                    />
                  </>
                )}
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </GrassBackground>
  );
}
