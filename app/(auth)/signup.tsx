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

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert(
        "入力エラー",
        "ユーザーID・メールアドレス・パスワードを入力してください。",
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("入力エラー", "パスワードが一致しません。");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: username },
      },
    });
    if (error) {
      Alert.alert("新規ユーザー登録に失敗しました", error.message);
    } else if (!data.session) {
      Alert.alert(
        "確認メールを送信しました",
        "受信箱のリンクを確認してください。",
      );
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
          <IconSymbol name="sparkles" size={28} color="#FFAAB8" />
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
          はじめまして
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
          今日から一緒に、やさしく歩こう
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
            ユーザーID
          </Text>
          <TextInput
            placeholder="例）new_mate"
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
            value={username}
            onChangeText={setUsername}
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
            パスワード（確認）
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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <Pressable
        onPress={handleSignUp}
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
          {loading ? "登録中..." : "はじめる"}
        </Text>
        <IconSymbol name="checkmark.circle.fill" size={18} color="#FFFFFF" />
      </Pressable>

      <View style={{ alignItems: "center", gap: 6 }}>
        <Text
          selectable
          style={{ fontSize: 12, color: "#6B7A66", fontFamily: Fonts.rounded }}
        >
          すでにアカウントをお持ちですか？
        </Text>
        <Link href="/(auth)/signin" asChild>
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
              ログインへ
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
