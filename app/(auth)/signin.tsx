import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import {
  AuthPrimaryButton,
  AuthScreenHeader,
  FormField,
  PasswordField,
} from "@/components/auth";
import { authStyles } from "@/components/auth/styles";
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
      Alert.alert("ログインに失敗しました", error.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={authStyles.scroll}
      contentContainerStyle={authStyles.scrollContent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <AuthScreenHeader
        icon="heart.fill"
        title="おかえりなさい"
        subtitle="いつもの空気感で、ふわっとログイン"
      />

      <View style={authStyles.formFields}>
        <FormField
          label="メールアドレス"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <PasswordField
          label="パスワード"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <AuthPrimaryButton
        label="ログイン"
        loadingLabel="ログイン中..."
        loading={loading}
        onPress={handleSignIn}
      />

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
              新規ユーザー登録へ
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
