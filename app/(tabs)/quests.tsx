import { Image } from "expo-image";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { IconSymbol, type IconSymbolName } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

type Quest = {
  id: string;
  title: string;
  category?: string;
  energy: string;
  icon: IconSymbolName;
  image: string;
  highlighted?: boolean;
};

const QUESTS: Quest[] = [
  {
    id: "relax",
    title: "何もしない（5分間ぼーっとする）",
    category: "RELAXATION",
    energy: "エネルギー：低め",
    icon: "sparkles",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfNbcIQ1avdjPGROSw-cLh0X51mem4kfBqg95eQgebD7GxgNjvMmVMIzkcqLlWPdfzSaXWLIsM5baeK2O3TwTDsgo8A2v46l1f2d-rr4z640NcM1Wmug6BY2AhDPGrCjQCDAUqJi2Fofn2DqMgSfyYfdyv5cWEFLVgr7TqC7XDfR9HL6IISrCuamnm8KVD2BMS5S15iVervdhdT8qx0qTritiW1jpU4KKyXfuXdvLa6tU1OJyh4Ut0FBAfG2KBn95T1vqQQGvWvGgA",
    highlighted: true,
  },
  {
    id: "warm-drink",
    title: "温かい飲み物を飲む",
    category: "RELAX",
    energy: "リラックスタイム",
    icon: "cup.and.saucer.fill",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAN2AX1o1Q8e4jng34h23w_0a-tPK_m6-onNZQPHUJgRqfmdVAlhi0R58ELEXEjhbOGUkOzBJwXhsseyZ2FBi58OjJOZWIj2seacQtc4FneFXY5cNArNXzlPBIILLA9zuV5xUelKtcjCN8fFhpk5db9oGdysI7sbQZhNvKjGimxzZ2xY3pLXlf48PFn6N4X7tCM7Jyy1PED2oMk29GVkJJyTzF4257vUXmWV-sKHKsDVwz0_unMaQgD_8wKFGRjbSPUTZEUki5KhLtd",
  },
  {
    id: "look-up",
    title: "空を見上げる",
    category: "REFRESH",
    energy: "気分転換に",
    icon: "sun.max.fill",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcfp6lKYsSqV-9Wy31EK4fxUXZTE-2TughJyq06Epwtcc39YfIeKqQfK6K86FkATTXPizX5wCdE0f5qN_ZNF70gh31Rd7fxSUWH2CI7RPdQ-RsFP1sCfSYsr23bjve1lpee2AWFahHYXLrDh-3oG6s46zUgjckbaAn9HzBekY7TAFYGGpmeBdgZSi3uro8XvuO_BS_Mf5wS7aZFaDGB8xjTgId5ap312WMm8PyobnHJt7Ag7Z614N4RX9Jq-kdcPQyEDMNq1z7nHuI",
  },
];

export default function QuestsScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: "#FFF9FA" }}
      contentContainerStyle={{ paddingBottom: 28, gap: 20 }}
    >
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <Text
          selectable
          style={{
            color: "#FFAAB8",
            fontSize: 12,
            fontWeight: "700",
            letterSpacing: 1,
            textAlign: "center",
            fontFamily: Fonts.rounded,
          }}
        >
          今のあなたにぴったりの目標
        </Text>
        <Text
          selectable
          style={{
            color: "#5C5254",
            fontSize: 12,
            textAlign: "center",
            marginTop: 6,
            fontFamily: Fonts.rounded,
          }}
        >
          無理のない範囲で、少しずつ進めていきましょう
        </Text>
      </View>

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
              「ここにいるだけで、もう十分がんばっていますよ。ゆっくり深呼吸しましょう。」
            </Text>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, gap: 18 }}>
        {QUESTS.map((quest) => (
          <View
            key={quest.id}
            style={{
              backgroundColor: quest.highlighted ? "#FFD8DF" : "#FFFFFF",
              borderRadius: 28,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: quest.highlighted
                ? "rgba(255, 170, 184, 0.2)"
                : "#F1E6E8",
              boxShadow: "0 8px 18px rgba(255, 170, 184, 0.12)",
              borderCurve: "continuous",
            }}
          >
            <Image
              source={{ uri: quest.image }}
              contentFit="cover"
              style={{ height: 170, width: "100%" }}
            />
            <View style={{ padding: 20, gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <View style={{ flex: 1 }}>
                  {quest.category ? (
                    <Text
                      selectable
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        letterSpacing: 2,
                        color: quest.highlighted
                          ? "#332D2E"
                          : "rgba(51, 45, 46, 0.6)",
                        fontFamily: Fonts.rounded,
                      }}
                    >
                      {quest.category}
                    </Text>
                  ) : null}
                  <Text
                    selectable
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#332D2E",
                      marginTop: 6,
                      lineHeight: 24,
                      fontFamily: Fonts.rounded,
                    }}
                  >
                    {quest.title}
                  </Text>
                </View>
                <IconSymbol name={quest.icon} size={28} color="#FFAAB8" />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
              >
                <Text
                  selectable
                  style={{
                    fontSize: 12,
                    color: quest.highlighted
                      ? "#5C5254"
                      : "rgba(51, 45, 46, 0.6)",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {quest.energy}
                </Text>
                <Pressable
                  style={{
                    height: 44,
                    paddingHorizontal: 18,
                    borderRadius: 999,
                    backgroundColor: "#FFAAB8",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    boxShadow: "0 6px 14px rgba(255, 170, 184, 0.4)",
                  }}
                >
                  <IconSymbol name="sparkles" size={18} color="#FFFFFF" />
                  <Text
                    selectable
                    style={{
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: "700",
                      fontFamily: Fonts.rounded,
                    }}
                  >
                    達成！
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
