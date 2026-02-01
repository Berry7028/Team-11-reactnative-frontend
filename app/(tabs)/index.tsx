import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
} from "react-native";

import { GrassBackground } from "@/components/grass-background";
import { HomeQuestSection } from "@/components/home/home-quest-section";
import { MascotHero } from "@/components/home/mascot-hero";
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
  const [animationKey, setAnimationKey] = useState(0);

  const userUuid = session?.user?.id;

  const fetchQuests = useCallback(async () => {
    if (!userUuid) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await getTodayQuests(userUuid);
      setQuests(data);
      // クエスト取得時にアニメーションをトリガー
      setAnimationKey((prev) => prev + 1);
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
        <MascotHero
          mascotImage={MASCOT_IMAGES[mascotStatus]}
          isMascotLoading={isMascotLoading}
          mascotMessage={mascotMessage}
        />
        <HomeQuestSection
          isLoading={isLoading}
          currentQuests={currentQuests}
          questsCount={quests.length}
          progressPercent={progressPercent}
          animationKey={animationKey}
        />
    </ScrollView>
    </GrassBackground>
  );
}
