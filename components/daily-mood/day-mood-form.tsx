import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { MoodInputSection, type MoodInputData } from "@/components/mood-input-section";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

type DayMoodFormProps = {
  onMoodChange: (data: MoodInputData) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export function DayMoodForm({
  onMoodChange,
  onSubmit,
  isSubmitting,
}: DayMoodFormProps) {
  return (
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
  );
}
