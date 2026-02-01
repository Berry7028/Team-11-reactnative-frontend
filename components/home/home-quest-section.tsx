import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { AnimatedQuestCard } from "@/components/home/animated-quest-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import type { Quest } from "@/lib/api";

type HomeQuestSectionProps = {
  isLoading: boolean;
  currentQuests: Quest[];
  questsCount: number;
  progressPercent: number;
  animationKey: number;
};

export function HomeQuestSection({
  isLoading,
  currentQuests,
  questsCount,
  progressPercent,
  animationKey,
}: HomeQuestSectionProps) {
  return (
    <View style={{ paddingHorizontal: 16, gap: 16 }}>
      {isLoading ? (
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: 24,
            borderRadius: 24,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.9)",
            boxShadow: "0 12px 24px rgba(168, 223, 142, 0.2)",
            borderCurve: "continuous",
          }}
        >
          <ActivityIndicator size="small" color="#FFAAB8" />
          <Text
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "rgba(58, 77, 57, 0.6)",
              fontFamily: Fonts.rounded,
            }}
          >
            読み込み中...
          </Text>
        </View>
      ) : currentQuests.length > 0 ? (
        <View style={{ gap: 12 }}>
          {currentQuests.map((quest, index) => (
            <AnimatedQuestCard
              key={`${quest.id}-${animationKey}`}
              quest={quest}
              index={index}
              totalCount={currentQuests.length}
              progressPercent={progressPercent}
            />
          ))}
        </View>
      ) : questsCount > 0 ? (
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: 24,
            borderRadius: 24,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.9)",
            boxShadow: "0 12px 24px rgba(168, 223, 142, 0.2)",
            borderCurve: "continuous",
          }}
        >
          <IconSymbol name="checkmark.circle.fill" size={32} color="#FFAAB8" />
          <Text
            style={{
              marginTop: 8,
              fontSize: 14,
              fontWeight: "700",
              color: "#3A4D39",
              fontFamily: Fonts.rounded,
            }}
          >
            今日のクエスト完了！
          </Text>
          <Text
            style={{
              marginTop: 4,
              fontSize: 12,
              color: "rgba(58, 77, 57, 0.6)",
              fontFamily: Fonts.rounded,
            }}
          >
            お疲れ様でした 🎉
          </Text>
        </View>
      ) : (
        <Link href="/(tabs)/daily-mood" asChild>
          <Pressable
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              padding: 24,
              borderRadius: 24,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.9)",
              boxShadow: "0 12px 24px rgba(168, 223, 142, 0.2)",
              borderCurve: "continuous",
            }}
          >
            <IconSymbol name="sparkles" size={32} color="#FFAAB8" />
            <Text
              style={{
                marginTop: 8,
                fontSize: 14,
                fontWeight: "700",
                color: "#3A4D39",
                fontFamily: Fonts.rounded,
              }}
            >
              今日の気分を記録しよう
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 12,
                color: "rgba(58, 77, 57, 0.6)",
                fontFamily: Fonts.rounded,
              }}
            >
              タップしてクエストを生成
            </Text>
          </Pressable>
        </Link>
      )}
    </View>
  );
}
