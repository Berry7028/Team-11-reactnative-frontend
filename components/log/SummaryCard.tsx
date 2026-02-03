import React from 'react';
import { Text, View } from 'react-native';

import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

import { cardContainer, summaryCardIconBox } from './styles';

export interface SummaryCardProps {
  icon: IconSymbolName;
  label: string;
  value: string | number;
  width: number;
  iconColor?: string;
  iconBgColor?: string;
}

export function SummaryCard({
  icon,
  label,
  value,
  width,
  iconColor = '#718268',
  iconBgColor = 'rgba(168, 223, 142, 0.1)',
}: SummaryCardProps) {
  return (
    <View
      style={[
        cardContainer,
        {
          width,
          minHeight: 120,
          paddingVertical: 16,
          paddingHorizontal: 14,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      <View style={[summaryCardIconBox, { backgroundColor: iconBgColor }]}>
        <IconSymbol name={icon} size={22} color={iconColor} />
      </View>
      <Text
        selectable
        style={{
          fontSize: 10,
          fontWeight: '600',
          color: '#718268',
          fontFamily: Fonts.rounded,
          letterSpacing: 0.5,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
      <Text
        selectable
        style={{
          fontSize: 22,
          fontWeight: '700',
          color: '#141712',
          fontFamily: Fonts.rounded,
          textAlign: 'center',
          lineHeight: 28,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
