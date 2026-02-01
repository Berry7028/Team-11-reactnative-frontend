import React from "react";
import { ScrollView, Text, View } from "react-native";

import { GrassBackground } from "@/components/grass-background";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

type LockedViewProps = {
  message: string;
};

export function LockedView({ message }: LockedViewProps) {
  return (
    <GrassBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 20, gap: 20 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 24, paddingTop: 40, alignItems: "center", gap: 16 }}>
          <View
            style={{
              padding: 20,
              borderRadius: 999,
              backgroundColor: "rgba(168, 223, 142, 0.15)",
            }}
          >
            <IconSymbol name="lock.fill" size={48} color="#FFAAB8" />
          </View>
          <Text
            selectable
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#141712",
              textAlign: "center",
              fontFamily: Fonts.rounded,
            }}
          >
            すれ違った仲間を見るには
          </Text>
          <Text
            selectable
            style={{
              fontSize: 14,
              color: "#718268",
              textAlign: "center",
              fontFamily: Fonts.rounded,
              lineHeight: 22,
            }}
          >
            {message}
          </Text>
        </View>
      </ScrollView>
    </GrassBackground>
  );
}
