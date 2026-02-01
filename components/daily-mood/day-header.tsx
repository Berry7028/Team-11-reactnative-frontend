import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export function DayHeader() {
  return (
    <View style={{ paddingHorizontal: 24, alignItems: "center", gap: 18 }}>
      <View style={{ alignItems: "center", gap: 12 }}>
        <View style={{ position: "relative" }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              padding: 14,
              borderRadius: 999,
              borderWidth: 4,
              borderColor: "#FFFFFF",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT_5wjRFwJoR7GXTvgMqmJikC5wzKm5Yvp3tZ51nbh9qIp_B2W5vM_4o64OZATfYIfg6m0K3rehQKcXyDgjP9w8NLa-LwsBvlWlkdLQcZoGiu7gHOgZuBUoMtPoI6M7uz3n4v34ciT3Slcdb-GcVeUm4o3RbxRiy_mwc_ykFJaN1NMKQh4Fgcp43GPnEDHjTTt562Sdo7IGg_z8IfEDgX8s_tcePmkWWR_byDWHNs6LZclP9uErItqdq0vbRnDf9aPmfOTXFIOglFG",
              }}
              contentFit="cover"
              style={{ height: 96, width: 96, borderRadius: 48 }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              backgroundColor: "#FFAAB8",
              height: 28,
              width: 28,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(255, 170, 184, 0.4)",
            }}
          >
            <IconSymbol name="heart.fill" size={14} color="#FFFFFF" />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "rgba(168, 223, 142, 0.2)",
            boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
            borderCurve: "continuous",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -6,
              left: "50%",
              marginLeft: -6,
              height: 12,
              width: 12,
              backgroundColor: "#FFFFFF",
              transform: [{ rotate: "45deg" }],
              borderLeftWidth: 1,
              borderTopWidth: 1,
              borderColor: "rgba(168, 223, 142, 0.2)",
            }}
          />
          <Text
            selectable
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#141712",
              textAlign: "center",
              fontFamily: Fonts.rounded,
            }}
          >
            今の気分を教えて？
          </Text>
          <Text
            selectable
            style={{
              fontSize: 12,
              color: "#718268",
              textAlign: "center",
              marginTop: 4,
              fontFamily: Fonts.rounded,
            }}
          >
            いつでもお話聞くよ。
          </Text>
        </View>
      </View>
    </View>
  );
}
