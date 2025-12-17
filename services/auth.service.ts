import { account } from "@/libs/appwrite";
import { handleAuthError } from "@/libs/handleAuthError";
import { makeRedirectUri } from "expo-auth-session";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { ID, OAuthProvider } from "react-native-appwrite";

interface AppwriteError {
  message: string;
  type: string;
  code: number;
}

export async function getUser() {
  try {
    return await account.get();
  } catch (e) {
    const error = e as AppwriteError;
    console.error(
      `[APPWRITE][USER][STATUS]: ERROR MESSAGE: ${error.message}\nERROR TYPE: ${error.type}\nERROR CODE: ${error.code}`
    );
    handleAuthError(error.type);
    return null;
  }
}

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    return await account.create({
      userId: ID.unique(),
      email,
      password,
    });
  } catch (e) {
    const error = e as AppwriteError;
    console.error(
      `[APPWRITE][AUTH][SIGNUP]: ERROR MESSAGE: ${error.message}\nERROR TYPE: ${error.type}\nERROR CODE: ${error.code}`
    );
    handleAuthError(error.type);
    return null;
  }
}

export async function logInUserWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    return await account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (e) {
    const error = e as AppwriteError;
    console.error(
      `[APPWRITE][AUTH][LOGIN]: ERROR MESSAGE: ${error.message}\nERROR TYPE: ${error.type}\nERROR CODE: ${error.code}`
    );
    handleAuthError(error.type);
    return null;
  }
}

/* OAuth2 AUTHENTICATION */
export async function logInWithOAuth2(provider: OAuthProvider) {
  const deeplink = new URL(makeRedirectUri({ preferLocalhost: true }));
  const scheme = `${deeplink.protocol}`;

  const loginUrl = await account.createOAuth2Token({
    provider,
    success: `${deeplink}`,
    failure: `${deeplink}`,
  });

  const result = await WebBrowser.openAuthSessionAsync(
    `${loginUrl}`,
    `${scheme}`
  );

  if (result.type !== "success") return;

  const url = new URL(result.url);
  const secret = url.searchParams.get("secret");
  const userId = url.searchParams.get("userId");

  try {
    const user = await account.createSession({
      userId: userId!,
      secret: secret!,
    });

    if (!user) return;
    router.push("/(tabs)");
  } catch (e) {
    console.error(e);
    return null;
  }
}

// LOGOUT USER
export async function logOutUser() {
  try {
    return await account.deleteSession({ sessionId: "current" });
  } catch (e) {
    console.error("Failed to log out user:", e);
    return null;
  }
}
