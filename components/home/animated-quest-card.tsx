import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import type { Quest } from "@/lib/api";

type AnimatedQuestCardProps = {
  quest: Quest;
  index: number;
  totalCount: number;
  progressPercent: number;
};

export function AnimatedQuestCard({
  quest,
  index,
  totalCount,
  progressPercent,
}: AnimatedQuestCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const delay = index * 120;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        friction: 8,
        tension: 50,
      }),
    ]).start();
  }, [fadeAnim, index, scaleAnim, slideAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <Link href="/(tabs)/quests" asChild>
        <Pressable
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: 16,
            borderRadius: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.9)",
            boxShadow: "0 12px 24px rgba(168, 223, 142, 0.2)",
            borderCurve: "continuous",
          }}
        >
          <View
            style={{
              height: 56,
              width: 56,
              borderRadius: 18,
              backgroundColor: "rgba(255, 170, 184, 0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconSymbol name="wind" size={28} color="#FFAAB8" />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              selectable
              style={{
                fontSize: 10,
                fontWeight: "700",
                color: "#A8DF8E",
                letterSpacing: 0.5,
                fontFamily: Fonts.rounded,
              }}
            >
              クエスト {index + 1}/{totalCount}
            </Text>
            <Text
              selectable
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#3A4D39",
                marginTop: 4,
                fontFamily: Fonts.rounded,
              }}
              numberOfLines={1}
            >
              {quest.title}
            </Text>
            <View
              style={{
                marginTop: 10,
                height: 8,
                borderRadius: 999,
                backgroundColor: "rgba(168, 223, 142, 0.15)",
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  borderRadius: 999,
                  backgroundColor: "#A8DF8E",
                  boxShadow: "0 0 10px rgba(168, 223, 142, 0.6)",
                }}
              />
            </View>
          </View>
          <View
            style={{
              height: 44,
              width: 44,
              borderRadius: 999,
              backgroundColor: "#A8DF8E",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 16px rgba(168, 223, 142, 0.3)",
            }}
          >
            <IconSymbol name="chevron.right" size={18} color="#FFFFFF" />
          </View>
        </Pressable>
      </Link>
    </Animated.View>
  );
}
