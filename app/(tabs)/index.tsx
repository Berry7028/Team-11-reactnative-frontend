import { Image } from "expo-image";
import React from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { supabase } from "@/lib/supabase";

const ACTIONS = [
  { label: "元気づけて", icon: "sparkles", active: true },
  { label: "話を聞いて", icon: "ear" },
  { label: "落ち着きたい", icon: "heart.fill" },
  { label: "挑戦する", icon: "figure.walk" },
];

const FOOTPRINTS = [
  { top: "18%", left: "12%", size: 22, color: "rgba(168, 223, 142, 0.5)" },
  { top: "10%", right: "16%", size: 18, color: "rgba(168, 223, 142, 0.35)" },
  { top: "68%", left: "8%", size: 24, color: "rgba(168, 223, 142, 0.45)" },
  { top: "82%", right: "12%", size: 20, color: "rgba(168, 223, 142, 0.3)" },
];

const DUSTS = [
  { top: "36%", left: "10%", size: 12, color: "rgba(156, 169, 134, 0.45)" },
  { top: "18%", right: "26%", size: 10, color: "rgba(156, 169, 134, 0.35)" },
  { top: "58%", right: "12%", size: 14, color: "rgba(156, 169, 134, 0.4)" },
  { top: "78%", left: "34%", size: 11, color: "rgba(156, 169, 134, 0.3)" },
];

export default function HomeScreen() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("サインアウトに失敗しました", error.message);
    }
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: "#F0FFDF" }}
      contentContainerStyle={{ paddingBottom: 32, gap: 20 }}
    >
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              height: 44,
              width: 44,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.7)",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(58, 77, 57, 0.1)",
              borderCurve: "continuous",
            }}
          >
            <IconSymbol name="person.fill" size={20} color="#3A4D39" />
          </View>
          <View style={{ alignItems: "center" }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <IconSymbol name="heart.fill" size={14} color="#A8DF8E" />
              <Text
                selectable
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: "rgba(58, 77, 57, 0.7)",
                  letterSpacing: 1,
                  fontFamily: Fonts.rounded,
                }}
              >
                12日連続
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 44,
              width: 44,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.7)",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(58, 77, 57, 0.1)",
              borderCurve: "continuous",
            }}
          >
            <IconSymbol name="bell" size={20} color="#3A4D39" />
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16, alignItems: "flex-end" }}>
        <Pressable
          onPress={handleSignOut}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.75)",
            borderWidth: 1,
            borderColor: "rgba(231, 239, 225, 0.9)",
          }}
        >
          <Text
            selectable
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: "#6B7A66",
              fontFamily: Fonts.rounded,
            }}
          >
            サインアウト
          </Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {ACTIONS.map((action) => (
          <View
            key={action.label}
            style={{
              height: 40,
              paddingHorizontal: 18,
              borderRadius: 999,
              backgroundColor: action.active
                ? "#A8DF8E"
                : "rgba(255,255,255,0.65)",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              borderWidth: 1,
              borderColor: action.active
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.4)",
              boxShadow: "0 2px 8px rgba(58, 77, 57, 0.12)",
              borderCurve: "continuous",
            }}
          >
            <IconSymbol
              name={action.icon}
              size={18}
              color={action.active ? "#FFFFFF" : "#3A4D39"}
            />
            <Text
              selectable
              style={{
                fontSize: 12,
                fontWeight: action.active ? "700" : "600",
                color: action.active ? "#FFFFFF" : "#3A4D39",
                fontFamily: Fonts.rounded,
              }}
            >
              {action.label}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 16,
          alignItems: "center",
          justifyContent: "center",
          minHeight: 340,
        }}
      >
        <View
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        >
          {FOOTPRINTS.map((footprint, index) => (
            <IconSymbol
              key={`plant-${index}`}
              name="leaf"
              size={footprint.size}
              color={footprint.color}
              style={{ position: "absolute", ...footprint }}
            />
          ))}
          {DUSTS.map((dust, index) => (
            <IconSymbol
              key={`dust-${index}`}
              name="circle.fill"
              size={dust.size}
              color={dust.color}
              style={{ position: "absolute", ...dust }}
            />
          ))}
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              position: "absolute",
              height: 220,
              width: 220,
              borderRadius: 999,
              backgroundColor: "rgba(168, 223, 142, 0.22)",
              transform: [{ scale: 0.9 }],
              boxShadow: "0 0 60px rgba(168, 223, 142, 0.5)",
            }}
          />
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtUsib9ENztKVjMX28hWFZVGQNgDXAPaM0IPg0tDMj7MBKyXZYzMyiK5xx4O4c-fe-6Hkzyp4pNfN5QtkQ2QsUy4v6snS_Eo1KkDY4aln8xLTWHrbhcKbUz7nfK-1kFb1W6iafEHQMvt-MREpQEnwnanonycgvo2p2rkOCxziV_tX_M3_m04subRXhWYl0M328eAMlC1PTtND881h3W6Yq4pCVvdYK3DrJNfDW1VNKVbHFQAopliOkePwYj-R0jhiRWxVPA5gU0W8P",
            }}
            contentFit="contain"
            style={{ width: 220, height: 220 }}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "rgba(255,255,255,0.9)",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: "#FFFFFF",
            boxShadow: "0 8px 20px rgba(58, 77, 57, 0.08)",
            borderCurve: "continuous",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -8,
              left: "50%",
              marginLeft: -8,
              height: 16,
              width: 16,
              backgroundColor: "rgba(255,255,255,0.9)",
              transform: [{ rotate: "45deg" }],
              borderLeftWidth: 1,
              borderTopWidth: 1,
              borderColor: "#FFFFFF",
            }}
          />
          <Text
            selectable
            style={{
              color: "#3A4D39",
              fontSize: 16,
              fontWeight: "700",
              textAlign: "center",
              lineHeight: 22,
              fontFamily: Fonts.rounded,
            }}
          >
            「今日はゆっくり過ごそうね」
          </Text>
        </View>
        <View
          style={{
            marginTop: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: "rgba(255,255,255,0.45)",
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.4)",
          }}
        >
          <IconSymbol
            name="person.3.fill"
            size={16}
            color="rgba(58, 77, 57, 0.6)"
          />
          <Text
            selectable
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: "rgba(58, 77, 57, 0.6)",
              fontFamily: Fonts.rounded,
            }}
          >
            14人がすれ違いました
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, gap: 16 }}>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: 16,
            borderRadius: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.9)",
            boxShadow: "0 12px 24px rgba(168, 223, 142, 0.2)",
            borderCurve: "continuous",
          }}
        >
          <View
            style={{
              height: 56,
              width: 56,
              borderRadius: 18,
              backgroundColor: "rgba(168, 223, 142, 0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconSymbol name="wind" size={28} color="#A8DF8E" />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              selectable
              style={{
                fontSize: 10,
                fontWeight: "700",
                color: "#A8DF8E",
                letterSpacing: 0.5,
                fontFamily: Fonts.rounded,
              }}
            >
              現在のクエスト
            </Text>
            <Text
              selectable
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#3A4D39",
                marginTop: 4,
                fontFamily: Fonts.rounded,
              }}
            >
              深呼吸を1回する
            </Text>
            <View
              style={{
                marginTop: 10,
                height: 8,
                borderRadius: 999,
                backgroundColor: "rgba(168, 223, 142, 0.15)",
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: "40%",
                  height: "100%",
                  borderRadius: 999,
                  backgroundColor: "#A8DF8E",
                  boxShadow: "0 0 10px rgba(168, 223, 142, 0.6)",
                }}
              />
            </View>
          </View>
          <Pressable
            style={{
              height: 44,
              width: 44,
              borderRadius: 999,
              backgroundColor: "#A8DF8E",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 16px rgba(168, 223, 142, 0.3)",
            }}
          >
            <IconSymbol name="play.fill" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
