import React from "react";
import { Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import type { StepOption } from "./constants";

// 選択時の統一色（ポジティブ系とネガティブ系）
const SELECTED_COLOR_POSITIVE = "#A8DF8E"; // ポジティブ系の選択色
const SELECTED_COLOR_NEGATIVE = "#FFAAB8"; // ネガティブ系の選択色
const SELECTED_TEXT_COLOR_POSITIVE = "#FFFFFF"; // ポジティブ系のテキスト色
const SELECTED_TEXT_COLOR_NEGATIVE = "#FFFFFF"; // ネガティブ系のテキスト色

// オプションIDからポジティブ/ネガティブを判定
function isPositiveOption(id: string): boolean {
  // MOODS: ポジティブ系（great, good, ok）
  // BODY_STATES: ポジティブ系（light, slightly-light, normal）
  const positiveIds = [
    "great",
    "good",
    "ok",
    "light",
    "slightly-light",
    "normal",
  ];
  return positiveIds.includes(id);
}

interface SelectionHeaderProps {
  title: string;
  accentColor: string;
  emptyLabel: string;
  selectedOption?: StepOption;
}

export function SelectionHeader({
  title,
  accentColor,
  emptyLabel,
  selectedOption,
}: SelectionHeaderProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <View
        style={{
          width: 4,
          height: 20,
          borderRadius: 999,
          backgroundColor: accentColor,
        }}
      />
      <Text
        selectable
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: "#141712",
          fontFamily: Fonts.rounded,
        }}
      >
        {title}
      </Text>
      {selectedOption ? (() => {
        const isPositive = isPositiveOption(selectedOption.id);
        const backgroundColor = isPositive
          ? SELECTED_COLOR_POSITIVE
          : SELECTED_COLOR_NEGATIVE;
        const textColor = isPositive
          ? SELECTED_TEXT_COLOR_POSITIVE
          : SELECTED_TEXT_COLOR_NEGATIVE;

        return (
          <View
            style={{
              marginLeft: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 999,
              backgroundColor,
              borderWidth: 1,
              borderColor: "rgba(20, 23, 18, 0.12)",
            }}
          >
            <IconSymbol
              name={selectedOption.icon}
              size={12}
              color={textColor}
            />
            <Text
              selectable
              style={{
                fontSize: 11,
                fontWeight: "700",
                color: textColor,
                fontFamily: Fonts.rounded,
              }}
            >
              {selectedOption.label}
            </Text>
          </View>
        );
      })() : (
        <Text
          selectable
          style={{
            marginLeft: 8,
            fontSize: 11,
            color: "#718268",
            fontWeight: "600",
            fontFamily: Fonts.rounded,
          }}
        >
          {emptyLabel}
        </Text>
      )}
    </View>
  );
}
