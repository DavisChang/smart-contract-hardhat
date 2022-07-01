
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import CoinbaseWalletSDK from "@coinbase/wallet-sdk"
import WalletConnect from "@walletconnect/web3-provider"
import Web3Modal from "web3modal"

const ConnectWallet = dynamic(() => import('@/components/ConnectWallet'), {
  suspense: true,
})

function HomePage() {
  console.log('HomePage')

  const providerOptions = {
    coinbasewallet: {
      package: CoinbaseWalletSDK, 
      options: {
        appName: "Web 3 Modal Demo",
        infuraId: process.env.NEXT_PUBLIC_RINKEBY_RPC_ID
      }
    },
    walletconnect: {
      package: WalletConnect, 
      options: {
        infuraId: process.env.NEXT_PUBLIC_RINKEBY_RPC_ID
      }
    },
    binancechainwallet: {
      package: true
    }
   };

  let web3Modal
  if (typeof window !== 'undefined') {
    console.log('new Web3Modal')
    web3Modal = new Web3Modal({
      providerOptions, // required
      theme: "dark",
    })
  }

  return (
    <div className="App">
      <Suspense fallback={`Loading...`}>
        <ConnectWallet web3Modal={web3Modal} />
      </Suspense>
    </div>
  )
}

export default HomePage