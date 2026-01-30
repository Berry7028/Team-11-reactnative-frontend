import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/** ホームの草背景用：葉っぱ（leaf）の位置・サイズ・色 */
const FOOTPRINTS = [
  { top: 0.18, left: 0.12, size: 22, color: "rgba(168, 223, 142, 0.5)" },
  { top: 0.1, right: 0.16, size: 18, color: "rgba(168, 223, 142, 0.35)" },
  { top: 0.68, left: 0.08, size: 24, color: "rgba(168, 223, 142, 0.45)" },
  { top: 0.82, right: 0.12, size: 20, color: "rgba(168, 223, 142, 0.3)" },
];

/** ホームの草背景用：ドット（circle）の位置・サイズ・色 */
const DUSTS = [
  { top: 0.36, left: 0.1, size: 12, color: "rgba(156, 169, 134, 0.45)" },
  { top: 0.18, right: 0.26, size: 10, color: "rgba(156, 169, 134, 0.35)" },
  { top: 0.58, right: 0.12, size: 14, color: "rgba(156, 169, 134, 0.4)" },
  { top: 0.78, left: 0.34, size: 11, color: "rgba(156, 169, 134, 0.3)" },
];

const GRASS_BG = "#F0FFDF";

/**
 * ホーム画面と同じ草背景（薄緑＋葉・ドットの装飾）を表示するラッパー。
 * クエスト以外の画面で使用する。
 */
export function GrassBackground({ children }: { children: React.ReactNode }) {
  return (
    <View style={[styles.container, { backgroundColor: GRASS_BG }]}>
      <View style={styles.decoration} pointerEvents="none">
        {FOOTPRINTS.map((fp, index) => (
          <IconSymbol
            key={`leaf-${index}`}
            name="leaf"
            size={fp.size}
            color={fp.color}
            style={{
              position: "absolute",
              top: fp.top * SCREEN_HEIGHT,
              ...("left" in fp && fp.left != null && { left: fp.left * SCREEN_WIDTH }),
              ...("right" in fp && fp.right != null && { right: fp.right * SCREEN_WIDTH }),
            }}
          />
        ))}
        {DUSTS.map((d, index) => (
          <IconSymbol
            key={`dust-${index}`}
            name="circle.fill"
            size={d.size}
            color={d.color}
            style={{
              position: "absolute",
              top: d.top * SCREEN_HEIGHT,
              ...("left" in d && d.left != null && { left: d.left * SCREEN_WIDTH }),
              ...("right" in d && d.right != null && { right: d.right * SCREEN_WIDTH }),
            }}
          />
        ))}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decoration: {
    ...StyleSheet.absoluteFillObject,
  },
});
