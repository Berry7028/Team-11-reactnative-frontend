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

const ACTIONS: { label: string; icon: IconSymbolName; active?: boolean }[] = [
  { label: "元気づけて", icon: "sparkles", active: true },
  { label: "話を聞いて", icon: "ear" },
  { label: "落ち着きたい", icon: "heart.fill" },
  { label: "挑戦する", icon: "figure.walk" },
];

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

  // 現在進行中のクエスト（未完了の最初のクエスト）
  const currentQuest = quests.find((q) => !q.completed);
  const completedCount = quests.filter((q) => q.completed).length;
  const progressPercent = quests.length > 0 ? (completedCount / quests.length) * 100 : 0;

  const mascotStatus = mascot?.status ?? "Okay";
  const mascotMessage = mascot?.message ?? "今日も一歩ずつ進もう。";

  return (
    <GrassBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 8, gap: 20 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              height: 44,
              width: 44,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.7)",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(58, 77, 57, 0.1)",
              borderCurve: "continuous",
            }}
          >
            <IconSymbol name="person.fill" size={20} color="#3A4D39" />
          </View>
          <View style={{ alignItems: "center" }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <IconSymbol name="heart.fill" size={14} color="#A8DF8E" />
              <Text
                selectable
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: "rgba(58, 77, 57, 0.7)",
                  letterSpacing: 1,
                  fontFamily: Fonts.rounded,
                }}
              >
                12日連続
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 44,
              width: 44,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.7)",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(58, 77, 57, 0.1)",
              borderCurve: "continuous",
            }}
          >
            <IconSymbol name="bell" size={20} color="#3A4D39" />
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {ACTIONS.map((action) => (
          <View
            key={action.label}
            style={{
              height: 40,
              paddingHorizontal: 18,
              borderRadius: 999,
              backgroundColor: action.active
                ? "#A8DF8E"
                : "rgba(255,255,255,0.65)",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              borderWidth: 1,
              borderColor: action.active
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.4)",
              boxShadow: "0 2px 8px rgba(58, 77, 57, 0.12)",
              borderCurve: "continuous",
            }}
          >
            <IconSymbol
              name={action.icon}
              size={18}
              color={action.active ? "#FFFFFF" : "#3A4D39"}
            />
            <Text
              selectable
              style={{
                fontSize: 12,
                fontWeight: action.active ? "700" : "600",
                color: action.active ? "#FFFFFF" : "#3A4D39",
                fontFamily: Fonts.rounded,
              }}
            >
              {action.label}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 16,
          alignItems: "center",
          justifyContent: "center",
          minHeight: 340,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
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
            marginTop: 20,
            backgroundColor: "rgba(255,255,255,0.9)",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: "#FFFFFF",
            boxShadow: "0 8px 20px rgba(58, 77, 57, 0.08)",
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
                fontSize: 16,
                fontWeight: "700",
                textAlign: "center",
                lineHeight: 22,
                fontFamily: Fonts.rounded,
              }}
            >
              {mascotMessage}
            </Text>
          )}
        </View>
        <View
          style={{
            marginTop: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: "rgba(255,255,255,0.45)",
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.4)",
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
        ) : currentQuest ? (
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
                  backgroundColor: "rgba(168, 223, 142, 0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconSymbol name="wind" size={28} color="#A8DF8E" />
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
                  現在のクエスト ({completedCount}/{quests.length})
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
                  {currentQuest.title}
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
            <IconSymbol name="checkmark.circle.fill" size={32} color="#A8DF8E" />
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
              <IconSymbol name="sparkles" size={32} color="#A8DF8E" />
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
