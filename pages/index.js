import { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/Home.module.css';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useEnsName, useContractWrite, usePrepareContractWrite, useContractReads } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useContractRead } from 'wagmi'
import { ethers } from 'ethers';





const Home = () => {

  const [userAddress, setAddress] = useState('')
  const [userisConnected, setisConnected] = useState('')
  const [windows, setwindows] = useState('')

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { address, isConnected } = useAccount()
  const ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "retrieve",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
    useEffect(() => {
    // setAddress(address)
    setwindows(window)
  },[])
  // b68d90d53996fa4ed4e98d6e3e130cfe8b8c4dcc4fdc2f83cd4a53086c1314c1

  // const provider = new ethers.providers.Web3Provider(windows.ethereum);
  const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/");
  const signer = provider.getSigner("0x9B6178d1FABdfD0F8EeDF27f71121A55F736807A");

  const smartContract = new ethers.Contract(
    "0xF8bB7D73De09CFC6fd2232962701836828Fe36d0", ABI,signer
  );

  const interactBlockchain = async () => {
    const count = await smartContract.retrieve;
    console.log("data",count);
  };
  interactBlockchain()



  useEffect(() => {
    setAddress(address)
  })


  // const { data, isError, isLoading } = useContractRead({

  //   address: '0xF8bB7D73De09CFC6fd2232962701836828Fe36d0',
  //   abi: ABI,
  //   functionName: 'retrieve',
  // })
  console.log('data: ', data);


  const { config } = usePrepareContractWrite({
    address: '0xF8bB7D73De09CFC6fd2232962701836828Fe36d0',
    abi: ABI,
    functionName: 'store',
    args: ["100"],
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)


  const { getData, isError, load } = useContractReads({

    contracts: [
      {
        address: '0xF8bB7D73De09CFC6fd2232962701836828Fe36d0',
        abi: ABI,
        functionName: 'retrieve',
      },

    ],
  })

  console.log(getData);






  return (

    <div className={styles.container}>
      <div className="">


      </div>
      <main className={styles.main}>
        <ConnectButton />
        <br />
        {userAddress}
        <br />

        <button onClick={write} type="button">
          Write contract button
        </button>



























        {/* <div >
          {openConnectModal && (
            <button onClick={openConnectModal} type="button">
              Open Connect Modal
            </button>
          )}
        </div> */}

        {/* <div >
          {openAccountModal && (
            <button onClick={openAccountModal} type="button">
              <h1 className="">Open Account Modal</h1>              
            </button>
          )}
        </div> */}

        {/* <div >
          {openChainModal && (
            <button onClick={openChainModal} type="button">
              Open Chain Modal
            </button>
          )}
        </div> */}
      </main >
    </div>
  );
};

export default Home;


// import { ConnectButton } from '@rainbow-me/rainbowkit';
//  const Home = () => {
//   return (
//     <ConnectButton.Custom>
//       {({
//         account,
//         chain,
//         openAccountModal,
//         openChainModal,
//         openConnectModal,
//         authenticationStatus,
//         mounted,
//       }) => {
//         // Note: If your app doesn't use authentication, you
//         // can remove all 'authenticationStatus' checks
//         const ready = mounted && authenticationStatus !== 'loading';
//         const connected =
//           ready &&
//           account &&
//           chain &&
//           (!authenticationStatus ||
//             authenticationStatus === 'authenticated');
//         return (
//           <div
//             {...(!ready && {
//               'aria-hidden': true,
//               'style': {
//                 opacity: 0,
//                 pointerEvents: 'none',
//                 userSelect: 'none',
//               },
//             })}
//           >
//             {(() => {
//               if (!connected) {
//                 return (
//                   <button onClick={openConnectModal} type="button">
//                     Connect Wallet
//                   </button>
//                 );
//               }
//               if (chain.unsupported) {
//                 return (
//                   <button onClick={openChainModal} type="button">
//                     Wrong network
//                   </button>
//                 );
//               }
//               return (
//                 <div style={{ display: 'flex', gap: 12 }}>
//                   <button
//                     onClick={openChainModal}
//                     style={{ display: 'flex', alignItems: 'center' }}
//                     type="button"
//                   >
//                     {chain.hasIcon && (
//                       <div
//                         style={{
//                           background: chain.iconBackground,
//                           width: 12,
//                           height: 12,
//                           borderRadius: 999,
//                           overflow: 'hidden',
//                           marginRight: 4,
//                         }}
//                       >
//                         {chain.iconUrl && (
//                           <img
//                             alt={chain.name ?? 'Chain icon'}
//                             src={chain.iconUrl}
//                             style={{ width: 12, height: 12 }}
//                           />
//                         )}
//                       </div>
//                     )}
//                     {chain.name}
//                   </button>
//                   <button onClick={openAccountModal} type="button">
//                     {account.displayName}
//                     {account.displayBalance
//                       ? ` (${account.displayBalance})`
//                       : ''}
//                   </button>
//                 </div>
//               );
//             })()}
//           </div>
//         );
//       }}
//     </ConnectButton.Custom>
//   );
// };
// export default Home;