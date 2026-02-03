import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export interface LogEmptyViewProps {
  message?: string;
}

export function LogEmptyView({ message = '今日はまだすれ違いがありません' }: LogEmptyViewProps) {
  return (
    <View style={styles.container}>
      <IconSymbol name="figure.walk" size={48} color="#FFAAB8" />
      <Text selectable style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: 'center',
    gap: 12,
  },
  message: {
    fontSize: 14,
    color: '#718268',
    textAlign: 'center',
    fontFamily: Fonts.rounded,
  },
});
