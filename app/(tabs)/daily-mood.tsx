import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

const MOODS = [
  { id: 'great', label: '絶好調', color: '#A8DF8E', text: '#FFFFFF', icon: 'sun.max.fill' },
  { id: 'ok', label: '普通', color: '#FFFFFF', text: '#141712', icon: 'sparkles' },
  { id: 'meh', label: 'もやもや', color: '#FFD8DF', text: '#8B3D48', icon: 'cloud.fill' },
  { id: 'tough', label: 'つらい', color: '#FFAAB8', text: '#FFFFFF', icon: 'heart.fill' },
];

const BODY_STATES = [
  { id: 'light', label: '軽い', color: '#FFFFFF', text: '#141712', icon: 'feather' },
  { id: 'normal', label: 'ふつう', color: '#E9F7E2', text: '#2E5B2E', icon: 'figure.walk' },
  { id: 'tired', label: 'だるい', color: '#FFE9C7', text: '#7A4E00', icon: 'zzz' },
  { id: 'pain', label: '痛い', color: '#FFAAB8', text: '#FFFFFF', icon: 'cross.case.fill' },
];

export default function DailyMoodScreen() {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [selectedBodyStateId, setSelectedBodyStateId] = useState<string | null>(null);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
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

      <View style={{ paddingHorizontal: 24, gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 4, height: 20, borderRadius: 999, backgroundColor: '#A8DF8E' }} />
          <Text
            selectable
            style={{ fontSize: 14, fontWeight: '700', color: '#141712', fontFamily: Fonts.rounded }}>
            気分を選択
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {MOODS.map((mood, index) => (
            <Pressable
              key={mood.id}
              onPress={() => setSelectedMoodId(mood.id)}
              style={{
                flexBasis: '48%',
                minWidth: '48%',
                height: 56,
                borderRadius: 20,
                backgroundColor: mood.color,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 8,
                borderWidth: 1,
                borderColor:
                  selectedMoodId === mood.id
                    ? '#6CBF6A'
                    : index === 1
                      ? 'rgba(168, 223, 142, 0.2)'
                      : 'rgba(255,255,255,0.4)',
                boxShadow: '0 6px 12px rgba(20, 23, 18, 0.08)',
                borderCurve: 'continuous',
                transform: [{ scale: selectedMoodId === mood.id ? 1.01 : 1 }],
              }}>
              <IconSymbol name={mood.icon} size={18} color={mood.text} />
              <Text selectable style={{ color: mood.text, fontSize: 12, fontWeight: '700', fontFamily: Fonts.rounded }}>
                {mood.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 4, height: 20, borderRadius: 999, backgroundColor: '#A8DF8E' }} />
          <Text
            selectable
            style={{ fontSize: 14, fontWeight: '700', color: '#141712', fontFamily: Fonts.rounded }}>
            体の状態を選択
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {BODY_STATES.map((state, index) => (
            <Pressable
              key={state.id}
              onPress={() => setSelectedBodyStateId(state.id)}
              style={{
                flexBasis: '48%',
                minWidth: '48%',
                height: 56,
                borderRadius: 20,
                backgroundColor: state.color,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 8,
                borderWidth: 1,
                borderColor:
                  selectedBodyStateId === state.id
                    ? '#6CBF6A'
                    : index === 0
                      ? 'rgba(168, 223, 142, 0.2)'
                      : 'rgba(255,255,255,0.4)',
                boxShadow: '0 6px 12px rgba(20, 23, 18, 0.08)',
                borderCurve: 'continuous',
                transform: [{ scale: selectedBodyStateId === state.id ? 1.01 : 1 }],
              }}>
              <IconSymbol name={state.icon} size={18} color={state.text} />
              <Text
                selectable
                style={{ color: state.text, fontSize: 12, fontWeight: '700', fontFamily: Fonts.rounded }}>
                {state.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <IconSymbol name="pencil" size={18} color="#A8DF8E" />
          <Text
            selectable
            style={{ fontSize: 14, fontWeight: '700', color: '#141712', fontFamily: Fonts.rounded }}>
            自由入力
          </Text>
        </View>
        <View>
          <TextInput
            multiline
            placeholder="今の気持ちを自由に書いてね..."
            placeholderTextColor="rgba(113, 130, 104, 0.5)"
            style={{
              height: 180,
              borderRadius: 20,
              backgroundColor: '#FFFFFF',
              padding: 18,
              fontSize: 14,
              color: '#141712',
              textAlignVertical: 'top',
              boxShadow: '0 6px 12px rgba(20, 23, 18, 0.08)',
              borderCurve: 'continuous',
              fontFamily: Fonts.rounded,
            }}
          />
          <Text
            selectable
            style={{
              position: 'absolute',
              right: 16,
              bottom: 14,
              fontSize: 10,
              color: '#718268',
              fontWeight: '600',
              fontFamily: Fonts.rounded,
            }}>
            0 / 500
          </Text>
        </View>
      </View>

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
  );
}
