import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AvatarImage } from '@/components/ui/avatar-image';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import type { EncounterWithQuests } from '@/lib/api';

import { cardContainer } from './styles';

export interface EncounterRowProps {
  encounter: EncounterWithQuests;
  stampSent: boolean;
  sending: boolean;
  onSendThanksStamp: () => void | Promise<void>;
}

function getQuestText(completedQuests: EncounterWithQuests['completed_quests']): string {
  const questsToShow = completedQuests.slice(0, 3);
  if (questsToShow.length > 0) {
    return questsToShow.map((q) => `『${q.title}』`).join('、') + 'を達成しました';
  }
  return '今日のクエストに挑戦中';
}

export function EncounterRow({
  encounter,
  stampSent,
  sending,
  onSendThanksStamp,
}: EncounterRowProps) {
  const displayName = encounter.other_user_name ?? '旅の仲間';
  const questText = getQuestText(encounter.completed_quests);

  return (
    <View style={[cardContainer, styles.row]}>
      <View style={styles.left}>
        <AvatarImage avatarUrl={encounter.other_user_avatar} size={56} />
        <View style={styles.info}>
          <Text selectable style={styles.name}>
            {displayName}
          </Text>
          <View style={styles.questRow}>
            <IconSymbol name="checkmark.seal.fill" size={14} color="#7DA15E" />
            <Text selectable numberOfLines={2} style={styles.questText}>
              {questText}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.stampColumn}>
        <Pressable
          onPress={onSendThanksStamp}
          disabled={stampSent || sending}
          style={[
            styles.stampButton,
            stampSent && styles.stampButtonSent,
          ]}
        >
          {sending ? (
            <ActivityIndicator size="small" color="#FFAAB8" />
          ) : (
            <IconSymbol
              name="heart.fill"
              size={18}
              color={stampSent ? '#D87D8E' : '#FFAAB8'}
            />
          )}
        </Pressable>
        <Text
          selectable
          style={[styles.stampLabel, stampSent && styles.stampLabelSent]}
        >
          お疲れ様
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#141712',
    fontFamily: Fonts.rounded,
  },
  questRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  questText: {
    fontSize: 12,
    color: '#718268',
    flexShrink: 1,
    fontFamily: Fonts.rounded,
  },
  stampColumn: {
    alignItems: 'center',
    gap: 4,
  },
  stampButton: {
    height: 44,
    width: 44,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 170, 184, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampButtonSent: {
    backgroundColor: 'rgba(216, 125, 142, 0.25)',
  },
  stampLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFAAB8',
    fontFamily: Fonts.rounded,
  },
  stampLabelSent: {
    color: '#D87D8E',
  },
});
