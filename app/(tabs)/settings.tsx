import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function SettingsScreen() {
  const handleLogout = () => {
    router.replace('/(auth)/signin');
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: '#F7FCF0' }}
      contentContainerStyle={{ paddingBottom: 32, paddingTop: 20, gap: 20 }}>
      <View style={{ paddingHorizontal: 24, gap: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 4, height: 20, borderRadius: 999, backgroundColor: '#A8DF8E' }} />
          <Text
            selectable
            style={{ fontSize: 16, fontWeight: '700', color: '#141712', fontFamily: Fonts.rounded }}>
            アカウント
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: 16,
            gap: 12,
            boxShadow: '0 6px 12px rgba(20, 23, 18, 0.08)',
            borderCurve: 'continuous',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#E9F7E2',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconSymbol name="person.fill" size={24} color="#A8DF8E" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                selectable
                style={{ fontSize: 14, fontWeight: '700', color: '#141712', fontFamily: Fonts.rounded }}>
                ユーザー
              </Text>
              <Text
                selectable
                style={{ fontSize: 12, color: '#718268', fontFamily: Fonts.rounded }}>
                user@example.com
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, gap: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 4, height: 20, borderRadius: 999, backgroundColor: '#A8DF8E' }} />
          <Text
            selectable
            style={{ fontSize: 16, fontWeight: '700', color: '#141712', fontFamily: Fonts.rounded }}>
            アプリ設定
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 6px 12px rgba(20, 23, 18, 0.08)',
            borderCurve: 'continuous',
          }}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              gap: 12,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(168, 223, 142, 0.2)',
            }}>
            <IconSymbol name="bell.fill" size={20} color="#A8DF8E" />
            <Text
              selectable
              style={{ flex: 1, fontSize: 14, color: '#141712', fontFamily: Fonts.rounded }}>
              通知設定
            </Text>
            <IconSymbol name="chevron.right" size={16} color="#718268" />
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              gap: 12,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(168, 223, 142, 0.2)',
            }}>
            <IconSymbol name="moon.fill" size={20} color="#A8DF8E" />
            <Text
              selectable
              style={{ flex: 1, fontSize: 14, color: '#141712', fontFamily: Fonts.rounded }}>
              テーマ
            </Text>
            <IconSymbol name="chevron.right" size={16} color="#718268" />
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              gap: 12,
            }}>
            <IconSymbol name="questionmark.circle.fill" size={20} color="#A8DF8E" />
            <Text
              selectable
              style={{ flex: 1, fontSize: 14, color: '#141712', fontFamily: Fonts.rounded }}>
              ヘルプ
            </Text>
            <IconSymbol name="chevron.right" size={16} color="#718268" />
          </Pressable>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingTop: 12 }}>
        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: '#FFAAB8',
            borderRadius: 999,
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 8,
            boxShadow: '0 10px 18px rgba(255, 170, 184, 0.4)',
          }}>
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={18} color="#FFFFFF" />
          <Text
            selectable
            style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700', fontFamily: Fonts.rounded }}>
            ログアウト
          </Text>
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: 24, alignItems: 'center', paddingTop: 20 }}>
        <Text
          selectable
          style={{ fontSize: 11, color: '#94A3B8', fontFamily: Fonts.rounded }}>
          バージョン 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}
