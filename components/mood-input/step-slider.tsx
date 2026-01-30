import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Fonts } from "@/constants/theme";
import type { StepOption } from "./constants";

interface StepSliderProps {
  options: StepOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const SELECTED_COLOR_POSITIVE = "#A8DF8E";
const SELECTED_COLOR_NEGATIVE = "#FFAAB8";
const SELECTED_TEXT_COLOR_POSITIVE = "#FFFFFF";
const SELECTED_TEXT_COLOR_NEGATIVE = "#FFFFFF";

function isPositiveOption(id: string): boolean {
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

export function StepSlider({
  options,
  selectedId,
  onSelect,
}: StepSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const stepWidth = trackWidth > 0 ? trackWidth / (options.length - 1) : 0;

  const handlePressAt = (x: number) => {
    if (!stepWidth) return;
    const index = Math.max(
      0,
      Math.min(options.length - 1, Math.round(x / stepWidth)),
    );
    onSelect(options[index].id);
  };

  return (
    <View style={{ gap: 14 }}>
      <View
        onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
        onStartShouldSetResponder={() => true}
        onResponderRelease={(event) =>
          handlePressAt(event.nativeEvent.locationX)
        }
        style={{ height: 48, justifyContent: "center" }}
      >
        <View
          style={{
            height: 40,
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: "rgba(20, 23, 18, 0.12)",
            boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
            overflow: "hidden",
            flexDirection: "row",
            alignItems: "stretch",
          }}
        >
          {options.map((option, index) => {
            const isSelected = selectedId === option.id;
            const isPositive = isPositiveOption(option.id);
            const backgroundColor = isSelected
              ? isPositive
                ? SELECTED_COLOR_POSITIVE
                : SELECTED_COLOR_NEGATIVE
              : "rgba(255,255,255,0.9)";
            const textColor = isSelected
              ? isPositive
                ? SELECTED_TEXT_COLOR_POSITIVE
                : SELECTED_TEXT_COLOR_NEGATIVE
              : "rgba(20,23,18,0.5)";

            return (
              <Pressable
                key={option.id}
                onPress={() => onSelect(option.id)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor,
                }}
              >
                <Text
                  selectable
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: textColor,
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {option.label}
                </Text>
                {index < options.length - 1 && (
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 6,
                      bottom: 6,
                      width: 1,
                      backgroundColor: "rgba(20,23,18,0.12)",
                    }}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={{ height: 2 }} />
    </View>
  );
}
