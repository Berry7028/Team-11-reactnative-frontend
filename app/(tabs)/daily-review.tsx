import { Image } from 'expo-image';
import React from 'react';
import { Keyboard, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

const DAY_MOODS = [
  { id: 'calm', label: '穏やか', icon: 'sparkles', accent: '#A8DF8E' },
  { id: 'full', label: '充実', icon: 'sun.max.fill', accent: '#A8DF8E', filled: true },
  { id: 'tired', label: 'お疲れ', icon: 'cup.and.saucer.fill', accent: '#F59E0B' },
  { id: 'cloudy', label: 'もやもや', icon: 'cloud.fill', accent: '#60A5FA' },
];

export default function DailyReviewScreen() {
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
          {DAY_MOODS.map((mood) => (
            <View
              key={mood.id}
              style={{
                height: 44,
                paddingHorizontal: 16,
                borderRadius: 999,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                backgroundColor: mood.filled ? '#A8DF8E' : '#FFFFFF',
                borderWidth: mood.filled ? 0 : 2,
                borderColor: 'rgba(168, 223, 142, 0.3)',
                boxShadow: mood.filled
                  ? '0 6px 12px rgba(168, 223, 142, 0.4)'
                  : '0 4px 10px rgba(168, 223, 142, 0.15)',
              }}>
              <IconSymbol name={mood.icon} size={18} color={mood.filled ? '#FFFFFF' : mood.accent} />
              <Text
                selectable
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: mood.filled ? '#FFFFFF' : '#475569',
                  fontFamily: Fonts.rounded,
                }}>
                {mood.label}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <IconSymbol name="pencil" size={20} color="#FFAAB8" />
            <Text
              selectable
              style={{ fontSize: 16, fontWeight: '700', color: '#334155', fontFamily: Fonts.rounded }}>
              自由入力
            </Text>
          </View>
          <TextInput
            multiline
            placeholder="今日あったことや、今の気持ちを全部吐き出してみてね..."
            placeholderTextColor="#94A3B8"
            style={{
              minHeight: 180,
              borderRadius: 24,
              backgroundColor: '#FFFFFF',
              padding: 18,
              fontSize: 14,
              color: '#1E293B',
              textAlignVertical: 'top',
              boxShadow: '0 8px 18px rgba(168, 223, 142, 0.2)',
              borderCurve: 'continuous',
              fontFamily: Fonts.rounded,
            }}
          />
        </View>

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
