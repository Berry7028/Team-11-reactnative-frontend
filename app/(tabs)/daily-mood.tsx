import { Image } from 'expo-image';
import React, { useState, useMemo } from 'react';
import { Keyboard, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';

import { MoodSelector, BodyStateSelector, FreeInputSection } from '@/components/mood-input-section';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

const DAY_MOODS = [
  { id: 'calm', label: '穏やか', icon: 'sparkles' as const, accent: '#A8DF8E' },
  { id: 'full', label: '充実', icon: 'sun.max.fill' as const, accent: '#A8DF8E', filled: true },
  { id: 'tired', label: 'お疲れ', icon: 'cup.and.saucer.fill' as const, accent: '#F59E0B' },
  { id: 'cloudy', label: 'もやもや', icon: 'cloud.fill' as const, accent: '#60A5FA' },
];

function isNightTime(): boolean {
  const hour = new Date().getHours();
  return hour < 5 || hour >= 18;
}

export default function DailyMoodScreen() {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [selectedBodyStateId, setSelectedBodyStateId] = useState<string | null>(null);
  const [freeText, setFreeText] = useState('');
  const [selectedDayMoodId, setSelectedDayMoodId] = useState<string | null>('full');

  const isNight = useMemo(() => isNightTime(), []);

  if (isNight) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: '#F0FFDF' }}
          contentContainerStyle={{ paddingBottom: 32, gap: 20 }}>
          <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <Text
                selectable
                style={{ fontSize: 14, fontWeight: '700', color: '#475569', fontFamily: Fonts.rounded }}>
                今日はどんな1日だった？
              </Text>
              <View style={{ position: 'relative' }}>
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    bottom: -10,
                    left: -10,
                    borderRadius: 999,
                    backgroundColor: 'rgba(168, 223, 142, 0.3)',
                    boxShadow: '0 0 18px rgba(168, 223, 142, 0.6)',
                  }}
                />
                <Image
                  source={{
                    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRhmMC5GjX_fjyyVvxSvdcURfBGboqlUhBitULtZAOxfPf3LTQB2zghqu2puS_Vf849jjUo759GxZ5Zt-xRCs2F78e_TzgvOr1FJelwwJpaB8PheAHy83gFCWbCSiFKLy_kZQZRsC_ggZvk9JXsUT_gRmTKxqK6O4BIfCHFbkAiUVfQ7rhbdcp9Cr-KGc7ZUdW_rWAvWC1Aevv6kQBErtZOXwFzYwinRNr9FVM606UNpFLuAZuiP6Ib37CmmTmzdVEj7Dva7AARhS',
                  }}
                  contentFit="contain"
                  style={{ width: 84, height: 84 }}
                />
              </View>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
            {DAY_MOODS.map((mood) => {
              const isSelected = selectedDayMoodId === mood.id;
              return (
                <Pressable
                  key={mood.id}
                  onPress={() => setSelectedDayMoodId(mood.id)}
                  style={{
                    height: 44,
                    paddingHorizontal: 16,
                    borderRadius: 999,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: isSelected ? '#A8DF8E' : '#FFFFFF',
                    borderWidth: isSelected ? 0 : 2,
                    borderColor: 'rgba(168, 223, 142, 0.3)',
                    boxShadow: isSelected
                      ? '0 6px 12px rgba(168, 223, 142, 0.4)'
                      : '0 4px 10px rgba(168, 223, 142, 0.15)',
                  }}>
                  <IconSymbol name={mood.icon} size={18} color={isSelected ? '#FFFFFF' : mood.accent} />
                  <Text
                    selectable
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: isSelected ? '#FFFFFF' : '#475569',
                      fontFamily: Fonts.rounded,
                    }}>
                    {mood.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <MoodSelector
            selectedMoodId={selectedMoodId}
            onSelectMood={setSelectedMoodId}
          />

          <BodyStateSelector
            selectedBodyStateId={selectedBodyStateId}
            onSelectBodyState={setSelectedBodyStateId}
          />

          <FreeInputSection
            value={freeText}
            onChangeText={setFreeText}
            placeholder="今日あったことや、今の気持ちを全部吐き出してみてね..."
          />

          <View style={{ paddingHorizontal: 20, gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <IconSymbol name="map" size={20} color="#A8DF8E" />
              <Text
                selectable
                style={{ fontSize: 16, fontWeight: '700', color: '#334155', fontFamily: Fonts.rounded }}>
                今日の足跡
              </Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
              <View
                style={{
                  flexBasis: '48%',
                  minWidth: '48%',
                  backgroundColor: 'rgba(255, 216, 223, 0.4)',
                  borderRadius: 24,
                  padding: 16,
                  borderWidth: 2,
                  borderColor: '#FFFFFF',
                  boxShadow: '0 6px 12px rgba(255, 170, 184, 0.2)',
                  borderCurve: 'continuous',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <IconSymbol name="person.3.fill" size={18} color="#FFAAB8" />
                  <Text
                    selectable
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      letterSpacing: 1,
                      color: '#FFAAB8',
                      fontFamily: Fonts.rounded,
                    }}>
                    PASSERSBY
                  </Text>
                </View>
                <Text
                  selectable
                  style={{ fontSize: 10, color: '#64748B', marginTop: 8, fontFamily: Fonts.rounded }}>
                  今日すれ違った仲間
                </Text>
                <Text
                  selectable
                  style={{
                    fontSize: 24,
                    fontWeight: '800',
                    color: '#334155',
                    marginTop: 4,
                    fontVariant: ['tabular-nums'],
                    fontFamily: Fonts.rounded,
                  }}>
                  12
                  <Text selectable style={{ fontSize: 12, color: '#64748B', fontWeight: '700' }}>
                    人
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flexBasis: '48%',
                  minWidth: '48%',
                  backgroundColor: 'rgba(255, 216, 223, 0.4)',
                  borderRadius: 24,
                  padding: 16,
                  borderWidth: 2,
                  borderColor: '#FFFFFF',
                  boxShadow: '0 6px 12px rgba(255, 170, 184, 0.2)',
                  borderCurve: 'continuous',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <IconSymbol name="heart.fill" size={18} color="#FFAAB8" />
                  <Text
                    selectable
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      letterSpacing: 1,
                      color: '#FFAAB8',
                      fontFamily: Fonts.rounded,
                    }}>
                    CHEERS
                  </Text>
                </View>
                <Text
                  selectable
                  style={{ fontSize: 10, color: '#64748B', marginTop: 8, fontFamily: Fonts.rounded }}>
                  もらった『お疲れ様』
                </Text>
                <Text
                  selectable
                  style={{
                    fontSize: 24,
                    fontWeight: '800',
                    color: '#334155',
                    marginTop: 4,
                    fontVariant: ['tabular-nums'],
                    fontFamily: Fonts.rounded,
                  }}>
                  5
                  <Text selectable style={{ fontSize: 12, color: '#64748B', fontWeight: '700' }}>
                    つ
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 24, alignItems: 'center', gap: 12 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'rgba(255,255,255,0.6)',
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.6)',
              }}>
              <IconSymbol name="moon.stars.fill" size={16} color="#FFAAB8" />
              <Text
                selectable
                style={{ fontSize: 11, fontWeight: '700', color: '#94A3B8', fontFamily: Fonts.rounded }}>
                ゆっくり休んでね
              </Text>
            </View>
            <Pressable
              style={{
                width: '100%',
                backgroundColor: '#FFAAB8',
                borderRadius: 999,
                paddingVertical: 16,
                alignItems: 'center',
                boxShadow: '0 8px 18px rgba(255, 170, 184, 0.4)',
              }}>
              <Text
                selectable
                style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF', fontFamily: Fonts.rounded }}>
                おやすみなさい
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: '#F0FFDF' }}
        contentContainerStyle={{ paddingBottom: 28, gap: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, paddingTop: 12 }}>
          <View style={{ width: 28, height: 6, borderRadius: 999, backgroundColor: '#A8DF8E' }} />
          <View style={{ width: 8, height: 6, borderRadius: 999, backgroundColor: 'rgba(168, 223, 142, 0.3)' }} />
          <View style={{ width: 8, height: 6, borderRadius: 999, backgroundColor: 'rgba(168, 223, 142, 0.3)' }} />
        </View>

        <View style={{ paddingHorizontal: 24, alignItems: 'center', gap: 18 }}>
          <View style={{ alignItems: 'center', gap: 12 }}>
            <View style={{ position: 'relative' }}>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 14,
                  borderRadius: 999,
                  borderWidth: 4,
                  borderColor: '#FFFFFF',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
                }}>
                <Image
                  source={{
                    uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT_5wjRFwJoR7GXTvgMqmJikC5wzKm5Yvp3tZ51nbh9qIp_B2W5vM_4o64OZATfYIfg6m0K3rehQKcXyDgjP9w8NLa-LwsBvlWlkdLQcZoGiu7gHOgZuBUoMtPoI6M7uz3n4v34ciT3Slcdb-GcVeUm4o3RbxRiy_mwc_ykFJaN1NMKQh4Fgcp43GPnEDHjTTt562Sdo7IGg_z8IfEDgX8s_tcePmkWWR_byDWHNs6LZclP9uErItqdq0vbRnDf9aPmfOTXFIOglFG',
                  }}
                  contentFit="cover"
                  style={{ height: 96, width: 96, borderRadius: 48 }}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  backgroundColor: '#FFAAB8',
                  height: 28,
                  width: 28,
                  borderRadius: 999,
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 8px rgba(255, 170, 184, 0.4)',
                }}>
                <IconSymbol name="heart.fill" size={14} color="#FFFFFF" />
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'rgba(168, 223, 142, 0.2)',
                boxShadow: '0 6px 12px rgba(20, 23, 18, 0.08)',
                borderCurve: 'continuous',
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: -6,
                  left: '50%',
                  marginLeft: -6,
                  height: 12,
                  width: 12,
                  backgroundColor: '#FFFFFF',
                  transform: [{ rotate: '45deg' }],
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  borderColor: 'rgba(168, 223, 142, 0.2)',
                }}
              />
              <Text
                selectable
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#141712',
                  textAlign: 'center',
                  fontFamily: Fonts.rounded,
                }}>
                今の気分を教えて？
              </Text>
              <Text
                selectable
                style={{
                  fontSize: 12,
                  color: '#718268',
                  textAlign: 'center',
                  marginTop: 4,
                  fontFamily: Fonts.rounded,
                }}>
                いつでもお話聞くよ。
              </Text>
            </View>
          </View>
        </View>

        <MoodSelector
          selectedMoodId={selectedMoodId}
          onSelectMood={setSelectedMoodId}
        />

        <BodyStateSelector
          selectedBodyStateId={selectedBodyStateId}
          onSelectBodyState={setSelectedBodyStateId}
        />

        <FreeInputSection
          value={freeText}
          onChangeText={setFreeText}
          placeholder="今の気持ちを自由に書いてね..."
        />

        <View style={{ paddingHorizontal: 24 }}>
          <Pressable
            style={{
              backgroundColor: '#A8DF8E',
              borderRadius: 999,
              paddingVertical: 16,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 8,
              boxShadow: '0 10px 18px rgba(168, 223, 142, 0.4)',
            }}>
            <Text selectable style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700', fontFamily: Fonts.rounded }}>
              記録を保存する
            </Text>
            <IconSymbol name="checkmark.circle.fill" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
