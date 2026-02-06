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
  adoptedQuestIds: Set<number>;
  adoptingQuestIds: Set<number>;
  onAdoptQuest: (quest: EncounterWithQuests["completed_quests"][number]) => void | Promise<void>;
}

export function EncounterRow({
  encounter,
  stampSent,
  sending,
  onSendThanksStamp,
  adoptedQuestIds,
  adoptingQuestIds,
  onAdoptQuest,
}: EncounterRowProps) {
  const displayName = encounter.other_user_name ?? '旅の仲間';
  const questsToShow = encounter.completed_quests.slice(0, 3);
  const hasCompletedQuests = questsToShow.length > 0;

  return (
    <View style={[cardContainer, styles.card]}>
      {/* ヘッダー: アバター + 名前 + スタンプ */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <AvatarImage avatarUrl={encounter.other_user_avatar} size={44} />
        </View>
        <View style={styles.nameArea}>
          <Text selectable style={styles.name} numberOfLines={1}>
            {displayName}
          </Text>
          {hasCompletedQuests ? (
            <Text selectable style={styles.subtitle}>
              クエスト {questsToShow.length}件クリア
            </Text>
          ) : (
            <Text selectable style={styles.subtitle}>
              今日のクエストに挑戦中
            </Text>
          )}
        </View>
        <Pressable
          onPress={onSendThanksStamp}
          disabled={stampSent || sending}
          style={({ pressed }) => [
            styles.stampButton,
            stampSent && styles.stampButtonSent,
            pressed && !stampSent && !sending && styles.stampButtonPressed,
          ]}
        >
          {sending ? (
            <ActivityIndicator size="small" color="#FFAAB8" />
          ) : (
            <>
              <IconSymbol
                name="heart.fill"
                size={16}
                color={stampSent ? '#FFFFFF' : '#FFAAB8'}
              />
              <Text
                selectable
                style={[styles.stampText, stampSent && styles.stampTextSent]}
              >
                {stampSent ? '送信済み' : 'お疲れ様'}
              </Text>
            </>
          )}
        </Pressable>
      </View>

      {/* クエスト一覧 */}
      {hasCompletedQuests && (
        <View style={styles.questSection}>
          {questsToShow.map((quest) => {
            const isAdopted = adoptedQuestIds.has(quest.id);
            const isAdopting = adoptingQuestIds.has(quest.id);
            return (
              <View key={quest.id} style={styles.questRow}>
                <View style={styles.questDot} />
                <Text selectable numberOfLines={1} style={styles.questText}>
                  {quest.title}
                </Text>
                <Pressable
                  onPress={() => onAdoptQuest(quest)}
                  disabled={isAdopted || isAdopting}
                  style={({ pressed }) => [
                    styles.adoptButton,
                    isAdopted && styles.adoptButtonDone,
                    pressed && !isAdopted && !isAdopting && styles.adoptButtonPressed,
                  ]}
                >
                  {isAdopting ? (
                    <ActivityIndicator size="small" color="#FFAAB8" />
                  ) : (
                    <Text
                      selectable
                      style={[
                        styles.adoptButtonText,
                        isAdopted && styles.adoptButtonTextDone,
                      ]}
                    >
                      {isAdopted ? '追加済み' : '挑戦する'}
                    </Text>
                  )}
                </Pressable>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    gap: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    shadowColor: '#7DA15E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  nameArea: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C3527',
    fontFamily: Fonts.rounded,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9CA986',
    fontFamily: Fonts.rounded,
  },
  stampButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 34,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 170, 184, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255, 170, 184, 0.25)',
    paddingHorizontal: 12,
  },
  stampButtonSent: {
    backgroundColor: '#FFAAB8',
    borderColor: '#FFAAB8',
  },
  stampButtonPressed: {
    backgroundColor: 'rgba(255, 170, 184, 0.20)',
  },
  stampText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFAAB8',
    fontFamily: Fonts.rounded,
  },
  stampTextSent: {
    color: '#FFFFFF',
  },
  questSection: {
    marginTop: 12,
    marginLeft: 56,
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(125, 161, 94, 0.15)',
    paddingTop: 12,
  },
  questRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  questDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A8DF8E',
  },
  questText: {
    fontSize: 13,
    color: '#4A5740',
    flexShrink: 1,
    flex: 1,
    fontFamily: Fonts.rounded,
  },
  adoptButton: {
    minWidth: 64,
    height: 28,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 170, 184, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 170, 184, 0.20)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  adoptButtonDone: {
    backgroundColor: 'rgba(125, 161, 94, 0.10)',
    borderColor: 'rgba(125, 161, 94, 0.20)',
  },
  adoptButtonPressed: {
    backgroundColor: 'rgba(255, 170, 184, 0.18)',
  },
  adoptButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFAAB8',
    fontFamily: Fonts.rounded,
  },
  adoptButtonTextDone: {
    color: '#7DA15E',
  },
});
