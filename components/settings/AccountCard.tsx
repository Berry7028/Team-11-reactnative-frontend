import { Session } from "@supabase/supabase-js";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { AvatarImage } from "@/components/ui/avatar-image";
import { Fonts } from "@/constants/theme";

type AccountCardProps = {
  session: Session | null;
  profileAvatarUrl: string | null;
  avatarUrlInput: string;
  isSavingAvatar: boolean;
  onAvatarUrlChange: (value: string) => void;
  onSaveAvatarUrl: () => void;
};

export function AccountCard({
  session,
  profileAvatarUrl,
  avatarUrlInput,
  isSavingAvatar,
  onAvatarUrlChange,
  onSaveAvatarUrl,
}: AccountCardProps) {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#EEF1ED",
        shadowColor: "#141712",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
        borderCurve: "continuous",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <AvatarImage avatarUrl={profileAvatarUrl} size={48} />
        <View style={{ flex: 1, minWidth: 0, justifyContent: "center", gap: 2 }}>
          <Text
            selectable
            style={{
              fontSize: 11,
              fontWeight: "600",
              color: "#718268",
              fontFamily: Fonts.rounded,
              letterSpacing: 0.5,
            }}
          >
            アカウント
          </Text>
          {session?.user && (
            <>
              {session.user.user_metadata?.display_name ? (
                <Text
                  selectable
                  numberOfLines={1}
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: "#141712",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {session.user.user_metadata.display_name}
                </Text>
              ) : null}
              <Text
                selectable
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 12,
                  color: "#718268",
                  fontFamily: Fonts.rounded,
                }}
              >
                {session.user.email ?? ""}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={{ marginTop: 16, gap: 8 }}>
        <Text
          selectable
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: "#718268",
            fontFamily: Fonts.rounded,
          }}
        >
          アバターURL
        </Text>
        <TextInput
          placeholder="https://..."
          placeholderTextColor="rgba(113, 130, 104, 0.5)"
          value={avatarUrlInput}
          onChangeText={onAvatarUrlChange}
          style={{
            height: 44,
            borderRadius: 12,
            backgroundColor: "rgba(168, 223, 142, 0.1)",
            paddingHorizontal: 14,
            fontSize: 13,
            color: "#141712",
            fontFamily: Fonts.rounded,
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable
          onPress={onSaveAvatarUrl}
          disabled={isSavingAvatar}
          style={{
            backgroundColor: "rgba(168, 223, 142, 0.3)",
            borderRadius: 12,
            paddingVertical: 10,
            alignItems: "center",
            opacity: isSavingAvatar ? 0.7 : 1,
          }}
        >
          <Text
            selectable
            style={{
              fontSize: 13,
              fontWeight: "700",
              color: "#3A4D39",
              fontFamily: Fonts.rounded,
            }}
          >
            {isSavingAvatar ? "保存中..." : "保存"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
