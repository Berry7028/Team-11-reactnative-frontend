import { type Href, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import {
  AuthPrimaryButton,
  AuthScreenHeader,
  FormField,
  PasswordField,
} from "@/components/auth";
import { authStyles } from "@/components/auth/styles";
import { supabase } from "@/lib/supabase";

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      router.replace("/(onboarding)/personality" as Href);
    }
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
        icon="sparkles"
        title="はじめまして"
        subtitle="今日から一緒に、やさしく歩こう"
      />

      <View style={authStyles.formFields}>
        <FormField
          label="表示名"
          placeholder=""
          value={username}
          onChangeText={setUsername}
        />
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
        <PasswordField
          label="パスワード（確認）"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <AuthPrimaryButton
        label="はじめる"
        loadingLabel="登録中..."
        loading={loading}
        onPress={handleSignUp}
      />
    </ScrollView>
  );
}
