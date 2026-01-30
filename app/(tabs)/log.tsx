import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';

import { GrassBackground } from '@/components/grass-background';
import { AvatarImage } from '@/components/ui/avatar-image';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useNightQuestionnaire } from '@/hooks/use-night-questionnaire';
import { getMyEncounters, type EncounterWithQuests } from '@/lib/api';

export default function LogScreen() {
  const { isCompleted, isLoading: isLoadingQuestionnaire } = useNightQuestionnaire();
  const [encounters, setEncounters] = useState<EncounterWithQuests[]>([]);
  const [isLoadingEncounters, setIsLoadingEncounters] = useState(false);

  // すれ違い情報を取得
  useEffect(() => {
    if (isCompleted && !isLoadingQuestionnaire) {
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
  }, [isCompleted, isLoadingQuestionnaire]);
  // すれ違いが未ロック（夜アンケート未回答）の場合
  if (!isCompleted) {
    return (
      <GrassBackground>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1, backgroundColor: 'transparent' }}
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 8, gap: 20 }}>
          <View style={{ paddingHorizontal: 24, paddingTop: 40, alignItems: 'center', gap: 16 }}>
            <View
              style={{
                padding: 20,
                borderRadius: 999,
                backgroundColor: 'rgba(168, 223, 142, 0.15)',
              }}>
              <IconSymbol name="lock.fill" size={48} color="#A8DF8E" />
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
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 8, gap: 20 }}>
        {/* 今日のサマリー */}
        <View style={{ flexDirection: 'row', marginHorizontal: 16, gap: 14 }}>
          <View
            style={{
              flex: 1,
              minWidth: 0,
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
                paddingVertical: 6,
                paddingHorizontal: 8,
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
              }}>
              {encounters.length}人
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              minWidth: 0,
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
                paddingVertical: 6,
                paddingHorizontal: 8,
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
              }}>
              0件
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

              // 今日達成したクエストを表示（最大3件）
              const questsToShow = encounter.completed_quests.slice(0, 3);
              const questText =
                questsToShow.length > 0
                  ? questsToShow.map((q) => `『${q.title}』`).join('、') + 'を達成しました'
                  : '今日のクエストに挑戦中';

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
                      style={{
                        height: 44,
                        width: 44,
                        borderRadius: 999,
                        backgroundColor: 'rgba(255, 170, 184, 0.12)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <IconSymbol name="heart.fill" size={18} color="#FFAAB8" />
                    </Pressable>
                    <Text
                      selectable
                      style={{
                        fontSize: 10,
                        fontWeight: '700',
                        color: '#FFAAB8',
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
            <IconSymbol name="figure.walk" size={48} color="#A8DF8E" />
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
