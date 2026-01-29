import { Image } from 'expo-image';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { GrassBackground } from '@/components/grass-background';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

const TRAVELERS = [
  {
    id: '1',
    name: 'ある仲間さん',
    activity: '『空を見上げる』を達成しました',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUd5MoRssGAJB8g-gpOMSELXXM2jD_GNQUala2Fuz2MASDmU-tkALRmpUmaB6nwrOoSp-nKPrL2FgoLGBNPH9K-r8ISQBZGFh7FdVarRv7KADoj4vclwVZZxIENXr-VYbC4uW2AhvWqOBWIS_4FMDOoMiRPu57zS-Lt1Vbu1HYcQrWbvW79ZV0V_c7XQSORTOMb4VoDt94CcsJGlKtaZ5jVvOGQUELv8JdElGlFmTon-Cj3ux_H-Qq7ZJglEekhX3y_PmH04ltO2Hn',
    accent: '#F0FFDF',
  },
  {
    id: '2',
    name: '優しい誰かさん',
    activity: '『水を飲む』を達成しました',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAAAuiv2NdIIeAucf3BYiBRscT17AK8OvdryR6JmqLNH75ExnHrjf8lMOfrf1XN1pK-Ssc80722FNtZJD79KXuOcUsk-4_NGgc_mUGFySIbtmJQUFIbPO1gShh7woeva3Rn5PQkN8DtzlDiukDbKo-oAjHibARlSOpl3RjScwe79T8GY8WWl6E1ucxRdNK9JJLJqzl9VY8rwmnlzT25LFmZVHWHS8J9QVL0eIATKJeirloYLbQyyiXc0owIX2u5f8KHkPaUuEY96q9K',
    accent: '#D0F0C0',
  },
  {
    id: '3',
    name: '旅の仲間さん',
    activity: '『深呼吸をする』を達成しました',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9NyDlv_q-J8FmNDnpoADAm2AcKNar1lkSj3QjecM2qW_Hh1lpNDRl1eAe6bbwOrqQCl7FouMdPlZ-YoWBlwIsz3kNzVVJITYtjpxxEEHgXZVcAO61hW21jjQU9M8N-ZirlVzpinGZZ0bqt91RgOjfadCTbZj6yp7IJUUt_2QtjJFOuCTcINzlc3Q1MxSEvjk9VaAKBChrs6ZuinB9K-4zs9dG8gY9idUcihBssDW4g2514ndWSVFFaT_QKcoAEzNublTUHZksmtxx',
    accent: '#F0E6FF',
  },
  {
    id: '4',
    name: 'すれ違った仲間さん',
    activity: '『ストレッチ』を達成しました',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqAZEGI45vCdEduPgvE-of1KEDnUEO_873BAtVkVbGlgfLPphv-QP6FFMz-3KJhs_R1bPHwjSZQCo5-85LS9KokB65_Thp4a88ZMmOZMT3XCfzlkws_5qMyWLRI8OHFe2yMrpTiH3gyv8uJELIPCbAnauFZf1-BAv73PZPvdONDcrcAn3A7CWZTAGIezb8Cfz0uDOVsDpYMoXbbiw1YUsww35y-xE2R5cS1-A1ueolhWj5iBJ_Wv1MaQkrGMC9_Z4J6IrvV_VMqEy_',
    accent: '#FFF9DB',
  },
];

export default function LogScreen() {
  return (
    <GrassBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: 'transparent' }}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 8, gap: 20 }}>
      {/* 今日のサマリー：すれ違った仲間カードと同じカードスタイルで2枚並べる */}
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
            12人
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
            3件
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, gap: 14 }}>
        {TRAVELERS.map((traveler) => (
          <View
            key={traveler.id}
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
              <View
                style={{
                  height: 56,
                  width: 56,
                  borderRadius: 999,
                  backgroundColor: traveler.accent,
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderWidth: 2,
                  borderColor: '#F0FFDF',
                }}>
                <Image source={{ uri: traveler.avatar }} style={{ width: 56, height: 56 }} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  selectable
                  style={{
                    fontSize: 13,
                    fontWeight: '700',
                    color: '#141712',
                    fontFamily: Fonts.rounded,
                  }}>
                  {traveler.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <IconSymbol name="checkmark.seal.fill" size={14} color="#7DA15E" />
                  <Text
                    selectable
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      color: '#718268',
                      flexShrink: 1,
                      fontFamily: Fonts.rounded,
                    }}>
                    {traveler.activity}
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
        ))}
      </View>

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
