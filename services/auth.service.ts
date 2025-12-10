import { ID } from "react-native-appwrite";
import { account } from "@/libs/appwrite";

export async function getAuthStatus() {
  try {
    return await account.get();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createUserWithEmailAndPassword(
  email: string,
  password: string,
) {
  try {
    return await account.create({
      userId: ID.unique(),
      email,
      password,
    });
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function logInUserWithEmailAndPassword(
  email: string,
  password: string,
) {
  try {
    return await account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (e) {
    console.error(e);
    return null;
  }
}
