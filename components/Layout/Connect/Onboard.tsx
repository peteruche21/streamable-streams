"use client";
import {
  useEthereumProvider,
  PlaidWeb3OnSuccess,
  EIP1193Provider,
} from "react-plaid-link/web3";

import { PlaidLinkOnExit } from "react-plaid-link";
import { useCallback, useEffect, useState } from "react";

let provider: EIP1193Provider | undefined;

const Connect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const config = {
    // retrieve from https://dashboard.plaid.com/team/wallet-onboard
    token: process.env.NEXT_PUBLIC_PLAID_TOKEN as string,
    chain: {
      // RPC gateway URL to use for non-wallet methods
      rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_URL as string,
      // EVM chain ID in hexadecimal format as described in https://eips.ethereum.org/EIPS/eip-695
      // See https://chainlist.org/ for a list of common chains
      chainId: "0x1",
    },
  };

  const onSuccess = useCallback<PlaidWeb3OnSuccess>(
    // provider is an EIP-1193 compatible JavaScript object https://eips.ethereum.org/EIPS/eip-1193
    // provider can be used by other libraries to request more data
    async (_provider) => {
      const accounts = await _provider.request({
        method: "eth_accounts",
      });
      _provider.on("accountsChanged", handleAccountsChanged);
      provider = _provider;
      setIsConnected(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    // Optional callback, called if the user exits without connecting a wallet
    // See https://plaid.com/docs/link/web/#onexit for details
    alert("Action Denied by User!");
  }, []);

  const handleAccountsChanged = (accounts: any) => {
    if (accounts.length > 0) {
      // update UI
    }
  };

  const {
    open,
    ready,
    getCurrentEthereumProvider,
    isProviderActive,
    disconnectEthereumProvider,
  } = useEthereumProvider({
    ...config,
    onSuccess,
    onExit,
  });

  useEffect(() => {
    if (!ready || !getCurrentEthereumProvider || !isProviderActive) return;
    (async () => {
      provider = await getCurrentEthereumProvider(config.chain);
      if (!provider) return;
      setIsConnected(true);
      const isActive = await isProviderActive(provider as any);
      if (isActive) {
        console.log("provider is active");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, getCurrentEthereumProvider, isProviderActive]);

  const connect = () => open();

  const disconnect = useCallback(() => {
    if (!disconnectEthereumProvider || !provider) return;
    (async () => {
      await disconnectEthereumProvider(provider as any);
      setIsConnected(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disconnectEthereumProvider, provider]);

  if (isConnected) {
    return <button onClick={disconnect}>Disconnect</button>;
  }

  return (
    <button onClick={connect} disabled={!ready}>
      Sign In
    </button>
  );
};

export { provider, Connect };
