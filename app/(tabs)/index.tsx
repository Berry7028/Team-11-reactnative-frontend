import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

import { GrassBackground } from "@/components/grass-background";
import { MascotSection } from "@/components/home/mascot-section";
import { QuestListSection } from "@/components/home/quest-list-section";
import { useAuth } from "@/hooks/use-auth";
import { getMascotState, getTodayQuests, type Mascot, type Quest } from "@/lib/api";

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
      <MascotSection mascot={mascot} isLoading={isMascotLoading} />

      <QuestListSection quests={quests} isLoading={isLoading} animationKey={animationKey} />
    </ScrollView>
    </GrassBackground>
  );
}
