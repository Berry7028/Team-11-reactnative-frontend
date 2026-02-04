import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import { GrassBackground } from "@/components/grass-background";
import { Fonts } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { completeMascotOnboarding } from "@/lib/api";

const QUESTIONS = [
  {
    key: "personality",
    title: "あなたに合う性格は？",
    options: [
      "元気いっぱい",
      "おっとり穏やか",
      "真面目で几帳面",
      "天然でマイペース",
      "ツンデレ",
    ],
  },
  {
    key: "favorite_color",
    title: "好きな色は？",
    options: ["赤系", "青系", "緑系", "黄色系", "紫系", "ピンク系"],
  },
  {
    key: "support_style",
    title: "どんな応援が好き？",
    options: [
      "元気に励ます",
      "優しく寄り添う",
      "論理的にアドバイス",
      "ユーモアで和ませる",
    ],
  },
  {
    key: "activity_level",
    title: "あなたの活動スタイルは？",
    options: ["アクティブ", "バランス型", "のんびり"],
  },
] as const;

type QuestionKey = (typeof QUESTIONS)[number]["key"];

export default function MascotSetupScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const userUuid = session?.user?.id;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<QuestionKey, string>>({
    personality: "",
    favorite_color: "",
    support_style: "",
    activity_level: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuestion = QUESTIONS[step];

  const progressText = useMemo(() => {
    const percent = Math.min(progress, 100);
    return `${percent}%`;
  }, [progress]);

  const clearProgressTimer = () => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
  };

  const handleSelect = async (value: string) => {
    const nextAnswers = { ...answers, [currentQuestion.key]: value };
    setAnswers(nextAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    if (!userUuid) {
      Alert.alert("エラー", "ユーザー情報が取得できませんでした");
      return;
    }

    setIsGenerating(true);
    setProgress(10);

    clearProgressTimer();
    progressTimer.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + 7, 90));
    }, 1500);

    try {
      await completeMascotOnboarding(userUuid, {
        personality: nextAnswers.personality,
        favorite_color: nextAnswers.favorite_color,
        support_style: nextAnswers.support_style,
        activity_level: nextAnswers.activity_level,
      });

      clearProgressTimer();
      setProgress(100);

      setTimeout(() => {
        router.replace("/(tabs)");
      }, 800);
    } catch (error) {
      clearProgressTimer();
      setIsGenerating(false);
      setProgress(0);
      Alert.alert("エラー", "キャラクター生成に失敗しました。もう一度お試しください。");
    }
  };

  const handleBack = () => {
    if (step === 0) {
      router.back();
      return;
    }
    setStep((prev) => Math.max(prev - 1, 0));
  };

  if (isGenerating) {
    return (
      <GrassBackground>
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ paddingHorizontal: 24, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#10B981" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#141712",
                fontFamily: Fonts.rounded,
                textAlign: "center",
                marginTop: 24,
              }}
            >
              あなただけのマスコットを生成中…
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#718268",
                fontFamily: Fonts.rounded,
                textAlign: "center",
                marginTop: 8,
                lineHeight: 20,
              }}
            >
              15〜30秒ほどで完成します。少しだけ待ってください。
            </Text>

            <View
              style={{
                marginTop: 24,
                width: "100%",
                height: 10,
                borderRadius: 999,
                backgroundColor: "rgba(113, 130, 104, 0.15)",
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${Math.min(progress, 100)}%`,
                  backgroundColor: "#10B981",
                  borderRadius: 999,
                }}
              />
            </View>
            <Text
              style={{
                marginTop: 8,
                fontSize: 12,
                color: "#718268",
                fontFamily: Fonts.rounded,
              }}
            >
              {progressText}
            </Text>
          </View>
        </SafeAreaView>
      </GrassBackground>
    );
  }

  return (
    <GrassBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 40,
            paddingBottom: 32,
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: "#141712",
                fontFamily: Fonts.rounded,
              }}
            >
              マスコットの見た目を決めよう
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#718268",
                fontFamily: Fonts.rounded,
                lineHeight: 20,
              }}
            >
              性格設定とは別に、見た目の好みを教えてください。
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 8 }}>
            {QUESTIONS.map((_, index) => (
              <View
                key={`step-${index}`}
                style={{
                  flex: 1,
                  height: 6,
                  borderRadius: 999,
                  backgroundColor:
                    index <= step ? "#10B981" : "rgba(113, 130, 104, 0.2)",
                }}
              />
            ))}
          </View>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              padding: 20,
              borderWidth: 1,
              borderColor: "#EEF1ED",
              gap: 14,
              shadowColor: "#141712",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 6,
              borderCurve: "continuous",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#141712",
                fontFamily: Fonts.rounded,
              }}
            >
              {currentQuestion.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#718268",
                fontFamily: Fonts.rounded,
              }}
            >
              質問 {step + 1} / {QUESTIONS.length}
            </Text>

            <View style={{ gap: 10 }}>
              {currentQuestion.options.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => handleSelect(option)}
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderRadius: 16,
                    backgroundColor: "rgba(168, 223, 142, 0.15)",
                    borderWidth: 1,
                    borderColor: "rgba(168, 223, 142, 0.35)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#3A4D39",
                      fontFamily: Fonts.rounded,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              onPress={handleBack}
              style={{ alignItems: "center", paddingVertical: 10 }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#718268",
                  fontFamily: Fonts.rounded,
                  fontWeight: "600",
                }}
              >
                ← 前の質問に戻る
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GrassBackground>
  );
}
