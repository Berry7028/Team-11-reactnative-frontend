import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";

// 通知の動作設定
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(() => {
      scheduleDailyNotifications();
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    // 通知をタップした時のリスナー
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { actionIdentifier, notification } = response;
        console.log(
          "Notification response received:",
          actionIdentifier,
          notification,
        );

        // daily-mood 画面へ遷移
        router.push("/(tabs)/daily-mood");
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, [router]);

  return <>{children}</>;
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }

  try {
    // projectId がない場合はローカル通知のみ利用する
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;
    if (!projectId) {
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
  } catch (e) {
    console.log("Error getting push token:", e);
  }

  return token;
}

async function scheduleDailyNotifications() {
  // 既存のスケジュールをクリア（重複防止）
  await Notifications.cancelAllScheduledNotificationsAsync();

  // 朝の通知 (5:00)
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "おはようございます！☀️",
      body: "朝の記録をしましょう。今の気分はどうですか？",
      data: { type: "morning" },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 5,
      minute: 0,
    },
  });

  // 夜の通知 (18:00)
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "お疲れ様でした！🌙",
      body: "夜の記録をしましょう。今日はどんな一日でしたか？",
      data: { type: "night" },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 18,
      minute: 0,
    },
  });

  console.log("Daily notifications scheduled: 5:00 and 18:00");
}
