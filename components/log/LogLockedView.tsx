import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { GrassBackground } from '@/components/grass-background';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export function LogLockedView() {
  return (
    <GrassBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.inner}>
          <View style={styles.iconWrapper}>
            <IconSymbol name="lock.fill" size={48} color="#FFAAB8" />
          </View>
          <Text selectable style={styles.title}>
            すれ違った仲間を見るには
          </Text>
          <Text selectable style={styles.subtitle}>
            夜の気分を記録すると{'\n'}今日すれ違った仲間が見られます
          </Text>
        </View>
      </ScrollView>
    </GrassBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingBottom: 32,
    paddingTop: 20,
    gap: 20,
  },
  inner: {
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
    gap: 16,
  },
  iconWrapper: {
    padding: 20,
    borderRadius: 999,
    backgroundColor: 'rgba(168, 223, 142, 0.15)',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#141712',
    textAlign: 'center',
    fontFamily: Fonts.rounded,
  },
  subtitle: {
    fontSize: 14,
    color: '#718268',
    textAlign: 'center',
    fontFamily: Fonts.rounded,
    lineHeight: 22,
  },
});
