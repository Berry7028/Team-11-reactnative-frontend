import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'ログアウト',
      'ログアウトしますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: 'ログアウト',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/signin');
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: '#F0FFDF' }}
      contentContainerStyle={{ paddingBottom: 32, paddingTop: 20, gap: 20 }}>
      <View style={{ paddingHorizontal: 24, gap: 16 }}>
        <Text
          selectable
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#141712',
            fontFamily: Fonts.rounded,
          }}>
          設定
        </Text>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: 20,
            gap: 16,
            boxShadow: '0 6px 12px rgba(20, 23, 18, 0.08)',
            borderCurve: 'continuous',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                backgroundColor: 'rgba(168, 223, 142, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconSymbol name="person.fill" size={20} color="#A8DF8E" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                selectable
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#141712',
                  fontFamily: Fonts.rounded,
                }}>
                アカウント
              </Text>
              <Text
                selectable
                style={{
                  fontSize: 12,
                  color: '#718268',
                  fontFamily: Fonts.rounded,
                }}>
                ログイン中
              </Text>
            </View>
            <IconSymbol name="chevron.right" size={16} color="#718268" />
          </View>
        </View>

        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 6px 12px rgba(20, 23, 18, 0.08)',
            borderCurve: 'continuous',
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              backgroundColor: 'rgba(255, 170, 184, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#FFAAB8" />
          </View>
          <Text
            selectable
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: '#FFAAB8',
              fontFamily: Fonts.rounded,
            }}>
            ログアウト
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
