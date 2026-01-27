import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function SignInScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: '#F0FFDF' }}
      contentContainerStyle={{ padding: 20, gap: 20 }}>
      <View style={{ alignItems: 'center', gap: 10 }}>
        <View
          style={{
            height: 72,
            width: 72,
            borderRadius: 999,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(168, 223, 142, 0.25)',
            borderCurve: 'continuous',
          }}>
          <IconSymbol name="heart.fill" size={28} color="#A8DF8E" />
        </View>
        <Text
          selectable
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#3A4D39',
            fontFamily: Fonts.rounded,
          }}>
          おかえりなさい
        </Text>
        <Text
          selectable
          style={{
            fontSize: 12,
            color: '#6B7A66',
            textAlign: 'center',
            fontFamily: Fonts.rounded,
          }}>
          いつもの空気感で、ふわっとログイン
        </Text>
      </View>

      <View style={{ gap: 12 }}>
        <View style={{ gap: 6 }}>
          <Text selectable style={{ fontSize: 12, fontWeight: '700', color: '#3A4D39', fontFamily: Fonts.rounded }}>
            ユーザーID
          </Text>
          <TextInput
            placeholder="例）kouta_01"
            placeholderTextColor="rgba(107, 122, 102, 0.5)"
            style={{
              height: 52,
              borderRadius: 18,
              backgroundColor: '#FFFFFF',
              paddingHorizontal: 16,
              fontSize: 14,
              color: '#141712',
              boxShadow: '0 6px 12px rgba(20, 23, 18, 0.08)',
              borderCurve: 'continuous',
              fontFamily: Fonts.rounded,
            }}
          />
        </View>
        <View style={{ gap: 6 }}>
          <Text selectable style={{ fontSize: 12, fontWeight: '700', color: '#3A4D39', fontFamily: Fonts.rounded }}>
            パスワード
          </Text>
          <TextInput
            placeholder="******"
            secureTextEntry
            placeholderTextColor="rgba(107, 122, 102, 0.5)"
            style={{
              height: 52,
              borderRadius: 18,
              backgroundColor: '#FFFFFF',
              paddingHorizontal: 16,
              fontSize: 14,
              color: '#141712',
              boxShadow: '0 6px 12px rgba(20, 23, 18, 0.08)',
              borderCurve: 'continuous',
              fontFamily: Fonts.rounded,
            }}
          />
        </View>
      </View>

      <Link href="/(tabs)" asChild>
        <Pressable
          style={{
            height: 54,
            borderRadius: 999,
            backgroundColor: '#A8DF8E',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 8,
            boxShadow: '0 10px 18px rgba(168, 223, 142, 0.4)',
          }}>
          <Text selectable style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700', fontFamily: Fonts.rounded }}>
            ログイン
          </Text>
          <IconSymbol name="checkmark.circle.fill" size={18} color="#FFFFFF" />
        </Pressable>
      </Link>

      <View style={{ alignItems: 'center', gap: 6 }}>
        <Text selectable style={{ fontSize: 12, color: '#6B7A66', fontFamily: Fonts.rounded }}>
          はじめての方はこちら
        </Text>
        <Link href="/(auth)/signup" asChild>
          <Pressable style={{ paddingVertical: 6, paddingHorizontal: 12 }}>
            <Text selectable style={{ fontSize: 13, fontWeight: '700', color: '#3A4D39', fontFamily: Fonts.rounded }}>
              サインアップへ
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
