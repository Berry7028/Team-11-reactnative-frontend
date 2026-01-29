import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { IconSymbol, type IconSymbolName } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import type { Condition, Mood } from "@/lib/api";

// API の Mood 型とマッピング
const MOODS: {
  id: string;
  label: Mood;
  color: string;
  text: string;
  icon: IconSymbolName;
}[] = [
  {
    id: "great",
    label: "絶好調",
    color: "#A8DF8E",
    text: "#FFFFFF",
    icon: "sun.max.fill",
  },
  {
    id: "ok",
    label: "普通",
    color: "#FFFFFF",
    text: "#141712",
    icon: "sparkles",
  },
  {
    id: "meh",
    label: "モヤモヤ",
    color: "#FFD8DF",
    text: "#8B3D48",
    icon: "cloud.fill",
  },
  {
    id: "tough",
    label: "つらい",
    color: "#FFAAB8",
    text: "#FFFFFF",
    icon: "heart.fill",
  },
];

// API の Condition 型とマッピング
const BODY_STATES: {
  id: string;
  label: Condition;
  color: string;
  text: string;
  icon: IconSymbolName;
}[] = [
  {
    id: "light",
    label: "軽い",
    color: "#FFFFFF",
    text: "#141712",
    icon: "wind",
  },
  {
    id: "normal",
    label: "ふつう",
    color: "#E9F7E2",
    text: "#2E5B2E",
    icon: "figure.walk",
  },
  {
    id: "tired",
    label: "だるい",
    color: "#FFE9C7",
    text: "#7A4E00",
    icon: "moon.stars.fill",
  },
  {
    id: "pain",
    label: "痛い",
    color: "#FFDADA",
    text: "#B22222",
    icon: "bandage.fill",
  },
];

export interface MoodInputData {
  mood: Mood | null;
  condition: Condition | null;
  freeText: string;
}

interface MoodInputSectionProps {
  placeholder?: string;
  showMoodSelector?: boolean;
  showBodySelector?: boolean;
  onChange?: (data: MoodInputData) => void;
}

export function MoodInputSection({
  placeholder = "今の気持ちを自由に書いてね...",
  showMoodSelector = true,
  showBodySelector = true,
  onChange,
}: MoodInputSectionProps) {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [selectedBodyStateId, setSelectedBodyStateId] = useState<string | null>(
    null,
  );
  const [text, setText] = useState("");

  const getMoodLabel = (id: string | null): Mood | null => {
    if (!id) return null;
    return MOODS.find((m) => m.id === id)?.label ?? null;
  };

  const getConditionLabel = (id: string | null): Condition | null => {
    if (!id) return null;
    return BODY_STATES.find((s) => s.id === id)?.label ?? null;
  };

  const notifyChange = (
    moodId: string | null,
    bodyId: string | null,
    freeText: string,
  ) => {
    onChange?.({
      mood: getMoodLabel(moodId),
      condition: getConditionLabel(bodyId),
      freeText,
    });
  };

  const handleMoodSelect = (id: string) => {
    setSelectedMoodId(id);
    notifyChange(id, selectedBodyStateId, text);
  };

  const handleBodySelect = (id: string) => {
    setSelectedBodyStateId(id);
    notifyChange(selectedMoodId, id, text);
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    notifyChange(selectedMoodId, selectedBodyStateId, newText);
  };

  return (
    <View style={{ gap: 20 }}>
      {showMoodSelector && (
        <View style={{ paddingHorizontal: 24, gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                width: 4,
                height: 20,
                borderRadius: 999,
                backgroundColor: "#A8DF8E",
              }}
            />
            <Text
              selectable
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: "#141712",
                fontFamily: Fonts.rounded,
              }}
            >
              今の気分
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {MOODS.map((mood, index) => (
              <Pressable
                key={mood.id}
                onPress={() => handleMoodSelect(mood.id)}
                style={{
                  flexBasis: "48%",
                  minWidth: "48%",
                  height: 56,
                  borderRadius: 20,
                  backgroundColor: mood.color,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 8,
                  borderWidth: 1,
                  borderColor:
                    selectedMoodId === mood.id
                      ? "#6CBF6A"
                      : index === 1
                        ? "rgba(168, 223, 142, 0.2)"
                        : "rgba(255,255,255,0.4)",
                  boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
                  borderCurve: "continuous",
                  transform: [{ scale: selectedMoodId === mood.id ? 1.01 : 1 }],
                }}
              >
                <IconSymbol name={mood.icon} size={18} color={mood.text} />
                <Text
                  selectable
                  style={{
                    color: mood.text,
                    fontSize: 12,
                    fontWeight: "700",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {mood.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {showBodySelector && (
        <View style={{ paddingHorizontal: 24, gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                width: 4,
                height: 20,
                borderRadius: 999,
                backgroundColor: "#A8DF8E",
              }}
            />
            <Text
              selectable
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: "#141712",
                fontFamily: Fonts.rounded,
              }}
            >
              今の体調
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {BODY_STATES.map((state, index) => (
              <Pressable
                key={state.id}
                onPress={() => handleBodySelect(state.id)}
                style={{
                  flexBasis: "48%",
                  minWidth: "48%",
                  height: 56,
                  borderRadius: 20,
                  backgroundColor: state.color,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 8,
                  borderWidth: 1,
                  borderColor:
                    selectedBodyStateId === state.id
                      ? "#6CBF6A"
                      : index === 0
                        ? "rgba(168, 223, 142, 0.2)"
                        : "rgba(255,255,255,0.4)",
                  boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
                  borderCurve: "continuous",
                  transform: [
                    { scale: selectedBodyStateId === state.id ? 1.01 : 1 },
                  ],
                }}
              >
                <IconSymbol name={state.icon} size={18} color={state.text} />
                <Text
                  selectable
                  style={{
                    color: state.text,
                    fontSize: 12,
                    fontWeight: "700",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {state.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <View style={{ paddingHorizontal: 24, gap: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <IconSymbol name="pencil" size={18} color="#A8DF8E" />
          <Text
            selectable
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: "#141712",
              fontFamily: Fonts.rounded,
            }}
          >
            自由入力
          </Text>
        </View>
        <View>
          <TextInput
            multiline
            value={text}
            onChangeText={handleTextChange}
            placeholder={placeholder}
            placeholderTextColor="rgba(113, 130, 104, 0.5)"
            maxLength={500}
            style={{
              height: 180,
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              padding: 18,
              fontSize: 14,
              color: "#141712",
              textAlignVertical: "top",
              boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
              borderCurve: "continuous",
              fontFamily: Fonts.rounded,
            }}
          />
          <Text
            selectable
            style={{
              position: "absolute",
              right: 16,
              bottom: 14,
              fontSize: 10,
              color: "#718268",
              fontWeight: "600",
              fontFamily: Fonts.rounded,
            }}
          >
            {text.length} / 500
          </Text>
        </View>
      </View>
    </View>
  );
}
