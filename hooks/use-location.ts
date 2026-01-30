import { useEffect, useState } from "react";
import {
  requestLocationPermissions,
  startLocationTracking,
  stopLocationTracking,
  isLocationTrackingActive,
} from "@/lib/location-service";

interface LocationPermissions {
  foreground: boolean;
  background: boolean;
}

interface UseLocationResult {
  permissions: LocationPermissions | null;
  isTracking: boolean;
  isLoading: boolean;
  requestPermissions: () => Promise<void>;
  startTracking: () => Promise<void>;
  stopTracking: () => Promise<void>;
}

/**
 * 位置情報サービスを扱うための React フック
 */
export function useLocation(): UseLocationResult {
  const [permissions, setPermissions] = useState<LocationPermissions | null>(
    null
  );
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 初期化: トラッキング状態を確認
  useEffect(() => {
    const initialize = async () => {
      try {
        const tracking = await isLocationTrackingActive();
        setIsTracking(tracking);
      } catch (error) {
        console.error("位置情報の初期化に失敗:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  // 権限を要求
  const requestPermissions = async () => {
    try {
      setIsLoading(true);
      const perms = await requestLocationPermissions();
      setPermissions(perms);
    } catch (error) {
      console.error("権限の要求に失敗:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // トラッキングを開始
  const startTracking = async () => {
    try {
      setIsLoading(true);
      const success = await startLocationTracking();
      if (success) {
        setIsTracking(true);
      }
    } catch (error) {
      console.error("トラッキングの開始に失敗:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // トラッキングを停止
  const stopTracking = async () => {
    try {
      setIsLoading(true);
      await stopLocationTracking();
      setIsTracking(false);
    } catch (error) {
      console.error("トラッキングの停止に失敗:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    permissions,
    isTracking,
    isLoading,
    requestPermissions,
    startTracking,
    stopTracking,
  };
}
