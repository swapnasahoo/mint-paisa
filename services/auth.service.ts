import { account } from "@/libs/appwrite";
import { handleAuthError } from "@/libs/handleAuthError";
import { ID } from "react-native-appwrite";

interface AppwriteError {
  message: string;
  type: string;
  code: number;
}

export async function getAuthStatus() {
  try {
    return await account.get();
  } catch (e) {
    const error = e as AppwriteError;
    console.error(
      `[APPWRITE][AUTH][STATUS]: ERROR MESSAGE: ${error.message}\nERROR TYPE: ${error.type}\nERROR CODE: ${error.code}`
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
