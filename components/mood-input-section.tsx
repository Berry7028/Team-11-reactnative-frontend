import React, { useMemo, useState } from "react";
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
    id: "good",
    label: "いい感じ",
    color: "#D9F2B0",
    text: "#2E5B2E",
    icon: "sparkles",
  },
  {
    id: "ok",
    label: "普通",
    color: "#FFFFFF",
    text: "#141712",
    icon: "circle.fill",
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

// API の Condition 型と「今の体調」に関するマッピング
const BODY_STATES: {
  id: string;
  label: Condition;
  color: string;
  text: string;
  icon: IconSymbolName;
}[] = [
  {
    id: "light",
    label: "絶好調",
    color: "#FFFFFF",
    text: "#141712",
    icon: "wind",
  },
  {
    id: "slightly-light",
    label: "いい感じ",
    color: "#F1FAEA",
    text: "#2E5B2E",
    icon: "leaf",
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
    label: "少しだるい",
    color: "#FFE9C7",
    text: "#7A4E00",
    icon: "moon.stars.fill",
  },
  {
    id: "pain",
    label: "つらい",
    color: "#FFDADA",
    text: "#B22222",
    icon: "heart.fill",
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

interface StepOption {
  id: string;
  label: string;
  color: string;
  text: string;
  icon: IconSymbolName;
}

interface StepSliderProps {
  options: StepOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  accentColor: string;
  emptyLabel: string;
}

function StepSlider({
  options,
  selectedId,
  onSelect,
  accentColor,
  emptyLabel,
}: StepSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const selectedIndex = useMemo(
    () => options.findIndex((item) => item.id === selectedId),
    [options, selectedId],
  );
  const stepWidth = trackWidth > 0 ? trackWidth / (options.length - 1) : 0;

  const handlePressAt = (x: number) => {
    if (!stepWidth) return;
    const index = Math.max(
      0,
      Math.min(options.length - 1, Math.round(x / stepWidth)),
    );
    onSelect(options[index].id);
  };

  return (
    <View style={{ gap: 14 }}>
      <View
        onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
        onStartShouldSetResponder={() => true}
        onResponderRelease={(event) =>
          handlePressAt(event.nativeEvent.locationX)
        }
        style={{ height: 48, justifyContent: "center" }}
      >
        <View
          style={{
            height: 40,
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: "rgba(20, 23, 18, 0.12)",
            boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
            overflow: "hidden",
            flexDirection: "row",
            alignItems: "stretch",
          }}
        >
          {options.map((option, index) => (
            <Pressable
              key={option.id}
              onPress={() => onSelect(option.id)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  selectedId === option.id
                    ? option.color
                    : "rgba(255,255,255,0.9)",
              }}
            >
              <Text
                selectable
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color:
                    selectedId === option.id ? option.text : "rgba(20,23,18,0.5)",
                  fontFamily: Fonts.rounded,
                }}
              >
                {option.label}
              </Text>
              {index < options.length - 1 && (
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 6,
                    bottom: 6,
                    width: 1,
                    backgroundColor: "rgba(20,23,18,0.12)",
                  }}
                />
              )}
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ height: 2 }} />
    </View>
  );
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
            {selectedMoodId ? (
              <View
                style={{
                  marginLeft: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 999,
                  backgroundColor:
                    MOODS.find((mood) => mood.id === selectedMoodId)?.color ??
                    "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "rgba(20, 23, 18, 0.12)",
                }}
              >
                <IconSymbol
                  name={
                    MOODS.find((mood) => mood.id === selectedMoodId)?.icon ??
                    "circle.fill"
                  }
                  size={12}
                  color={
                    MOODS.find((mood) => mood.id === selectedMoodId)?.text ??
                    "#141712"
                  }
                />
                <Text
                  selectable
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color:
                      MOODS.find((mood) => mood.id === selectedMoodId)?.text ??
                      "#141712",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {MOODS.find((mood) => mood.id === selectedMoodId)?.label}
                </Text>
              </View>
            ) : (
              <Text
                selectable
                style={{
                  marginLeft: 8,
                  fontSize: 11,
                  color: "#718268",
                  fontWeight: "600",
                  fontFamily: Fonts.rounded,
                }}
              >
                5段階で選んでね
              </Text>
            )}
          </View>
          <StepSlider
            options={MOODS}
            selectedId={selectedMoodId}
            onSelect={handleMoodSelect}
            accentColor="#6CBF6A"
            emptyLabel="5段階で選んでね"
          />
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
            {selectedBodyStateId ? (
              <View
                style={{
                  marginLeft: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 999,
                  backgroundColor:
                    BODY_STATES.find((state) => state.id === selectedBodyStateId)
                      ?.color ?? "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "rgba(20, 23, 18, 0.12)",
                }}
              >
                <IconSymbol
                  name={
                    BODY_STATES.find(
                      (state) => state.id === selectedBodyStateId,
                    )?.icon ?? "circle.fill"
                  }
                  size={12}
                  color={
                    BODY_STATES.find(
                      (state) => state.id === selectedBodyStateId,
                    )?.text ?? "#141712"
                  }
                />
                <Text
                  selectable
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color:
                      BODY_STATES.find(
                        (state) => state.id === selectedBodyStateId,
                      )?.text ?? "#141712",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {
                    BODY_STATES.find(
                      (state) => state.id === selectedBodyStateId,
                    )?.label
                  }
                </Text>
              </View>
            ) : (
              <Text
                selectable
                style={{
                  marginLeft: 8,
                  fontSize: 11,
                  color: "#718268",
                  fontWeight: "600",
                  fontFamily: Fonts.rounded,
                }}
              >
                5段階で選んでね
              </Text>
            )}
          </View>
          <StepSlider
            options={BODY_STATES}
            selectedId={selectedBodyStateId}
            onSelect={handleBodySelect}
            accentColor="#6CBF6A"
            emptyLabel="5段階で選んでね"
          />
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
