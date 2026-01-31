import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import { GrassBackground } from "@/components/grass-background";
import { IconSymbol, type IconSymbolName } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { getMascotState, getTodayQuests, type Mascot, type MascotStatus, type Quest } from "@/lib/api";

const MASCOT_IMAGES: Record<MascotStatus, number> = {
  Sad: require("@/assets/mascot/sad.png"),
  Bad: require("@/assets/mascot/bad.png"),
  Okay: require("@/assets/mascot/okay.png"),
  Good: require("@/assets/mascot/good.png"),
  Great: require("@/assets/mascot/great.png"),
};


export default function HomeScreen() {
  const { session } = useAuth();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mascot, setMascot] = useState<Mascot | null>(null);
  const [isMascotLoading, setIsMascotLoading] = useState(true);

  const userUuid = session?.user?.id;

  const fetchQuests = useCallback(async () => {
    if (!userUuid) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await getTodayQuests(userUuid);
      setQuests(data);
    } catch {
      // エラーは静かに処理（ホーム画面なので）
    }
  }, [userUuid]);

  const fetchMascot = useCallback(async () => {
    if (!userUuid) {
      setIsMascotLoading(false);
      return;
    }

    try {
      const data = await getMascotState(userUuid);
      setMascot(data);
    } catch {
      // エラーは静かに処理（ホーム画面なので）
      setMascot(null);
    }
  }, [userUuid]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setIsMascotLoading(true);
      await Promise.all([fetchQuests(), fetchMascot()]);
      setIsLoading(false);
      setIsMascotLoading(false);
    };
    load();
  }, [fetchMascot, fetchQuests]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchQuests(), fetchMascot()]);
    setIsRefreshing(false);
  };

  // 現在進行中のクエスト（未完了のクエストを最大3個表示）
  const currentQuests = quests.filter((q) => !q.completed).slice(0, 3);
  const completedCount = quests.filter((q) => q.completed).length;
  const progressPercent = quests.length > 0 ? (completedCount / quests.length) * 100 : 0;

  const mascotStatus = mascot?.status ?? "Okay";
  const mascotMessage = mascot?.message ?? "今日も一歩ずつ進もう。";

  return (
    <GrassBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 48, gap: 24 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
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
          <Image
            source={MASCOT_IMAGES[mascotStatus]}
            contentFit="contain"
            style={{ width: 220, height: 220 }}
          />
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
          {isMascotLoading ? (
            <View style={{ alignItems: "center" }}>
              <ActivityIndicator size="small" color="#A8DF8E" />
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
        <View
          style={{
            marginTop: 18,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(255,255,255,0.6)",
            paddingHorizontal: 18,
            paddingVertical: 8,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "rgba(168, 223, 142, 0.2)",
            boxShadow: "0 2px 8px rgba(168, 223, 142, 0.1)",
          }}
        >
          <IconSymbol
            name="person.3.fill"
            size={16}
            color="rgba(58, 77, 57, 0.6)"
          />
          <Text
            selectable
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: "rgba(58, 77, 57, 0.6)",
              fontFamily: Fonts.rounded,
            }}
          >
            14人がすれ違いました
          </Text>
        </View>
      </View>

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
            <ActivityIndicator size="small" color="#A8DF8E" />
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
              <Link href="/(tabs)/quests" asChild key={quest.id}>
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
                      クエスト {index + 1}/{currentQuests.length}
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
            ))}
          </View>
        ) : quests.length > 0 ? (
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
    </ScrollView>
    </GrassBackground>
  );
}
