import { account } from "@/libs/appwrite";

export function makeUserAvatar(name: string) {
  const endpoint = process.env.EXPO_PUBLIC_APPWRITE_API_ENDPOINT;
  const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

  return `${endpoint}/avatars/initials?name=${encodeURIComponent(
    name
  )}&heiht=160&width=160&project=${projectId}`;
}

export async function updateUsername(newName: string) {
  try {
    return await account.updateName({
      name: newName,
    });
  } catch (e) {
    console.log("Updating name failed:", e);
    throw e;
  }
}

export async function updateEmail(newEmail: string, password: string) {
  try {
    return await account.updateEmail({ email: newEmail, password });
  } catch (e) {
    console.log("Updating email failed:", e);
    throw e;
  }
}

export async function updatePassword(newPassword: string, oldPassword: string) {
  try {
    return await account.updatePassword({ password: newPassword, oldPassword });
  } catch (e) {
    console.log("Updating password failed:", e);
    throw e;
  }
}
