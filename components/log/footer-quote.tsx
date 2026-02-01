import React from "react";
import { Text, View } from "react-native";

import { Fonts } from "@/constants/theme";

export function FooterQuote() {
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 12, alignItems: "center", gap: 10 }}>
      <Text
        selectable
        style={{
          fontSize: 12,
          color: "#718268",
          fontStyle: "italic",
          textAlign: "center",
          fontFamily: Fonts.rounded,
        }}
      >
        &quot;みんな、今日も自分なりに頑張っています。&quot;
      </Text>
      <View style={{ flexDirection: "row", gap: 6 }}>
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            backgroundColor: "rgba(255, 170, 184, 0.4)",
          }}
        />
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            backgroundColor: "rgba(255, 170, 184, 0.4)",
          }}
        />
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            backgroundColor: "rgba(255, 170, 184, 0.4)",
          }}
        />
      </View>
    </View>
  );
}
