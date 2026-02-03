import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { authColors, authStyles } from './styles';

export interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
}

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize = 'none',
}: FormFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text selectable style={authStyles.label}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={authColors.placeholder}
        style={authStyles.input}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
});
