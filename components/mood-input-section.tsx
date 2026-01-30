import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import type { Condition, Mood } from "@/lib/api";

import { BODY_STATES, MOODS } from "./mood-input/constants";
import { SelectionHeader } from "./mood-input/selection-header";
import { StepSlider } from "./mood-input/step-slider";

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

const EMPTY_LABEL = "5段階で選んでね";

function getOptionLabel<TLabel extends string>(
  options: { id: string; label: TLabel }[],
  id: string | null,
) {
  if (!id) return null;
  return options.find((option) => option.id === id)?.label ?? null;
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

  const selectedMood = selectedMoodId
    ? MOODS.find((mood) => mood.id === selectedMoodId)
    : undefined;
  const selectedBodyState = selectedBodyStateId
    ? BODY_STATES.find((state) => state.id === selectedBodyStateId)
    : undefined;

  const notifyChange = (
    moodId: string | null,
    bodyId: string | null,
    freeText: string,
  ) => {
    onChange?.({
      mood: getOptionLabel(MOODS, moodId),
      condition: getOptionLabel(BODY_STATES, bodyId),
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
          <SelectionHeader
            title="今の気分"
            accentColor="#A8DF8E"
            emptyLabel={EMPTY_LABEL}
            selectedOption={selectedMood}
          />
          <StepSlider
            options={MOODS}
            selectedId={selectedMoodId}
            onSelect={handleMoodSelect}
          />
        </View>
      )}

      {showBodySelector && (
        <View style={{ paddingHorizontal: 24, gap: 12 }}>
          <SelectionHeader
            title="今の体調"
            accentColor="#A8DF8E"
            emptyLabel={EMPTY_LABEL}
            selectedOption={selectedBodyState}
          />
          <StepSlider
            options={BODY_STATES}
            selectedId={selectedBodyStateId}
            onSelect={handleBodySelect}
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
