import React from "react";
import { Text } from "react-native";

import { Fonts } from "@/constants/theme";

/**
 * 全画面共通ヘッダー用のアプリ名表示。
 * タブバーと同じ雰囲気（白・薄緑ベース）で左上に表示する。
 */
export function AppHeaderTitle() {
  return (
    <Text
      selectable={false}
      style={{
        fontSize: 18,
        fontWeight: "700",
        color: "#3A4D39",
        fontFamily: Fonts.rounded,
        letterSpacing: 0.3,
      }}
    >
      chocoLIFE
    </Text>
  );
}
