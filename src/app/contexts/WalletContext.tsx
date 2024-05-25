import { createContext } from 'react';

/**
 * @typedef NearContext
 * @property {import('./wallets/near').Wallet} wallet Current wallet
 * @property {string} signedAccountId The AccountId of the signed user
 */

/** @type {import ('react').Context<NearContext>} */
export const NearContext = createContext<{
  wallet: import('../wallets/near').Wallet | undefined,
  signedAccountId: string
}>({
  wallet: undefined,
  signedAccountId: ''
});