//React Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

import { ETHERSCANKEY } from "../keys";

//Ethers Imports
import { ethers } from "ethers";

//Hooks

export default function TransactionScannerTool({currentEthPrice}) {

  //Hook Assignment
  const { transactionHash } = useParams();

  //State Assignment
    //Basic Transaction Data
    const [transactionInstance, setTransactionInstance] = useState()
    const [receitInstance, setReceitInstance] = useState({})
    const [formattedEthValue, setFormattedEthValue] = useState(0)

    const [formattedGasUsed, setFormattedGasUsed] = useState(0)
    const [formattedGasLimit, setFormattedGasLimit] = useState(0)

    const [fromData, setFromData] = useState()
    const [toData, setToData] = useState()

    const [blockTimestamp, setBlockTimestamp] = useState()

    //Ether Network and key
  const network = 'homestead';
  const provider = ethers.getDefaultProvider(network, {
    etherscan: ETHERSCANKEY,
  });

  //Async Hook Assignment
    //Returns the name associated with a hexidecimal address if reverse lookup is enabled

  async function reverseLookup(hexidecimalAddress) {
    const nameString = await provider.lookupAddress(hexidecimalAddress);
    return nameString;
  }
  async function getTransaction(txHash) {
    const resp = await provider.getTransaction(txHash)
    return resp
  }
  async function getReceit(tx) {
    const resp = await provider.getTransactionReceipt(tx)
    return resp
  }
  async function getBlock(block) {
    const resp = await provider.getBlock(block)
    return resp
  }


  async function getData() {

    if (!transactionInstance) {
      getTransaction(transactionHash).then((r) => {
        console.log('Instance:', r)
        setTransactionInstance(r)
        setFormattedEthValue(ethers.utils.formatUnits(r.value, 'ether'))
        setFormattedGasLimit(ethers.utils.formatUnits(r.gasLimit, 'wei'))
      })
    }

    if (transactionInstance || !(fromData || toData)) {
      reverseLookup(transactionInstance.from).then((r) => {
        r ? setFromData(r) : setFromData(transactionInstance.from);
      })
      reverseLookup(transactionInstance.to).then((r) => {
        r ? setToData(r) : setToData(transactionInstance.to);
      })
    }

    if (true) {
      getReceit(transactionHash).then((r) => {
        console.log('receit:', r)
        setReceitInstance(r);
        console.log('test', ethers.utils.formatUnits(r.effectiveGasPrice, 'gwei'))
        setFormattedGasUsed(ethers.utils.formatUnits(r.gasUsed, 'wei'))
        setFormattedGasLimit(ethers.utils.formatUnits(r.gasLimit, 'wei'))
      })
    }

    if (true) {
      getBlock(transactionInstance.blockNumber).then(block => {
        const timeStamp = new Date(block.timestamp * 1000).toString().substring(3,16)
        setBlockTimestamp(timeStamp)
      })
    }
  }

  //On-Page-Load
  useEffect(() => {
    getData()
  }, [transactionInstance]);

  return (
    <div className="justify-center rounded-1 bg-gray-200 w-10/12 p-3 min-w-fit">
      <div className="Address flex rounded-sm bg-white drop-shadow p-2"> <div className="mr-4 font-bold">Transaction Hash:</div> <div>{transactionHash}</div> </div>
      <div className="flex mt-2">
        <div className="grid-flex rounded-sm bg-white drop-shadow w-full p-4">
          <div className="mb-2 font-semibold">Overview</div>
          <div className="flex border-b p-1"> <div className="grow font-">Status:</div> <div className="w-1/3 mr-44">{transactionInstance ? `Success, Confirmations: ${transactionInstance.confirmations}` : 'Loading...'}</div> </div>
          <div className="flex border-b p-1"> <div className="grow font-">Block: </div> <div className="w-1/3 mr-44">{transactionInstance ? transactionInstance.blockNumber : null}</div> </div>
          <div className="flex border-b p-1"> <div className="grow font-">Timestamp:</div> <div className="w-1/3 mr-44">{blockTimestamp ? blockTimestamp : 'null'}</div> </div>
          <div className="flex border-b p-1"> <div className="grow font-">Value:</div> <div className="w-1/3 mr-44">{transactionInstance ? `${formattedEthValue} Eth` : 'Loading...'}</div> </div>
        </div>
      </div>

      <div className="rounded-sm bg-white drop-shadow w-full mt-3 p-4 ">
        <div className="mb-2 text-medium font-semibold">Accounts</div>
        <div className="flex border-b p-1"> <div className="grow">From:</div> <div className="w-1/3 mr-44">{fromData}</div> </div>
        <div className="flex border-b p-1"> <div className="grow">To:</div> <div className="w-1/3 mr-44">{toData}</div> </div>
      </div>

      <div className="rounded-sm bg-white drop-shadow w-full mt-3 p-4 ">
        <div className="mb-2 border-b text-medium font-semibold ">Gas & Fees</div>
          <div className="flex border-b p-1"> <div className="grow font-">Gas Used</div> <div className="w-1/3 mr-44"> {transactionInstance ? `${formattedGasUsed} Gwei, (${(formattedGasUsed / formattedGasLimit).toFixed(2) * 100}%)` : 'Loading...' }</div> </div>
          <div className="flex border-b p-1"> <div className="grow font-">Gas Limit</div> <div className="w-1/3 mr-44"> {transactionInstance ? `${formattedGasLimit} Gwei` : 'Loading...' }</div> </div>
      </div>
      
    </div>
  )
}