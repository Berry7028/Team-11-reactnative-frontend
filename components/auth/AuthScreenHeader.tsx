import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

import { authColors } from './styles';

export interface AuthScreenHeaderProps {
  icon: IconSymbolName;
  title: string;
  subtitle: string;
}

export function AuthScreenHeader({ icon, title, subtitle }: AuthScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <IconSymbol name={icon} size={28} color={authColors.iconAccent} />
      </View>
      <Text selectable style={styles.title}>
        {title}
      </Text>
      <Text selectable style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  iconWrapper: {
    height: 72,
    width: 72,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 16px rgba(168, 223, 142, 0.25)',
    borderCurve: 'continuous',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: authColors.title,
    fontFamily: Fonts.rounded,
  },
  subtitle: {
    fontSize: 12,
    color: authColors.subtitle,
    textAlign: 'center',
    fontFamily: Fonts.rounded,
  },
});
