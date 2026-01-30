import { supabase } from "../supabase";

/**
 * お疲れ様スタンプを送る（1すれ違い1回まで）。
 * 重複時はエラーを投げずに何もしない（idempotent）。
 */
export async function sendThanksStamp(
  encounterId: number,
  toUserId: string
): Promise<void> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("ログインしてください");
  }

  const { error } = await supabase.from("log_likes").insert({
    encounter_id: encounterId,
    from_user_id: user.id,
    to_user_id: toUserId,
  });

  if (error) {
    if (error.code === "23505") {
      // UNIQUE violation = すでに送付済み
      return;
    }
    console.error("お疲れ様スタンプの送信に失敗:", error);
    throw new Error(`スタンプの送信に失敗しました: ${error.message}`);
  }
}

/**
 * 今日自分が他者から受け取ったお疲れ様スタンプの件数を返す。
 */
export async function getThanksStampsReceivedCountToday(): Promise<number> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return 0;
  }

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const { count, error } = await supabase
    .from("log_likes")
    .select("id", { count: "exact", head: true })
    .eq("to_user_id", user.id)
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lt("created_at", `${tomorrow}T00:00:00.000Z`);

  if (error) {
    console.error("お疲れ様スタンプ（受け取り）件数の取得に失敗:", error);
    return 0;
  }

  return count ?? 0;
}

/**
 * 指定した encounter_id のうち、自分がスタンプ送付済みの id の Set を返す。
 */
export async function getThanksStampSentByEncounterIds(
  encounterIds: number[]
): Promise<Set<number>> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user || encounterIds.length === 0) {
    return new Set();
  }

  const { data, error } = await supabase
    .from("log_likes")
    .select("encounter_id")
    .eq("from_user_id", user.id)
    .in("encounter_id", encounterIds);

  if (error) {
    console.error("送付済みスタンプの取得に失敗:", error);
    return new Set();
  }

  return new Set((data ?? []).map((row) => row.encounter_id));
}
