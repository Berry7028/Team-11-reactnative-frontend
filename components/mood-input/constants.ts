import type { IconSymbolName } from "@/components/ui/icon-symbol";
import type { Condition, Mood } from "@/lib/api";

export type StepOption<TLabel extends string = string> = {
  id: string;
  label: TLabel;
  color: string;
  text: string;
  icon: IconSymbolName;
};

export const MOODS: StepOption<Mood>[] = [
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
    label: "ふつう",
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

export const BODY_STATES: StepOption<Condition>[] = [
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
