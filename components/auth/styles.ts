import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';

/** 認証画面で共通の色 */
export const authColors = {
  title: '#3A4D39',
  subtitle: '#6B7A66',
  inputText: '#141712',
  placeholder: 'rgba(107, 122, 102, 0.5)',
  primaryButton: '#A8DF8E',
  primaryButtonText: '#FFFFFF',
  iconAccent: '#FFAAB8',
} as const;

/** 認証画面の共通スタイル */
export const authStyles = StyleSheet.create({
  scroll: {
    backgroundColor: '#F0FFDF',
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
  formFields: {
    gap: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: authColors.title,
    fontFamily: Fonts.rounded,
  },
  input: {
    height: 52,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 14,
    color: authColors.inputText,
    boxShadow: '0 6px 12px rgba(20, 23, 18, 0.08)',
    borderCurve: 'continuous',
    fontFamily: Fonts.rounded,
  },
  inputWithToggle: {
    paddingRight: 48,
  },
});
