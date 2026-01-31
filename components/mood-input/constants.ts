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
    color: "#B2EBF2",
    text: "#00838F",
    icon: "figure.walk",
  },
  {
    id: "meh",
    label: "モヤモヤ",
    color: "#FFF9C4",
    text: "#B8860B",
    icon: "cloud.fill",
  },
  {
    id: "tough",
    label: "つらい",
    color: "#FFAAB8",
    text: "#FFFFFF",
    icon: "exclamationmark.triangle.fill",
  },
];

export const BODY_STATES: StepOption<Condition>[] = [
  {
    id: "light",
    label: "絶好調",
    color: "#A8DF8E",
    text: "#FFFFFF",
    icon: "sun.max.fill",
  },
  {
    id: "slightly-light",
    label: "いい感じ",
    color: "#D9F2B0",
    text: "#2E5B2E",
    icon: "sparkles",
  },
  {
    id: "normal",
    label: "ふつう",
    color: "#B2EBF2",
    text: "#00838F",
    icon: "figure.walk",
  },
  {
    id: "tired",
    label: "少しだるい",
    color: "#FFF9C4",
    text: "#B8860B",
    icon: "bed.double.fill",
  },
  {
    id: "pain",
    label: "つらい",
    color: "#FFAAB8",
    text: "#FFFFFF",
    icon: "exclamationmark.triangle.fill",
  },
];
