import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";

export interface AvatarImageProps {
  /** アバター画像のURL。null/空の場合はデフォルトアイコンを表示 */
  avatarUrl: string | null;
  /** 表示サイズ（幅・高さとも同じ円形） */
  size?: number;
  /** スケルトン用の背景色（任意） */
  skeletonColor?: string;
}

export function AvatarImage({
  avatarUrl,
  size = 48,
  skeletonColor = "rgba(200, 200, 200, 0.4)",
}: AvatarImageProps) {
  const [loadFailed, setLoadFailed] = useState(false);

  // URL が変わったらエラー状態をリセット
  useEffect(() => {
    setLoadFailed(false);
  }, [avatarUrl]);

  const hasValidUrl =
    typeof avatarUrl === "string" && avatarUrl.trim().length > 0;
  const showDefault = !hasValidUrl || loadFailed;

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: 999,
    overflow: "hidden" as const,
    backgroundColor: "#F0FFDF",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  };

  if (showDefault) {
    return (
      <View style={containerStyle}>
        <IconSymbol name="person.fill" size={size * 0.45} color="#FFAAB8" />
      </View>
    );
  }

  // URL あり: スケルトンの上に Image。読み込み中はスケルトンが見え、完了で画像が表示。エラーでフォールバック
  return (
    <View style={containerStyle}>
      {/* 読み込み中のスケルトン */}
      <View
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: 999,
          backgroundColor: skeletonColor,
        }}
      />
      <Image
        source={{ uri: avatarUrl! }}
        style={{ width: size, height: size }}
        onLoad={() => setLoadFailed(false)}
        onError={() => setLoadFailed(true)}
      />
    </View>
  );
}
