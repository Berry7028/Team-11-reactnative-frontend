import React from "react";
import { Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import type { StepOption } from "./constants";

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
      {selectedOption ? (
        <View
          style={{
            marginLeft: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            backgroundColor: selectedOption.color,
            borderWidth: 1,
            borderColor: "rgba(20, 23, 18, 0.12)",
          }}
        >
          <IconSymbol
            name={selectedOption.icon}
            size={12}
            color={selectedOption.text}
          />
          <Text
            selectable
            style={{
              fontSize: 11,
              fontWeight: "700",
              color: selectedOption.text,
              fontFamily: Fonts.rounded,
            }}
          >
            {selectedOption.label}
          </Text>
        </View>
      ) : (
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
