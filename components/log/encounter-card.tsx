import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { AvatarImage } from "@/components/ui/avatar-image";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import type { EncounterWithQuests } from "@/lib/api";

type EncounterCardProps = {
  encounter: EncounterWithQuests;
  displayName: string;
  questText: string;
  stampSent: boolean;
  sending: boolean;
  onSendThanks: () => void;
};

export function EncounterCard({
  encounter,
  displayName,
  questText,
  stampSent,
  sending,
  onSendThanks,
}: EncounterCardProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#EEF1ED",
        shadowColor: "#141712",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
        borderCurve: "continuous",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}>
        <AvatarImage avatarUrl={encounter.other_user_avatar} size={56} />
        <View style={{ flex: 1 }}>
          <Text
            selectable
            style={{
              fontSize: 13,
              fontWeight: "700",
              color: "#141712",
              fontFamily: Fonts.rounded,
            }}
          >
            {displayName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 }}>
            <IconSymbol name="checkmark.seal.fill" size={14} color="#7DA15E" />
            <Text
              selectable
              numberOfLines={2}
              style={{
                fontSize: 12,
                color: "#718268",
                flexShrink: 1,
                fontFamily: Fonts.rounded,
              }}
            >
              {questText}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center", gap: 4 }}>
        <Pressable
          onPress={onSendThanks}
          disabled={stampSent || sending}
          style={{
            height: 44,
            width: 44,
            borderRadius: 999,
            backgroundColor: stampSent
              ? "rgba(216, 125, 142, 0.25)"
              : "rgba(255, 170, 184, 0.12)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {sending ? (
            <ActivityIndicator size="small" color="#FFAAB8" />
          ) : (
            <IconSymbol
              name="heart.fill"
              size={18}
              color={stampSent ? "#D87D8E" : "#FFAAB8"}
            />
          )}
        </Pressable>
        <Text
          selectable
          style={{
            fontSize: 10,
            fontWeight: "700",
            color: stampSent ? "#D87D8E" : "#FFAAB8",
            fontFamily: Fonts.rounded,
          }}
        >
          お疲れ様
        </Text>
      </View>
    </View>
  );
}
