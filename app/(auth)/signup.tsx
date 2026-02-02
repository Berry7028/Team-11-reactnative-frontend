import { useRouter } from "expo-router";
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
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert(
        "入力エラー",
        "表示名・メールアドレス・パスワードを入力してください。",
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
      setLoading(false);
    } else if (!data.session) {
      Alert.alert(
        "確認メールを送信しました",
        "受信箱のリンクを確認してください。",
      );
      setLoading(false);
    } else {
      // セッションがある = 新規登録成功 → オンボーディングへ
      router.replace("/(onboarding)/personality");
    }
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
            表示名
          </Text>
          <TextInput
            placeholder="例）たろう"
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
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="******"
              secureTextEntry={!showPassword}
              placeholderTextColor="rgba(107, 122, 102, 0.5)"
              style={{
                height: 52,
                borderRadius: 18,
                backgroundColor: "#FFFFFF",
                paddingHorizontal: 16,
                paddingRight: 48,
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
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: 12,
                top: 0,
                bottom: 0,
                justifyContent: "center",
                padding: 4,
              }}
              accessibilityLabel={showPassword ? "パスワードを隠す" : "パスワードを表示"}
            >
              <IconSymbol
                name={showPassword ? "eye.slash.fill" : "eye.fill"}
                size={22}
                color="#6B7A66"
              />
            </Pressable>
          </View>
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
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="******"
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="rgba(107, 122, 102, 0.5)"
              style={{
                height: 52,
                borderRadius: 18,
                backgroundColor: "#FFFFFF",
                paddingHorizontal: 16,
                paddingRight: 48,
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
            <Pressable
              onPress={() => setShowConfirmPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: 12,
                top: 0,
                bottom: 0,
                justifyContent: "center",
                padding: 4,
              }}
              accessibilityLabel={showConfirmPassword ? "パスワードを隠す" : "パスワードを表示"}
            >
              <IconSymbol
                name={showConfirmPassword ? "eye.slash.fill" : "eye.fill"}
                size={22}
                color="#6B7A66"
              />
            </Pressable>
          </View>
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
    </ScrollView>
  );
}
