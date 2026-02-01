import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
} from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import type { StepOption } from "./constants";

interface StepSliderProps {
  options: StepOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const TRACK_HEIGHT = 48;
const THUMB_SIZE = 44;
const ICON_SIZE = 20;

function clampIndex(index: number, max: number): number {
  return Math.max(0, Math.min(max, index));
}

function indexFromPosition(
  fingerX: number,
  trackWidth: number,
  optionCount: number,
): number {
  if (trackWidth <= 0 || optionCount <= 1) return 0;
  const segmentWidth = (trackWidth - THUMB_SIZE) / (optionCount - 1);
  const index =
    segmentWidth > 0
      ? (fingerX - THUMB_SIZE / 2) / segmentWidth
      : 0;
  return clampIndex(Math.round(index), optionCount - 1);
}

export function StepSlider({
  options,
  selectedId,
  onSelect,
}: StepSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const trackLeftRef = useRef(0);
  const trackRef = useRef<View>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const selectedIndex = options.findIndex((o) => o.id === selectedId);
  const currentIndex = dragIndex ?? (selectedIndex >= 0 ? selectedIndex : 0);
  const segmentWidth =
    trackWidth > 0 && options.length > 1
      ? (trackWidth - THUMB_SIZE) / (options.length - 1)
      : 0;
  const currentOption = options[currentIndex];

  // アニメーション値を更新
  useEffect(() => {
    if (trackWidth > 0) {
      const targetLeft = segmentWidth * currentIndex;
      Animated.spring(animatedValue, {
        toValue: targetLeft,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    }
  }, [currentIndex, segmentWidth, trackWidth]);

  // ドラッグ開始時のスケールアニメーション
  const animateScale = (toValue: number) => {
    Animated.spring(scaleAnim, {
      toValue,
      useNativeDriver: true,
      friction: 5,
      tension: 40,
    }).start();
  };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt: GestureResponderEvent) => {
          const index = indexFromPosition(
            evt.nativeEvent.locationX,
            trackWidth,
            options.length,
          );
          setDragIndex(index);
          animateScale(1.15);
        },
        onPanResponderMove: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => {
          if (trackWidth <= 0) return;
          const fingerX = gestureState.moveX - trackLeftRef.current;
          const clampedX = Math.min(trackWidth, Math.max(0, fingerX));
          const index = indexFromPosition(
            clampedX,
            trackWidth,
            options.length,
          );
          setDragIndex(index);
          // ドラッグ中はアニメーションなしで即座に追従
          const targetLeft = segmentWidth * index;
          animatedValue.setValue(targetLeft);
        },
        onPanResponderRelease: (evt: GestureResponderEvent) => {
          const fingerX = evt.nativeEvent.locationX;
          const clampedX = Math.min(trackWidth, Math.max(0, fingerX));
          const index = indexFromPosition(
            clampedX,
            trackWidth,
            options.length,
          );
          const clamped = clampIndex(index, options.length - 1);
          setDragIndex(clamped);
          animateScale(1);
          onSelect(options[clamped].id);
        },
      }),
    [trackWidth, options, onSelect, segmentWidth, animatedValue],
  );

  useEffect(() => {
    setDragIndex(null);
  }, [selectedId]);

  if (options.length === 0) return null;

  return (
    <View
      style={{ height: TRACK_HEIGHT, justifyContent: "center" }}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
    >
      <View
        ref={trackRef}
        style={{
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          borderColor: "rgba(20, 23, 18, 0.08)",
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 2,
        }}
        onLayout={() => {
          trackRef.current?.measureInWindow((x) => {
            trackLeftRef.current = x;
          });
        }}
        {...panResponder.panHandlers}
      >
        {trackWidth > 0 && (
          <>
            {options.map((option, index) => (
              <View
                key={option.id}
                style={{
                  position: "absolute",
                  left: index * segmentWidth + (THUMB_SIZE - ICON_SIZE) / 2,
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  borderRadius: ICON_SIZE / 2,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: currentIndex === index ? 0 : 0.4,
                }}
                pointerEvents="none"
              >
                <IconSymbol
                  name={option.icon}
                  size={ICON_SIZE - 8}
                  color="#6B7A66"
                />
              </View>
            ))}
            <Animated.View
              style={{
                position: "absolute",
                left: 0,
                transform: [
                  { translateX: animatedValue },
                  { scale: scaleAnim },
                ],
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                borderRadius: THUMB_SIZE / 2,
                backgroundColor: currentOption?.color ?? "#A8DF8E",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#141712",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 4,
              }}
              pointerEvents="none"
            >
              <IconSymbol
                name={currentOption?.icon ?? "circle.fill"}
                size={22}
                color={currentOption?.text ?? "#FFFFFF"}
              />
            </Animated.View>
          </>
        )}
      </View>
    </View>
  );
}
