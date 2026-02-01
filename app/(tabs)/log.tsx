import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GrassBackground } from '@/components/grass-background';
import { EncounterList } from '@/components/log/encounter-list';
import { EmptyState } from '@/components/log/empty-state';
import { FooterQuote } from '@/components/log/footer-quote';
import { LockedView } from '@/components/log/locked-view';
import { SummaryCards } from '@/components/log/summary-cards';
import { useNightQuestionnaire } from '@/hooks/use-night-questionnaire';
import {
  getMyEncounters,
  getThanksStampSentByEncounterIds,
  getThanksStampsReceivedCountToday,
  sendThanksStamp,
  type EncounterWithQuests,
} from '@/lib/api';

const DEBUG_SHOW_ENCOUNTERS_WITHOUT_NIGHT_KEY = 'debug:showEncountersWithoutNight';

const getDebugShowEncountersWithoutNight = async (): Promise<boolean> => {
  try {
    const raw = await AsyncStorage.getItem(DEBUG_SHOW_ENCOUNTERS_WITHOUT_NIGHT_KEY);
    return raw === 'true';
  } catch {
    return false;
  }
};

const CARD_ROW_MARGIN = 16;
const CARD_GAP = 14;

export default function LogScreen() {
  const { isCompleted, isLoading: isLoadingQuestionnaire } = useNightQuestionnaire();
  const [encounters, setEncounters] = useState<EncounterWithQuests[]>([]);
  const [isLoadingEncounters, setIsLoadingEncounters] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [thanksStampsCount, setThanksStampsCount] = useState(0);
  const [stampSentIds, setStampSentIds] = useState<Set<number>>(new Set());
  const [sendingEncounterId, setSendingEncounterId] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const contentWidth = windowWidth - insets.left - insets.right;
  const cardWidth = Math.floor((contentWidth - CARD_ROW_MARGIN * 2 - CARD_GAP) / 2);

  // デバッグモードの状態を読み込む（画面がフォーカスされるたびに再読み込み）
  useFocusEffect(
    useCallback(() => {
      const loadDebugMode = async () => {
        const isDebugMode = await getDebugShowEncountersWithoutNight();
        setDebugMode(isDebugMode);
      };
      loadDebugMode();
    }, [])
  );

  // すれ違い情報を取得
  const loadEncounters = useCallback(async () => {
    if (!(debugMode || isCompleted)) return;

    setIsLoadingEncounters(true);
    try {
      const data = await getMyEncounters();
      // 今日のすれ違いのみをフィルタ
      const today = new Date().toISOString().split('T')[0];
      const todayEncounters = data.filter((encounter) => {
        const encounterDate = new Date(encounter.last_seen_at).toISOString().split('T')[0];
        return encounterDate === today;
      });
      setEncounters(todayEncounters);
    } catch (error) {
      console.error('すれ違い情報の取得に失敗:', error);
    } finally {
      setIsLoadingEncounters(false);
    }
  }, [debugMode, isCompleted]);

  // プルダウンリフレッシュハンドラ
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadEncounters();
    // スタンプデータも更新
    if (encounters.length > 0) {
      try {
        const [count, sentSet] = await Promise.all([
          getThanksStampsReceivedCountToday(),
          getThanksStampSentByEncounterIds(encounters.map((e) => e.id)),
        ]);
        setThanksStampsCount(count);
        setStampSentIds(sentSet);
      } catch (error) {
        console.error('スタンプデータの更新に失敗:', error);
      }
    }
    setIsRefreshing(false);
  }, [loadEncounters, encounters]);

  useEffect(() => {
    // デバッグモードがON、または夜アンケートが完了している場合に取得
    if ((debugMode || isCompleted) && !isLoadingQuestionnaire) {
      loadEncounters();
    }
  }, [isCompleted, isLoadingQuestionnaire, debugMode, loadEncounters]);

  // ログに表示される人が変わったときにスタンプ表示をリセット（件数・送付済み）
  useEffect(() => {
    if (!isLoadingEncounters) {
      const loadStampData = async () => {
        const [count, sentSet] = await Promise.all([
          getThanksStampsReceivedCountToday(),
          encounters.length > 0
            ? getThanksStampSentByEncounterIds(encounters.map((e) => e.id))
            : Promise.resolve(new Set<number>()),
        ]);
        setThanksStampsCount(count);
        setStampSentIds(sentSet);
      };
      loadStampData();
    }
  }, [encounters, isLoadingEncounters]);

  // すれ違いが未ロック（夜アンケート未回答）かつデバッグモードがOFFの場合
  if (!isCompleted && !debugMode) {
    return (
      <LockedView message={`夜の気分を記録すると${'\n'}今日すれ違った仲間が見られます`} />
    );
  }

  return (
    <GrassBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: 'transparent' }}
        contentContainerStyle={{
          paddingBottom: 32,
          paddingTop: 20,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          gap: 20,
          flexGrow: 0,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor="#FFAAB8" />
        }>
        {/* 今日のサマリー */}
        <SummaryCards
          encountersCount={encounters.length}
          thanksStampsCount={thanksStampsCount}
          cardWidth={cardWidth}
          cardGap={CARD_GAP}
          cardRowMargin={CARD_ROW_MARGIN}
        />

        {/* ローディング中 */}
        {isLoadingEncounters && (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#FFAAB8" />
          </View>
        )}

        {/* すれ違いリスト */}
        {!isLoadingEncounters && encounters.length > 0 && (
          <EncounterList
            encounters={encounters}
            stampSentIds={stampSentIds}
            sendingEncounterId={sendingEncounterId}
            onSendThanks={async (encounter) => {
              const stampSent = stampSentIds.has(encounter.id);
              const sending = sendingEncounterId === encounter.id;
              if (stampSent || sending) return;
              setSendingEncounterId(encounter.id);
              try {
                await sendThanksStamp(encounter.id, encounter.other_user_id);
                setStampSentIds((prev) => new Set(prev).add(encounter.id));
              } catch (err) {
                Alert.alert(
                  '送信できませんでした',
                  err instanceof Error ? err.message : 'お疲れ様スタンプの送信に失敗しました。'
                );
              } finally {
                setSendingEncounterId(null);
              }
            }}
          />
        )}

        {/* すれ違いがない場合 */}
        {!isLoadingEncounters && encounters.length === 0 && <EmptyState />}
        <FooterQuote />
      </ScrollView>
    </GrassBackground>
  );
}
