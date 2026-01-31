import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { supabase } from "@/lib/supabase";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert(
        "入力エラー",
        "メールアドレスとパスワードを入力してください。",
      );
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert("サインインに失敗しました", error.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: "#F0FFDF" }}
      contentContainerStyle={{ padding: 20, gap: 20 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={{ alignItems: "center", gap: 10 }}>
        <View
          style={{
            height: 72,
            width: 72,
            borderRadius: 999,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(168, 223, 142, 0.25)",
            borderCurve: "continuous",
          }}
        >
          <IconSymbol name="heart.fill" size={28} color="#FFAAB8" />
        </View>
        <Text
          selectable
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#3A4D39",
            fontFamily: Fonts.rounded,
          }}
        >
          おかえりなさい
        </Text>
        <Text
          selectable
          style={{
            fontSize: 12,
            color: "#6B7A66",
            textAlign: "center",
            fontFamily: Fonts.rounded,
          }}
        >
          いつもの空気感で、ふわっとログイン
        </Text>
      </View>

      <View style={{ gap: 12 }}>
        <View style={{ gap: 6 }}>
          <Text
            selectable
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: "#3A4D39",
              fontFamily: Fonts.rounded,
            }}
          >
            メールアドレス
          </Text>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor="rgba(107, 122, 102, 0.5)"
            style={{
              height: 52,
              borderRadius: 18,
              backgroundColor: "#FFFFFF",
              paddingHorizontal: 16,
              fontSize: 14,
              color: "#141712",
              boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
              borderCurve: "continuous",
              fontFamily: Fonts.rounded,
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={{ gap: 6 }}>
          <Text
            selectable
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: "#3A4D39",
              fontFamily: Fonts.rounded,
            }}
          >
            パスワード
          </Text>
          <TextInput
            placeholder="******"
            secureTextEntry
            placeholderTextColor="rgba(107, 122, 102, 0.5)"
            style={{
              height: 52,
              borderRadius: 18,
              backgroundColor: "#FFFFFF",
              paddingHorizontal: 16,
              fontSize: 14,
              color: "#141712",
              boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
              borderCurve: "continuous",
              fontFamily: Fonts.rounded,
            }}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <Pressable
        onPress={handleSignIn}
        disabled={loading}
        style={{
          height: 54,
          borderRadius: 999,
          backgroundColor: "#A8DF8E",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
          boxShadow: "0 10px 18px rgba(168, 223, 142, 0.4)",
          opacity: loading ? 0.7 : 1,
        }}
      >
        <Text
          selectable
          style={{
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: "700",
            fontFamily: Fonts.rounded,
          }}
        >
          {loading ? "ログイン中..." : "ログイン"}
        </Text>
        <IconSymbol name="checkmark.circle.fill" size={18} color="#FFFFFF" />
      </Pressable>

      <View style={{ alignItems: "center", gap: 6 }}>
        <Text
          selectable
          style={{ fontSize: 12, color: "#6B7A66", fontFamily: Fonts.rounded }}
        >
          はじめての方はこちら
        </Text>
        <Link href="/(auth)/signup" asChild>
          <Pressable style={{ paddingVertical: 6, paddingHorizontal: 12 }}>
            <Text
              selectable
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: "#3A4D39",
                fontFamily: Fonts.rounded,
              }}
            >
              サインアップへ
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
