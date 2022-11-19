"use client";
import {
  useEthereumProvider,
  PlaidWeb3OnSuccess,
  EIP1193Provider,
} from "react-plaid-link/web3";

import { PlaidLinkOnExit } from "react-plaid-link";
import { useCallback, useEffect, useState } from "react";
import { formatAddress } from "../../../utils/formatAddress";

// to be used by ethersjs in interacting with user wallet
let provider: EIP1193Provider | undefined;

// why plaid?
// prevent "use client" from being too close to root when using wagmi + rainbowkit
// ot thirdweb or dynamic_xyz.
// closest i can find to non-reactive
const Connect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");

  const config = {
    token: process.env.NEXT_PUBLIC_PLAID_TOKEN as string,
    chain: {
      rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_URL as string,
      chainId: "0x1",
    },
  };

  // callback hanled after user connects wallet for the first time
  const onSuccess = useCallback<PlaidWeb3OnSuccess>(
    async (_provider) => {
      initializeEIP1193Provider(_provider);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // takes in an EIP1193 compatible provider, sets up listeners and global provider variable
  // sets current connected account address
  const initializeEIP1193Provider = async (
    _provider: EIP1193Provider | undefined
  ) => {
    if (!_provider) return;
    provider = _provider;
    _provider.on("accountsChanged", handleAccountsChanged);
    setAccount(_provider?.selectedAddress);
    setIsConnected(true);
  };

  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    alert("Action Denied by User!");
  }, []);

  const handleAccountsChanged = (accounts: any) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
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

  // returns the current plaid provider which contains {on, request, removeListener, providers : EIP1193Provider[]}
  const getPlaidProvider = async () => {
    if (!ready || !getCurrentEthereumProvider) return;
    const plaidProvider = await getCurrentEthereumProvider(config.chain);
    return plaidProvider;
  };

  useEffect(() => {
    if (!ready || !isProviderActive) return;
    (async () => {
      const _provider: any = await getPlaidProvider();
      if (!_provider) return;
      // initializes global provider with plaidProvider.providers.v
      console.log(_provider);
      _provider?.selectedProvider
        ? await initializeEIP1193Provider(_provider?.selectedProvider)
        : await initializeEIP1193Provider(_provider);
      const isActive = await isProviderActive(_provider);
      if (isActive) {
        console.log("provider is active");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, getCurrentEthereumProvider, isProviderActive]);

  // opens the plaid dialogue
  // left this way to allow extra logic to be handled on connect
  const connect = () => open();

  // disconnects a user from the plaid provider
  const disconnect = useCallback(async () => {
    const _provider = await getPlaidProvider();
    if (!disconnectEthereumProvider || !_provider) return;
    await disconnectEthereumProvider(_provider);
    setIsConnected(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disconnectEthereumProvider]);

  if (isConnected) {
    return (
      <div className="tooltip" data-tip="disconnect">
        <button
          onClick={disconnect}
          disabled={!ready || !disconnectEthereumProvider}
          className="inline-flex gap-2"
        >
          {account && formatAddress(account)}{" "}
          <span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    );
  }

  return (
    <button onClick={connect} disabled={!ready}>
      Sign In
    </button>
  );
};

export { provider, Connect };
