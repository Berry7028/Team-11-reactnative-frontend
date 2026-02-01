import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Easing, Pressable, Text, View } from "react-native";

import { FireworksEffect } from "@/components/fireworks-effect";
import { IconSymbol, type IconSymbolName } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import type { Quest } from "@/lib/api";

const QUEST_ICONS: Record<string, IconSymbolName> = {
  relaxation: "sparkles",
  relax: "cup.and.saucer.fill",
  refresh: "sun.max.fill",
  exercise: "figure.walk",
  default: "heart.fill",
};

const DEFAULT_QUEST_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAfNbcIQ1avdjPGROSw-cLh0X51mem4kfBqg95eQgebD7GxgNjvMmVMIzkcqLlWPdfzSaXWLIsM5baeK2O3TwTDsgo8A2v46l1f2d-rr4z640NcM1Wmug6BY2AhDPGrCjQCDAUqJi2Fofn2DqMgSfyYfdyv5cWEFLVgr7TqC7XDfR9HL6IISrCuamnm8KVD2BMS5S15iVervdhdT8qx0qTritiW1jpU4KKyXfuXdvLa6tU1OJyh4Ut0FBAfG2KBn95T1vqQQGvWvGgA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAN2AX1o1Q8e4jng34h23w_0a-tPK_m6-onNZQPHUJgRqfmdVAlhi0R58ELEXEjhbOGUkOzBJwXhsseyZ2FBi58OjJOZWIj2seacQtc4FneFXY5cNArNXzlPBIILLA9zuV5xUelKtcjCN8fFhpk5db9oGdysI7sbQZhNvKjGimxzZ2xY3pLXlf48PFn6N4X7tCM7Jyy1PED2oMk29GVkJJyTzF4257vUXmWV-sKHKsDVwz0_unMaQgD_8wKFGRjbSPUTZEUki5KhLtd",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAcfp6lKYsSqV-9Wy31EK4fxUXZTE-2TughJyq06Epwtcc39YfIeKqQfK6K86FkATTXPizX5wCdE0f5qN_ZNF70gh31Rd7fxSUWH2CI7RPdQ-RsFP1sCfSYsr23bjve1lpee2AWFahHYXLrDh-3oG6s46zUgjckbaAn9HzBekY7TAFYGGpmeBdgZSi3uro8XvuO_BS_Mf5wS7aZFaDGB8xjTgId5ap312WMm8PyobnHJt7Ag7Z614N4RX9Jq-kdcPQyEDMNq1z7nHuI",
];

type AnimatedQuestCardProps = {
  quest: Quest;
  index: number;
  isToggling: boolean;
  onToggle: (questId: number) => void;
  showFireworks: boolean;
  onFireworkComplete: () => void;
};

export function AnimatedQuestCard({
  quest,
  index,
  isToggling,
  onToggle,
  showFireworks,
  onFireworkComplete,
}: AnimatedQuestCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const delay = index * 150;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
    ]).start();
  }, [fadeAnim, index, scaleAnim, slideAnim]);

  const isHighlighted = index === 0;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <View
        style={{
          backgroundColor: isHighlighted ? "#FFD8DF" : "#FFFFFF",
          borderRadius: 28,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: isHighlighted ? "rgba(255, 170, 184, 0.2)" : "#F1E6E8",
          boxShadow: "0 8px 18px rgba(255, 170, 184, 0.12)",
          borderCurve: "continuous",
          opacity: quest.completed ? 0.7 : 1,
        }}
      >
        <Image
          source={{ uri: DEFAULT_QUEST_IMAGES[index % DEFAULT_QUEST_IMAGES.length] }}
          contentFit="cover"
          style={{ height: 170, width: "100%" }}
        />
        <View style={{ padding: 20, gap: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Text
                selectable
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  letterSpacing: 2,
                  color: isHighlighted ? "#332D2E" : "rgba(51, 45, 46, 0.6)",
                  fontFamily: Fonts.rounded,
                }}
              >
                {quest.completed ? "完了済み" : "QUEST"}
              </Text>
              <Text
                selectable
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#332D2E",
                  marginTop: 6,
                  lineHeight: 24,
                  fontFamily: Fonts.rounded,
                  textDecorationLine: quest.completed ? "line-through" : "none",
                }}
              >
                {quest.title}
              </Text>
              {quest.description && (
                <Text
                  selectable
                  style={{
                    fontSize: 12,
                    color: "#5C5254",
                    marginTop: 4,
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {quest.description}
                </Text>
              )}
            </View>
            <IconSymbol
              name={quest.completed ? "checkmark.circle.fill" : QUEST_ICONS.default}
              size={28}
              color={quest.completed ? "#A8DF8E" : "#FFAAB8"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: 12,
              position: "relative",
            }}
          >
            <View style={{ position: "relative" }}>
              {showFireworks && <FireworksEffect onComplete={onFireworkComplete} />}
              <Pressable
                onPress={() => onToggle(quest.id)}
                disabled={isToggling}
                style={{
                  height: 44,
                  paddingHorizontal: 18,
                  borderRadius: 999,
                  backgroundColor: quest.completed ? "#94A3B8" : "#FFAAB8",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: quest.completed
                    ? "0 6px 14px rgba(148, 163, 184, 0.4)"
                    : "0 6px 14px rgba(255, 170, 184, 0.4)",
                  opacity: isToggling ? 0.7 : 1,
                }}
              >
                {isToggling ? (
                  <ActivityIndicator size="small" color="#FFAAB8" />
                ) : (
                  <>
                    <IconSymbol
                      name="sparkles"
                      size={18}
                      color="#FFFFFF"
                    />
                    <Text
                      selectable
                      style={{
                        color: "#FFFFFF",
                        fontSize: 12,
                        fontWeight: "700",
                        fontFamily: Fonts.rounded,
                      }}
                    >
                      {quest.completed ? "戻す" : "達成！"}
                    </Text>
                  </>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
