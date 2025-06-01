import { useAuth as useClerkAuth } from "@clerk/clerk-expo";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export function useAuth() {
  const { isLoaded, isSignedIn, signOut } = useClerkAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("[useAuth] isLoaded:", isLoaded);
    console.log("[useAuth] isSignedIn:", isSignedIn);
    console.log("[useAuth] segments:", segments);

    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(tabs)";
    const inAuthGroup = segments[0] === "(auth)";

    console.log("[useAuth] inTabsGroup:", inTabsGroup, "inAuthGroup:", inAuthGroup);

    if (isSignedIn && inAuthGroup) {
      console.log("[useAuth] Redirecting to /tabs");
      router.replace("/(tabs)");
    } else if (!isSignedIn && inTabsGroup) {
      console.log("[useAuth] Redirecting to /login");
      router.replace("/login");
    }
  }, [isSignedIn, segments, isLoaded]);

  return {
    isLoaded,
    isSignedIn,
    signOut,
  };
}