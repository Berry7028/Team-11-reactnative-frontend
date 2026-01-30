import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Fonts } from "@/constants/theme";
import type { StepOption } from "./constants";

interface StepSliderProps {
  options: StepOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
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
          {options.map((option, index) => (
            <Pressable
              key={option.id}
              onPress={() => onSelect(option.id)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  selectedId === option.id
                    ? option.color
                    : "rgba(255,255,255,0.9)",
              }}
            >
              <Text
                selectable
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color:
                    selectedId === option.id
                      ? option.text
                      : "rgba(20,23,18,0.5)",
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
          ))}
        </View>
      </View>

      <View style={{ height: 2 }} />
    </View>
  );
}
