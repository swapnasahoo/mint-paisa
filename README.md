# 💰 Mint Paisa

[![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Backend-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)
[![NativeWind](https://img.shields.io/badge/NativeWind-5.0.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://nativewind.dev/)

A modern personal finance management app built with React Native, Expo, and Appwrite.

## Features

- **Expense Tracking** - Track income and expenses easily
- **Budget Management** - Set and monitor budgets
- **Statistics** - Beautiful charts and spending analytics
- **Authentication** - Email/password and OAuth login
- **Categories** - Organize transactions by category
- **Cross-Platform** - Works on iOS, Android, and web

## Tech Stack

- **Frontend**: React Native, Expo, TypeScript
- **State Management**: Zustand
- **Backend**: Appwrite
- **UI**: NativeWind (Tailwind CSS)
- **Charts**: React Native Gifted Charts
- **Navigation**: Expo Router

## Quick Start

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo CLI

### Installation

```bash
# Clone the repo
git clone https://github.com/swapnasahoo/mint-paisa.git
cd mint-paisa

# Install dependencies
npm install

# Create .env file
 Add these values in .env file
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_API_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_DATABASE_TRANSACTIONS_ID=your_database_id
EXPO_PUBLIC_APPWRITE_TABLE_TRANSACTIONS_ENTRIES_ID=entries

# Start the app
npm start
```

### Run on Different Platforms

```bash
npm run ios        # iOS simulator (Mac only)
npm run android    # Android emulator
npm run web        # Web browser
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Appwrite Configuration
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_API_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_DATABASE_TRANSACTIONS_ID=your_database_id
EXPO_PUBLIC_APPWRITE_TABLE_TRANSACTIONS_ENTRIES_ID=entries
```

**Variable Descriptions:**

- `EXPO_PUBLIC_APPWRITE_PROJECT_ID` - Your Appwrite project ID
- `EXPO_PUBLIC_APPWRITE_API_ENDPOINT` - Appwrite API endpoint (cloud or self-hosted)
- `EXPO_PUBLIC_APPWRITE_DATABASE_TRANSACTIONS_ID` - Database ID for storing transactions
- `EXPO_PUBLIC_APPWRITE_TABLE_TRANSACTIONS_ENTRIES_ID` - Table/Collection ID for transaction entries

### Appwrite Setup

1. Create an account on [Appwrite](https://appwrite.io/)
2. Create a new project
3. Set up authentication (Email/Password & OAuth)
4. Create collections for transactions and user profiles

## Development

### Folder Organization

- **app/** - All screens and layouts (file-based routing)
- **components/** - Reusable UI componen
- **services/** - API calls and business logic
- **store/** - Global state management
- **libs/** - Utility functions and helpers

### Code Style

- Use TypeScript for type safety
- Follow component naming: PascalCase (e.g., `TransactionCard.tsx`)
- Functions: camelCase (e.g., `createTransaction`)
- Constants: UPPER_SNAKE_CASE

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for Android
eas build --platform android --profile production

# Build for iOS
eas build --platform ios --profile production
```

## Troubleshooting

### Clear cache and reinstall

```bash
npm start --clear
rm -rf node_modules
npm install
```

### Appwrite connection issues

- Verify `.env` file has correct credentials
- Check Appwrite project exists and is active
- Ensure API endpoint is correct

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

- GitHub Issues: [Report bugs](https://github.com/swapnasahoo/mint-paisa/issues)

---

Originally created by SwapnaSahoo