import { WEB3AUTH_NETWORK, MFA_FACTOR } from "@web3auth/modal";
import { type Web3AuthContextConfig } from "@web3auth/modal/react";

const clientId = "BJFVk6lWhnvPMMmvLgj7DcwP89UTdazzM2n-J_YMyWDri5PCmS7LHw1mVu4BePRwtiIOncIlIo2Wi4YoldQtVYE"; 

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    mfaSettings: {
    [MFA_FACTOR.DEVICE]: {
      enable: true,
      priority: 1,
      mandatory: true, 
    },
    [MFA_FACTOR.BACKUP_SHARE]: {
      enable: true,
      priority: 2,
      mandatory: true, 
    },
    [MFA_FACTOR.SOCIAL_BACKUP]: {
      enable: true,
      priority: 3,
      mandatory: false,
    },
    [MFA_FACTOR.PASSWORD]: {
      enable: true,
      priority: 4,
      mandatory: false,
    },
    [MFA_FACTOR.PASSKEYS]: {
      enable: true,
      priority: 5,
      mandatory: false,
    },
    [MFA_FACTOR.AUTHENTICATOR]: {
      enable: true,
      priority: 6,
      mandatory: false,
    },
  },
  }
  };

export default web3AuthContextConfig;
