import type { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { IconSymbol, type IconSymbolName } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

interface TabConfig {
  icon: IconSymbolName;
  iconSize: number;
  pinkTint: boolean;
}

const TAB_CONFIG: Record<string, TabConfig> = {
  log: { icon: "book.closed.fill", iconSize: 26, pinkTint: false },
  quests: { icon: "checkmark.circle.fill", iconSize: 26, pinkTint: true },
  index: { icon: "house.fill", iconSize: 36, pinkTint: false },
  "daily-mood": { icon: "heart.circle.fill", iconSize: 26, pinkTint: true },
  settings: { icon: "gearshape.fill", iconSize: 26, pinkTint: false },
};

function TabBarItem({
  label,
  routeName,
  isFocused,
  onPress,
  onLongPress,
}: {
  label: string;
  routeName: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const config = TAB_CONFIG[routeName] ?? TAB_CONFIG.index;
  const activeTintColor = config.pinkTint ? "#FFAAB8" : "#A8DF8E";
  const inactiveTintColor = "#8E9A8D";
  const color = isFocused ? activeTintColor : inactiveTintColor;

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.9);

  useEffect(() => {
    scale.value = withTiming(isFocused ? 1.06 : 1, { duration: 180 });
    opacity.value = withTiming(isFocused ? 1 : 0.9, { duration: 180 });
  }, [isFocused, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const isHome = routeName === "index";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={() => {
        if (Platform.OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress();
      }}
      onLongPress={onLongPress}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 4,
        marginTop: isHome ? -4 : 0,
      }}
    >
      <Animated.View style={[{ alignItems: "center", gap: 2 }, animatedStyle]}>
        <IconSymbol size={config.iconSize} name={config.icon} color={color} />
        <Text
          style={{
            fontSize: 10,
            color,
            fontFamily: Fonts.rounded,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  const prevIndex = useRef(state.index);

  useEffect(() => {
    if (prevIndex.current !== state.index) {
      prevIndex.current = state.index;
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  }, [state.index]);

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderTopColor: "#FFAAB8",
        borderTopWidth: 1,
        height: 72,
        paddingBottom: 14,
        paddingTop: 8,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = (options.title ?? route.name) as string;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarItem
            key={route.key}
            label={label}
            routeName={route.name}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}
