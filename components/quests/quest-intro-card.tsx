import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import { Fonts } from "@/constants/theme";

export function QuestIntroCard() {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          backgroundColor: "#FFFFFF",
          padding: 18,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: "#FFD8DF",
          boxShadow: "0 6px 16px rgba(255, 170, 184, 0.15)",
          borderCurve: "continuous",
        }}
      >
        <View
          style={{
            height: 64,
            width: 64,
            borderRadius: 999,
            backgroundColor: "rgba(255, 216, 223, 0.4)",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "#FFD8DF",
          }}
        >
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgpG_KJPstpM7GGXx-kb1p-fjF2HNBqa0paNYlGjIxfpJtYJheg6M8T9AuPonPlW-Rr63auI00J0Q6WA4EMJ_-pbW6pr4QzG2i6h_Z6Kyznz3Fm4y_NfTClnxtf8qMd6IV0GOkIDh4sk6vJAQeYs2ijcaGVwqLODuO_Ac_1s6l39SffMEGNJK6juZ7eGL4tjO63mMfPy7fy8pBONymn5n7LXyts_DROQv4TrSkzQ-wRXZaYt8fZIdz4dfSSh1mogbP2w_CEWrXLmJ3",
            }}
            contentFit="contain"
            style={{ width: 44, height: 44 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            selectable
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: "#332D2E",
              lineHeight: 20,
              fontFamily: Fonts.rounded,
            }}
          >
            ここにいるだけで、もう十分がんばっていますよ。無理のない範囲で少しずつ進めていきましょう
          </Text>
        </View>
      </View>
    </View>
  );
}
