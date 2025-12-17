import { getUser } from "@/services/auth.service";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function index() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadAuthStatus(): Promise<void> {
      const user = await getUser();
      setUser(user);
      setLoading(false);
    }

    setTimeout(() => loadAuthStatus(), 50);
  }, []);

  if (loading) return null;

  if (user) return <Redirect href="/(tabs)" />;

  return <Redirect href="/(auth)/OnboardScreen" />;
}
