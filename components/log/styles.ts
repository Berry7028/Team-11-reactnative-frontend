import { StyleSheet } from 'react-native';

/** ログ画面の白カード共通スタイル（サマリーカード・EncounterRow で使用） */
export const cardContainer = {
  backgroundColor: '#FFFFFF' as const,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#EEF1ED' as const,
  shadowColor: '#141712' as const,
  shadowOffset: { width: 0, height: 6 } as const,
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 6,
  borderCurve: 'continuous' as const,
};

/** サマリーカードのアイコン用ボックス（背景色は呼び出し元で上書き） */
export const summaryCardIconBox = {
  marginBottom: 4,
  width: 38,
  height: 34,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  borderRadius: 12,
};

/** サマリー2枚の行レイアウト用定数 */
export const CARD_ROW_MARGIN = 16;
export const CARD_GAP = 14;

export const logStyles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    marginHorizontal: CARD_ROW_MARGIN,
    gap: CARD_GAP,
    alignItems: 'stretch',
  },
  encounterList: {
    paddingHorizontal: 16,
    gap: 14,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
});
