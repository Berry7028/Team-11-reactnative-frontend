import { Image } from 'expo-image';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';

import { GrassBackground } from '@/components/grass-background';
import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { ApiRequestError, getTodayQuests, toggleQuestComplete, type Quest } from '@/lib/api';

// クエストカテゴリのアイコンマッピング
const QUEST_ICONS: Record<string, IconSymbolName> = {
  relaxation: 'sparkles',
  relax: 'cup.and.saucer.fill',
  refresh: 'sun.max.fill',
  exercise: 'figure.walk',
  default: 'heart.fill',
};

// クエストの画像（デフォルト）
const DEFAULT_QUEST_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAfNbcIQ1avdjPGROSw-cLh0X51mem4kfBqg95eQgebD7GxgNjvMmVMIzkcqLlWPdfzSaXWLIsM5baeK2O3TwTDsgo8A2v46l1f2d-rr4z640NcM1Wmug6BY2AhDPGrCjQCDAUqJi2Fofn2DqMgSfyYfdyv5cWEFLVgr7TqC7XDfR9HL6IISrCuamnm8KVD2BMS5S15iVervdhdT8qx0qTritiW1jpU4KKyXfuXdvLa6tU1OJyh4Ut0FBAfG2KBn95T1vqQQGvWvGgA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAN2AX1o1Q8e4jng34h23w_0a-tPK_m6-onNZQPHUJgRqfmdVAlhi0R58ELEXEjhbOGUkOzBJwXhsseyZ2FBi58OjJOZWIj2seacQtc4FneFXY5cNArNXzlPBIILLA9zuV5xUelKtcjCN8fFhpk5db9oGdysI7sbQZhNvKjGimxzZ2xY3pLXlf48PFn6N4X7tCM7Jyy1PED2oMk29GVkJJyTzF4257vUXmWV-sKHKsDVwz0_unMaQgD_8wKFGRjbSPUTZEUki5KhLtd',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAcfp6lKYsSqV-9Wy31EK4fxUXZTE-2TughJyq06Epwtcc39YfIeKqQfK6K86FkATTXPizX5wCdE0f5qN_ZNF70gh31Rd7fxSUWH2CI7RPdQ-RsFP1sCfSYsr23bjve1lpee2AWFahHYXLrDh-3oG6s46zUgjckbaAn9HzBekY7TAFYGGpmeBdgZSi3uro8XvuO_BS_Mf5wS7aZFaDGB8xjTgId5ap312WMm8PyobnHJt7Ag7Z614N4RX9Jq-kdcPQyEDMNq1z7nHuI',
];

export default function QuestsScreen() {
  const { session } = useAuth();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [togglingQuestId, setTogglingQuestId] = useState<number | null>(null);

  const userUuid = session?.user?.id;

  const fetchQuests = useCallback(async () => {
    if (!userUuid) return;

    try {
      const data = await getTodayQuests(userUuid);
      setQuests(data);
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

    setTogglingQuestId(questId);
    try {
      const updatedQuest = await toggleQuestComplete(userUuid, questId);
      setQuests((prev) =>
        prev.map((q) => (q.id === questId ? updatedQuest : q))
      );
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
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
      {quests.length > 0 && (
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            selectable
            style={{
              color: '#5C5254',
              fontSize: 12,
              textAlign: 'center',
              fontFamily: Fonts.rounded,
            }}>
            {completedCount}/{quests.length} 完了
          </Text>
        </View>
      )}

      <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            backgroundColor: '#FFFFFF',
            padding: 18,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: '#FFD8DF',
            boxShadow: '0 6px 16px rgba(255, 170, 184, 0.15)',
            borderCurve: 'continuous',
          }}>
          <View
            style={{
              height: 64,
              width: 64,
              borderRadius: 999,
              backgroundColor: 'rgba(255, 216, 223, 0.4)',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#FFD8DF',
            }}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgpG_KJPstpM7GGXx-kb1p-fjF2HNBqa0paNYlGjIxfpJtYJheg6M8T9AuPonPlW-Rr63auI00J0Q6WA4EMJ_-pbW6pr4QzG2i6h_Z6Kyznz3Fm4y_NfTClnxtf8qMd6IV0GOkIDh4sk6vJAQeYs2ijcaGVwqLODuO_Ac_1s6l39SffMEGNJK6juZ7eGL4tjO63mMfPy7fy8pBONymn5n7LXyts_DROQv4TrSkzQ-wRXZaYt8fZIdz4dfSSh1mogbP2w_CEWrXLmJ3',
              }}
              contentFit="contain"
              style={{ width: 44, height: 44 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              selectable
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: '#332D2E',
                lineHeight: 20,
                fontFamily: Fonts.rounded,
              }}>
              ここにいるだけで、もう十分がんばっていますよ。無理のない範囲で少しずつ進めていきましょう
            </Text>
          </View>
        </View>
      </View>

      {isLoading ? (
        <View style={{ paddingVertical: 40, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FFAAB8" />
          <Text
            style={{
              marginTop: 12,
              color: '#5C5254',
              fontFamily: Fonts.rounded,
            }}>
            クエストを読み込み中...
          </Text>
        </View>
      ) : quests.length === 0 ? (
        <View style={{ paddingHorizontal: 16, paddingVertical: 40, alignItems: 'center' }}>
          <IconSymbol name="sparkles" size={48} color="#FFAAB8" />
          <Text
            style={{
              marginTop: 16,
              fontSize: 16,
              fontWeight: '600',
              color: '#5C5254',
              textAlign: 'center',
              fontFamily: Fonts.rounded,
            }}>
            今日のクエストはまだありません
          </Text>
          <Text
            style={{
              marginTop: 8,
              fontSize: 12,
              color: '#94A3B8',
              textAlign: 'center',
              fontFamily: Fonts.rounded,
            }}>
            朝の気分を記録するとクエストが生成されます
          </Text>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 16, gap: 18 }}>
          {quests.map((quest, index) => {
            const isHighlighted = index === 0;
            const isToggling = togglingQuestId === quest.id;
            return (
              <View
                key={quest.id}
                style={{
                  backgroundColor: isHighlighted ? '#FFD8DF' : '#FFFFFF',
                  borderRadius: 28,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: isHighlighted ? 'rgba(255, 170, 184, 0.2)' : '#F1E6E8',
                  boxShadow: '0 8px 18px rgba(255, 170, 184, 0.12)',
                  borderCurve: 'continuous',
                  opacity: quest.completed ? 0.7 : 1,
                }}>
                <Image
                  source={{ uri: DEFAULT_QUEST_IMAGES[index % DEFAULT_QUEST_IMAGES.length] }}
                  contentFit="cover"
                  style={{ height: 170, width: '100%' }}
                />
                <View style={{ padding: 20, gap: 8 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        selectable
                        style={{
                          fontSize: 10,
                          fontWeight: '700',
                          letterSpacing: 2,
                          color: isHighlighted ? '#332D2E' : 'rgba(51, 45, 46, 0.6)',
                          fontFamily: Fonts.rounded,
                        }}>
                        {quest.completed ? '完了済み' : 'QUEST'}
                      </Text>
                      <Text
                        selectable
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: '#332D2E',
                          marginTop: 6,
                          lineHeight: 24,
                          fontFamily: Fonts.rounded,
                          textDecorationLine: quest.completed ? 'line-through' : 'none',
                        }}>
                        {quest.title}
                      </Text>
                      {quest.description && (
                        <Text
                          selectable
                          style={{
                            fontSize: 12,
                            color: '#5C5254',
                            marginTop: 4,
                            fontFamily: Fonts.rounded,
                          }}>
                          {quest.description}
                        </Text>
                      )}
                    </View>
                    <IconSymbol
                      name={quest.completed ? 'checkmark.circle.fill' : QUEST_ICONS.default}
                      size={28}
                      color={quest.completed ? '#A8DF8E' : '#FFAAB8'}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      marginTop: 12,
                    }}>
                    <Pressable
                      onPress={() => handleToggleComplete(quest.id)}
                      disabled={isToggling}
                      style={{
                        height: 44,
                        paddingHorizontal: 18,
                        borderRadius: 999,
                        backgroundColor: quest.completed ? '#94A3B8' : '#FFAAB8',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: quest.completed
                          ? '0 6px 14px rgba(148, 163, 184, 0.4)'
                          : '0 6px 14px rgba(255, 170, 184, 0.4)',
                        opacity: isToggling ? 0.7 : 1,
                      }}>
                      {isToggling ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <>
                          <IconSymbol
                            name={quest.completed ? 'arrow.uturn.backward' : 'sparkles'}
                            size={18}
                            color="#FFFFFF"
                          />
                          <Text
                            selectable
                            style={{
                              color: '#FFFFFF',
                              fontSize: 12,
                              fontWeight: '700',
                              fontFamily: Fonts.rounded,
                            }}>
                            {quest.completed ? '戻す' : '達成！'}
                          </Text>
                        </>
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
      </ScrollView>
    </GrassBackground>
  );
}
