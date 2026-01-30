import { supabase } from "../supabase";

export interface MyProfile {
  uuid: string;
  display_name: string | null;
  avatar_url: string | null;
}

/**
 * 自分のプロフィールを public.users から取得
 */
export async function getMyProfile(): Promise<MyProfile | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("認証情報の取得に失敗:", authError);
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("uuid, display_name, avatar_url")
    .eq("uuid", user.id)
    .single();

  if (error) {
    console.error("プロフィールの取得に失敗:", error);
    return null;
  }

  return data as MyProfile;
}

/**
 * 自分のアバターURLを更新
 * @param avatarUrl 新しいアバターURL。空文字の場合は NULL に更新
 */
export async function updateMyAvatar(avatarUrl: string): Promise<void> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("認証情報の取得に失敗しました");
  }

  const { error } = await supabase
    .from("users")
    .update({
      avatar_url: avatarUrl.trim() === "" ? null : avatarUrl.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("uuid", user.id);

  if (error) {
    console.error("アバターの更新に失敗:", error);
    throw new Error(`アバターの更新に失敗: ${error.message}`);
  }
}
