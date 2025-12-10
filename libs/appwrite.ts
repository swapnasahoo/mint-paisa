import { Client } from "react-native-appwrite";

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const API_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_API_ENDPOINT!;

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);
