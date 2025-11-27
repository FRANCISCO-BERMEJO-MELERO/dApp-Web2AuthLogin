# Web3Auth Smart Account Demo

A modern, secure, and user-friendly Web3 application demonstrating the power of **Smart Accounts** (Account Abstraction) using **Web3Auth** for social logins and **Passkeys** for transaction signing.

## 🚀 Features

-   **Social Login**: Seamless onboarding using Google, Facebook, etc., via Web3Auth.
-   **Smart Accounts**: Deploys ERC-4337 compatible smart accounts for users.
-   **Passkey Signing**: Secure transaction signing using biometric passkeys (TouchID/FaceID).
-   **Gas Sponsorship**: Transactions are sponsored (gasless for users) using a Paymaster.
-   **Modern UI**: Premium dark theme with glassmorphism, animations, and responsive design.

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, TypeScript
-   **Styling**: Tailwind CSS v4
-   **Web3**:
    -   `@web3auth/modal`: Authentication
    -   `viem` & `wagmi`: Ethereum interactions
    -   `@metamask/smart-accounts-kit`: Smart Account implementation
    -   `ox`: WebAuthn/Passkey utilities

## 📂 Project Structure

```
web/src/
├── components/
│   ├── smart-account/    # Smart Account specific views (Create, Deploy, Transaction)
│   └── wallet/           # Wallet utilities (Balance, Network Info)
├── hooks/
│   ├── useSmartAccount.ts # Hook for smart account creation & deployment
│   └── useBundler.ts      # Hook for sending UserOperations
├── services/
│   └── pimlico.ts        # Paymaster & Bundler service integration
├── utils/
│   ├── storage.ts        # LocalStorage wrapper for credentials
│   └── constants.ts      # App constants (RPCs, Keys)
├── App.tsx               # Main application entry
└── index.css             # Global styles & Tailwind theme
```

## ⚡ Getting Started

### Prerequisites

-   Node.js (v18+)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd web
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

## 🔧 Configuration

The application currently uses some hardcoded constants for demonstration purposes in `src/utils/constants.ts`. For a production environment, these should be moved to `.env` files.

-   **Bundler RPC**: Pimlico public RPC (Sepolia)
-   **Relay Key**: Private key for the relay signer (Demo only)

## 📖 Usage

1.  **Login**: Click "Login with Web3Auth" and sign in with your preferred social provider.
2.  **Create Account**: The app will generate a unique smart account address for you.
3.  **Deploy**: Click "Deploy to Sepolia" to deploy your smart account to the blockchain.
4.  **Transact**: Once deployed, you can send test transactions secured by your passkey.

## 🎨 Styling

The project uses a custom Tailwind CSS configuration with a premium dark theme:
-   **Glassmorphism**: `.glass-panel` utility.
-   **Gradients**: Custom radial backgrounds and text gradients.
-   **Animations**: Smooth fade-ins and pulse effects.

## 📄 License

MIT
