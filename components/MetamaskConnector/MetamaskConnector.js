'use client';

import { useState, useEffect } from 'react';

export default function MetaMaskConnector() {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask is not installed. Please install MetaMask and try again.');
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userWallet = accounts[0];
      setWalletAddress(userWallet);
      // Save wallet address to local storage
      localStorage.setItem('walletAddress', userWallet);
    } catch (error) {
      console.error('MetaMask connection error:', error);
    }
  };

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress && window.ethereum) {
      // Check if wallet address is still connected
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts.length > 0 && accounts[0] === storedWalletAddress) {
            setWalletAddress(storedWalletAddress);
          } else {
            localStorage.removeItem('walletAddress');
          }
        })
        .catch((error) => console.error('Error fetching accounts:', error));
    }

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        const updatedWallet = accounts[0] || null;
        setWalletAddress(updatedWallet);
        if (updatedWallet) {
          localStorage.setItem('walletAddress', updatedWallet);
        } else {
          localStorage.removeItem('walletAddress');
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <button
      onClick={connectMetaMask}
      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
    >
      {walletAddress
        ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : 'Connect Wallet'}
    </button>
  );
}
