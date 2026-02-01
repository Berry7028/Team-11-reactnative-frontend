import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, ScrollView, Text, View } from 'react-native';

import { GrassBackground } from '@/components/grass-background';
import { QuestEmptyState } from '@/components/quests/quest-empty-state';
import { QuestIntroCard } from '@/components/quests/quest-intro-card';
import { QuestList } from '@/components/quests/quest-list';
import { QuestProgress } from '@/components/quests/quest-progress';
import { Fonts } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { ApiRequestError, getTodayQuests, toggleQuestComplete, type Quest } from '@/lib/api';

export default function QuestsScreen() {
  const { session } = useAuth();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [togglingQuestId, setTogglingQuestId] = useState<number | null>(null);
  const [fireworkQuestId, setFireworkQuestId] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const userUuid = session?.user?.id;

  const fetchQuests = useCallback(async () => {
    if (!userUuid) return;

    try {
      const data = await getTodayQuests(userUuid);
      setQuests(data);
      // クエストが取得されたらアニメーションをトリガー
      setAnimationKey(prev => prev + 1);
    } catch (error) {
      const message =
        error instanceof ApiRequestError
          ? error.message
          : 'クエストの取得に失敗しました';
      Alert.alert('エラー', message);
    }
  }, [userUuid]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await fetchQuests();
      setIsLoading(false);
    };
    load();
  }, [fetchQuests]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchQuests();
    setIsRefreshing(false);
  };

  const handleToggleComplete = async (questId: number) => {
    if (!userUuid) return;

    const quest = quests.find((q) => q.id === questId);
    const isCompleting = quest && !quest.completed;

    setTogglingQuestId(questId);
    try {
      const updatedQuest = await toggleQuestComplete(userUuid, questId);
      setQuests((prev) =>
        prev.map((q) => (q.id === questId ? updatedQuest : q))
      );

      // クエストを達成した場合のみ花火エフェクトを表示
      if (isCompleting) {
        setFireworkQuestId(questId);
      }
    } catch (error) {
      const message =
        error instanceof ApiRequestError
          ? error.message
          : 'クエストの更新に失敗しました';
      Alert.alert('エラー', message);
    } finally {
      setTogglingQuestId(null);
    }
  };

  const completedCount = quests.filter((q) => q.completed).length;
  return (
    <GrassBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: 'transparent' }}
        contentContainerStyle={{ paddingBottom: 28, paddingTop: 8, gap: 20 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
      <QuestProgress completedCount={completedCount} totalCount={quests.length} />
      <QuestIntroCard />

      {isLoading ? (
        <View style={{ paddingVertical: 40, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FFAAB8" />
          <Text
            style={{
              marginTop: 12,
              color: '#5C5254',
              fontFamily: Fonts.rounded,
            }}
          >
            クエストを読み込み中...
          </Text>
        </View>
      ) : quests.length === 0 ? (
        <QuestEmptyState />
      ) : (
        <QuestList
          quests={quests}
          animationKey={animationKey}
          togglingQuestId={togglingQuestId}
          fireworkQuestId={fireworkQuestId}
          onToggleComplete={handleToggleComplete}
          onFireworkComplete={() => setFireworkQuestId(null)}
        />
      )}
      </ScrollView>
    </GrassBackground>
  );
}
