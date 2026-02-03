import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { authColors } from './styles';

export interface AuthPrimaryButtonProps {
  label: string;
  loadingLabel?: string;
  loading: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export function AuthPrimaryButton({
  label,
  loadingLabel,
  loading,
  onPress,
  disabled,
}: AuthPrimaryButtonProps) {
  const effectiveDisabled = disabled ?? loading;
  const displayLabel = loading && loadingLabel != null ? loadingLabel : label;

  return (
    <Pressable
      onPress={onPress}
      disabled={effectiveDisabled}
      style={[styles.button, effectiveDisabled && styles.buttonDisabled]}
    >
      <Text selectable style={styles.label}>
        {displayLabel}
      </Text>
      <IconSymbol name="checkmark.circle.fill" size={18} color={authColors.primaryButtonText} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 999,
    backgroundColor: authColors.primaryButton,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    boxShadow: '0 10px 18px rgba(168, 223, 142, 0.4)',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  label: {
    color: authColors.primaryButtonText,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Fonts.rounded,
  },
});
