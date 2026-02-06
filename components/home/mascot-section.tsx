import { Image } from "expo-image";
import React, { useMemo } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import type { Mascot, MascotImageUrls, MascotStatus } from "@/lib/api";

const MASCOT_IMAGES: Record<MascotStatus, number> = {
  Sad: require("@/assets/mascot/sad.png"),
  Bad: require("@/assets/mascot/bad.png"),
  Okay: require("@/assets/mascot/okay.png"),
  Good: require("@/assets/mascot/good.png"),
  Great: require("@/assets/mascot/great.png"),
};

interface MascotSectionProps {
  mascot: Mascot | null;
  isLoading: boolean;
  imageUrls?: MascotImageUrls;
}

export function MascotSection({ mascot, isLoading, imageUrls }: MascotSectionProps) {
  const mascotStatus = mascot?.status ?? "Okay";
  const mascotMessage = mascot?.message ?? "今日も一歩ずつ進もう。";
  const imageSource = useMemo(() => {
    if (imageUrls && imageUrls[mascotStatus]) {
      return { uri: imageUrls[mascotStatus] };
    }
    return MASCOT_IMAGES[mascotStatus];
  }, [imageUrls, mascotStatus]);

  return (
    <View
      style={{
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 360,
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center", position: "relative" }}>
        {/* 装飾用の小さなアイコン */}
        <View
          style={{
            position: "absolute",
            top: -20,
            left: 40,
            width: 32,
            height: 32,
            borderRadius: 999,
            backgroundColor: "rgba(168, 223, 142, 0.2)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconSymbol name="sparkles" size={18} color="#A8DF8E" />
        </View>
        <View
          style={{
            position: "absolute",
            top: 20,
            right: 30,
            width: 28,
            height: 28,
            borderRadius: 999,
            backgroundColor: "rgba(168, 223, 142, 0.15)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconSymbol name="heart.fill" size={14} color="#A8DF8E" />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: -10,
            left: 50,
            width: 24,
            height: 24,
            borderRadius: 999,
            backgroundColor: "rgba(168, 223, 142, 0.18)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconSymbol name="star.fill" size={12} color="#A8DF8E" />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 30,
            right: 40,
            width: 30,
            height: 30,
            borderRadius: 999,
            backgroundColor: "rgba(168, 223, 142, 0.2)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconSymbol name="leaf.fill" size={16} color="#A8DF8E" />
        </View>
        <View
          style={{
            position: "absolute",
            height: 220,
            width: 220,
            borderRadius: 999,
            backgroundColor: "rgba(168, 223, 142, 0.22)",
            transform: [{ scale: 0.9 }],
            boxShadow: "0 0 60px rgba(168, 223, 142, 0.5)",
          }}
        />
        <View
          style={{
            width: 220,
            height: 220,
            borderRadius: 999,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            borderWidth: 2,
            borderColor: "rgba(0,0,0,0.7)",
            boxShadow: "0 0 64px rgba(255,255,255,0.55)",
            shadowColor: "#FFFFFF",
            shadowOpacity: 0.75,
            shadowRadius: 34,
            shadowOffset: { width: 0, height: 0 },
          }}
        >
          <Image
            source={imageSource}
            contentFit="cover"
            style={{ width: 220, height: 160 }}
          />
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              borderWidth: 28,
              borderColor: "rgba(255,255,255,0.18)",
              boxShadow: "inset 0 0 48px rgba(255,255,255,0.7)",
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: 999,
              borderWidth: 16,
              borderColor: "rgba(255,255,255,0.16)",
              boxShadow: "0 0 56px rgba(255,255,255,0.45)",
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              inset: -18,
              borderRadius: 999,
              borderWidth: 20,
              borderColor: "rgba(255,255,255,0.1)",
              boxShadow: "0 0 72px rgba(255,255,255,0.35)",
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 24,
          backgroundColor: "rgba(255,255,255,0.95)",
          paddingHorizontal: 24,
          paddingVertical: 20,
          borderRadius: 24,
          borderWidth: 2,
          borderColor: "rgba(168, 223, 142, 0.3)",
          boxShadow: "0 8px 24px rgba(168, 223, 142, 0.15)",
          borderCurve: "continuous",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: -8,
            left: "50%",
            marginLeft: -8,
            height: 16,
            width: 16,
            backgroundColor: "rgba(255,255,255,0.9)",
            transform: [{ rotate: "45deg" }],
            borderLeftWidth: 1,
            borderTopWidth: 1,
            borderColor: "#FFFFFF",
          }}
        />
        {isLoading ? (
          <View style={{ alignItems: "center" }}>
            <ActivityIndicator size="small" color="#FFAAB8" />
            <Text
              style={{
                marginTop: 8,
                fontSize: 12,
                color: "rgba(58, 77, 57, 0.6)",
                fontFamily: Fonts.rounded,
              }}
            >
              メッセージ読み込み中...
            </Text>
          </View>
        ) : (
          <Text
            selectable
            style={{
              color: "#3A4D39",
              fontSize: 17,
              fontWeight: "700",
              textAlign: "center",
              lineHeight: 26,
              fontFamily: Fonts.rounded,
              letterSpacing: 0.2,
            }}
          >
            {mascotMessage}
          </Text>
        )}
      </View>
    </View>
  );
}
