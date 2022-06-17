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
    


    //Ether Network and key
  const network = 'homestead';
  const provider = ethers.getDefaultProvider(network, {
    etherscan: ETHERSCANKEY,
  });

  //Async Hook Assignment
    //Returns the name associated with a hexidecimal address if reverse lookup is enabled
  async function getEthNamespace(hexidecimalAddress) {
    const nameString = await provider.lookupAddress(hexidecimalAddress);
    return nameString;
  }
    //Takes an ENS and returns an formatted eth balance
  async function getBalance(nameString) {
    const balance = await provider.getBalance(nameString)
    const finalBalance = await ethers.utils.formatUnits(balance, 'ether')
    return finalBalance;
  }
    //Get resolver ens contract resolver by name
  async function resolveByName(address) {
      const resolver = await provider.getResolver(address)
      return resolver
  }

  async function getEmailByResolver(resolver) {
    const email = await resolver.getText('email');
    return email
  }


  async function getData() {
    
  }


  //On-Page-Load
  useEffect(() => {
    
  }, []);

  return (
    <div className="justify-center rounded-1 bg-gray-200 w-10/12 p-3 min-w-fit">
      <div className="Address rounded-sm bg-white drop-shadow p-2">Transaction Hash: {transactionHash}</div>
      <div className="flex mt-2">
        <div className="grid-flex rounded-sm bg-white drop-shadow w-full p-4 ">
          <div className="mb-2 font-medium">Overview</div>
          <div className="flex border-b p-1"> <div className="grow">Status</div>   <div ></div> </div>
          <div className="flex border-b p-1"> <div className="grow">Block</div>   <div ></div></div>
          <div className="flex border-b p-1"> <div className="grow">Timestamp</div>   <div>Unknown</div> </div>
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