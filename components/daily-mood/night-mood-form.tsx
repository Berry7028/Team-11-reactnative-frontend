import { Image } from "expo-image";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { MoodInputSection, type MoodInputData } from "@/components/mood-input-section";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

type NightMoodFormProps = {
  onMoodChange: (data: MoodInputData) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export function NightMoodForm({
  onMoodChange,
  onSubmit,
  isSubmitting,
}: NightMoodFormProps) {
  return (
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
  );
}
