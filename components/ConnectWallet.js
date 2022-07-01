import { useState, useEffect } from "react"
import { ethers } from 'ethers'


const ConnectWallet = ({ web3Modal }) => {
  const [provider, setProvider] = useState({})
  const [library, setLibrary] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [network, setNetwork] = useState({})

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect()
      console.log('provider:', typeof provider)
      setProvider(provider)

      const library = new ethers.providers.Web3Provider(provider)
      console.log('library:', library)
      setLibrary(library)

      const accounts = await library.listAccounts();
      console.log('accounts:', accounts)
      if (accounts) setAccounts(accounts[0]);

      const network = await library.getNetwork();
      console.log('network:', network)
      setNetwork(network)

    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log('handleAccountsChanged:', accounts)
        setAccounts(accounts);
      };
  
      const handleChainChanged = (chainId) => {
        console.log('handleChainChanged:', chainId)
      };
      
      const handleConnect = ({...data}) => {
        console.log('handleConnect:', data)
      };

      const handleDisconnect = ({...data}) => {
        console.log('handleDisconnect:', data)
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("connect", handleConnect);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("handleConnect", handleChainChanged);
          provider.removeListener("handleDisconnect", handleChainChanged);
        }
      };
    }
  }, [provider]);

  console.log({ provider, library, accounts, network })
  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <p>Connect Status: {accounts ? 'connected' : 'none'}</p>
      <p>Wallet Address: {accounts}</p>
      <p>Name and ChainId: {`${network.name} (${network.chainId})`}</p>
    </div>
  )
}

export default ConnectWallet