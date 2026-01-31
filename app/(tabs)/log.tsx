import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GrassBackground } from '@/components/grass-background';
import { AvatarImage } from '@/components/ui/avatar-image';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
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
  useEffect(() => {
    // デバッグモードがON、または夜アンケートが完了している場合に取得
    if ((debugMode || isCompleted) && !isLoadingQuestionnaire) {
      const loadEncounters = async () => {
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
      };

      loadEncounters();
    }
  }, [isCompleted, isLoadingQuestionnaire, debugMode]);

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
      <GrassBackground>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1, backgroundColor: 'transparent' }}
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 20, gap: 20 }}>
          <View style={{ paddingHorizontal: 24, paddingTop: 40, alignItems: 'center', gap: 16 }}>
            <View
              style={{
                padding: 20,
                borderRadius: 999,
                backgroundColor: 'rgba(168, 223, 142, 0.15)',
              }}>
              <IconSymbol name="lock.fill" size={48} color="#FFAAB8" />
            </View>
            <Text
              selectable
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#141712',
                textAlign: 'center',
                fontFamily: Fonts.rounded,
              }}>
              すれ違った仲間を見るには
            </Text>
            <Text
              selectable
              style={{
                fontSize: 14,
                color: '#718268',
                textAlign: 'center',
                fontFamily: Fonts.rounded,
                lineHeight: 22,
              }}>
              夜の気分を記録すると{'\n'}今日すれ違った仲間が見られます
            </Text>
          </View>
        </ScrollView>
      </GrassBackground>
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
        }}>
        {/* 今日のサマリー */}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: CARD_ROW_MARGIN,
            gap: CARD_GAP,
            alignItems: 'stretch',
          }}>
          <View
            style={{
              width: cardWidth,
              minHeight: 120,
              paddingVertical: 16,
              paddingHorizontal: 14,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#EEF1ED',
              shadowColor: '#141712',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 6,
              borderCurve: 'continuous',
            }}>
            <View
              style={{
                marginBottom: 4,
                width: 38,
                height: 34,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                backgroundColor: 'rgba(125, 161, 94, 0.08)',
              }}>
              <IconSymbol name="person.3.fill" size={22} color="#7DA15E" />
            </View>
            <Text
              selectable
              style={{
                fontSize: 10,
                fontWeight: '600',
                color: '#718268',
                fontFamily: Fonts.rounded,
                letterSpacing: 0.5,
                textAlign: 'center',
              }}>
              今日すれ違った
            </Text>
            <Text
              selectable
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: '#141712',
                fontFamily: Fonts.rounded,
                textAlign: 'center',
                lineHeight: 28,
              }}>
              {encounters.length}人
            </Text>
          </View>
          <View
            style={{
              width: cardWidth,
              minHeight: 120,
              paddingVertical: 16,
              paddingHorizontal: 14,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#EEF1ED',
              shadowColor: '#141712',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 6,
              borderCurve: 'continuous',
            }}>
            <View
              style={{
                marginBottom: 4,
                width: 38,
                height: 34,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                backgroundColor: 'rgba(255, 170, 184, 0.12)',
              }}>
              <IconSymbol name="heart.fill" size={22} color="#D87D8E" />
            </View>
            <Text
              selectable
              style={{
                fontSize: 10,
                fontWeight: '600',
                color: '#718268',
                fontFamily: Fonts.rounded,
                letterSpacing: 0.5,
                textAlign: 'center',
              }}>
              お疲れ様スタンプ
            </Text>
            <Text
              selectable
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: '#332D2E',
                fontFamily: Fonts.rounded,
                textAlign: 'center',
                lineHeight: 28,
              }}>
              {thanksStampsCount}件
            </Text>
          </View>
        </View>

        {/* ローディング中 */}
        {isLoadingEncounters && (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#A8DF8E" />
          </View>
        )}

        {/* すれ違いリスト */}
        {!isLoadingEncounters && encounters.length > 0 && (
          <View style={{ paddingHorizontal: 16, gap: 14 }}>
            {encounters.map((encounter) => {
              const displayName = encounter.other_user_name || '旅の仲間';
              const stampSent = stampSentIds.has(encounter.id);
              const sending = sendingEncounterId === encounter.id;

              // 今日達成したクエストを表示（最大3件）
              const questsToShow = encounter.completed_quests.slice(0, 3);
              const questText =
                questsToShow.length > 0
                  ? questsToShow.map((q) => `『${q.title}』`).join('、') + 'を達成しました'
                  : '今日のクエストに挑戦中';

              const handleThanksStamp = async () => {
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
              };

              return (
                <View
                  key={encounter.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#EEF1ED',
                    shadowColor: '#141712',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 6,
                    borderCurve: 'continuous',
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
                    <AvatarImage
                      avatarUrl={encounter.other_user_avatar}
                      size={56}
                    />
                    <View style={{ flex: 1 }}>
                      <Text
                        selectable
                        style={{
                          fontSize: 13,
                          fontWeight: '700',
                          color: '#141712',
                          fontFamily: Fonts.rounded,
                        }}>
                        {displayName}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                        <IconSymbol name="checkmark.seal.fill" size={14} color="#7DA15E" />
                        <Text
                          selectable
                          numberOfLines={2}
                          style={{
                            fontSize: 12,
                            color: '#718268',
                            flexShrink: 1,
                            fontFamily: Fonts.rounded,
                          }}>
                          {questText}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ alignItems: 'center', gap: 4 }}>
                    <Pressable
                      onPress={handleThanksStamp}
                      disabled={stampSent || sending}
                      style={{
                        height: 44,
                        width: 44,
                        borderRadius: 999,
                        backgroundColor: stampSent
                          ? 'rgba(216, 125, 142, 0.25)'
                          : 'rgba(255, 170, 184, 0.12)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {sending ? (
                        <ActivityIndicator size="small" color="#D87D8E" />
                      ) : (
                        <IconSymbol
                          name="heart.fill"
                          size={18}
                          color={stampSent ? '#D87D8E' : '#FFAAB8'}
                        />
                      )}
                    </Pressable>
                    <Text
                      selectable
                      style={{
                        fontSize: 10,
                        fontWeight: '700',
                        color: stampSent ? '#D87D8E' : '#FFAAB8',
                        fontFamily: Fonts.rounded,
                      }}>
                      お疲れ様
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* すれ違いがない場合 */}
        {!isLoadingEncounters && encounters.length === 0 && (
          <View style={{ paddingHorizontal: 24, paddingTop: 20, alignItems: 'center', gap: 12 }}>
            <IconSymbol name="figure.walk" size={48} color="#FFAAB8" />
            <Text
              selectable
              style={{
                fontSize: 14,
                color: '#718268',
                textAlign: 'center',
                fontFamily: Fonts.rounded,
              }}>
              今日はまだすれ違いがありません
            </Text>
          </View>
        )}

        <View style={{ paddingHorizontal: 24, paddingTop: 12, alignItems: 'center', gap: 10 }}>
          <Text
            selectable
            style={{
              fontSize: 12,
              color: '#718268',
              fontStyle: 'italic',
              textAlign: 'center',
              fontFamily: Fonts.rounded,
            }}>
            &quot;みんな、今日も自分なりに頑張っています。&quot;
          </Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <View style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: 'rgba(255, 170, 184, 0.4)' }} />
            <View style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: 'rgba(255, 170, 184, 0.4)' }} />
            <View style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: 'rgba(255, 170, 184, 0.4)' }} />
          </View>
        </View>
      </ScrollView>
    </GrassBackground>
  );
}
