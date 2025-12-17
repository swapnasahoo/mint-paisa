export function makeUserAvatar(name: string) {
  const endpoint = process.env.EXPO_PUBLIC_APPWRITE_API_ENDPOINT;
  const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

  return `${endpoint}/avatars/initials?name=${encodeURIComponent(
    name
  )}&heiht=160&width=160&project=${projectId}`;
}
