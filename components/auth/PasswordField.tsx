import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { authColors, authStyles } from './styles';

export interface PasswordFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function PasswordField({
  label,
  value,
  onChangeText,
  placeholder = '******',
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text selectable style={authStyles.label}>
        {label}
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={authColors.placeholder}
          style={[authStyles.input, authStyles.inputWithToggle]}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
        />
        <Pressable
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.toggleButton}
          accessibilityLabel={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
        >
          <IconSymbol
            name={showPassword ? 'eye.slash.fill' : 'eye.fill'}
            size={22}
            color={authColors.subtitle}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  inputWrapper: {
    position: 'relative',
  },
  toggleButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 4,
  },
});
