//React Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

import { ETHERSCANKEY } from "../keys";

//Ethers Imports
import { ethers } from "ethers";

//Hooks
import { allTransactions } from "../hooks/endpoints";
import { SiIterm2, SiMomenteo } from "react-icons/si";

export default function TransactionScannerTool({currentEthPrice}) {

  //Hook Assignment
  const { transactionHash } = useParams();

  //State Assignment
    //Basic Transaction Data
    const [transactionInstance, setTransactionInstance] = useState({})

    //Ether Network and key
  const network = 'homestead';
  const provider = ethers.getDefaultProvider(network, {
    etherscan: ETHERSCANKEY,
  });

  const transaction = () => {

  }

  //Async Hook Assignment
    //Returns the name associated with a hexidecimal address if reverse lookup is enabled
  async function getEthNamespace(hexidecimalAddress) {
    const nameString = await provider.lookupAddress(hexidecimalAddress);
    return nameString;
  }

  async function getTransaction(txHash) {
    const response = await provider.getTransaction(txHash)
    console.log(response)
    
    return response
  }

  async function getData() {
    getTransaction(transactionHash).then(r => (setTransactionInstance(r)))

  }


  //On-Page-Load
  useEffect(() => {
    getData()
    console.log(transactionInstance)
  }, []);

  return (
    <div className="justify-center rounded-1 bg-gray-200 w-10/12 p-3 min-w-fit">
      <div className="Address rounded-sm bg-white drop-shadow p-2">Transaction Hash: {transactionHash}</div>
      <div className="flex mt-2">
        <div className="grid-flex rounded-sm bg-white drop-shadow w-full p-4 ">
          <div className="mb-2 font-medium">Overview</div>
          <div className="flex border-b p-1"> <div className="grow font-semibold">Status:  </div><div className="min-w-1/2">{transactionInstance.confirmations ? `Success, Confirmations: ${transactionInstance.confirmations}` : 'failed'}</div> </div>
          <div className="flex border-b p-1"> <div className="grow">Block: </div>   <div ></div></div>
          <div className="flex border-b p-1"> <div className="grow">Timestamp:</div>   <div>Unknown</div> </div>
        </div>
       
      </div>
      <div className="rounded-sm bg-white drop-shadow w-full mt-3 p-4 ">
        <div className="mb-2 border-b text-medium font-semibold ">Gas</div>
      </div>
      <div className="rounded-sm bg-white drop-shadow w-full mt-3 p-4 ">
        <div className="mb-2 border-b text-medium font-semibold ">Logs</div>
      </div>
    </div>
  )
}