/* eslint-disable array-callback-return */
//React Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

//Ethers Imports
import { ethers } from "ethers";

//Hooks
import { allTransactions } from "../hooks/endpoints";
import { ETHERSCANKEY } from "../keys";



export default function CorrelateTool({currentEthPrice}) {


  //Hook Assignment
  const { walletAddress } = useParams();

  //State Assignment

    // Wallet 1
  const [walletAddress1, setWalletAddress1] = useState('');
    const [balance1, setBalance1] = useState();
    const [ensName1, setEnsName1] = useState('')
    const [resolver1, setResolver1] = useState({});
    // Wallet 2
  const [walletAddress2, setWalletAddress2] = useState('');
    const [balance2, setBalance2] = useState();
    const [ensName2, setEnsName2] = useState('')
    const [resolver2, setResolver2] = useState({});

  // Shared State
  const [stateTransactions, setTransactions] = useState({});

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
  //Takes an ENS and returns an formatted eth balance
  async function getBalance(nameString) {
    const balance = await provider.getBalance(nameString)
    const finalBalance = ethers.utils.formatUnits(balance, 'ether')
    return finalBalance;
  }

  //Get resolver ens contract resolver by name
  async function getResolver(name) {
      const resolver = await provider.getResolver(name)
      return resolver
  }

  //get transaction data
  async function getTransactionData(address) {
    const response = await fetch(allTransactions(address, ETHERSCANKEY) )
      if (response.ok) {
        const transactions = await response.json();
        setTransactions(transactions.result)
      }
  }

  const parseAddress = () => {
    if ( !walletAddress1 ){
      if (walletAddress.slice(0,2) === '0x'){
        setWalletAddress1(walletAddress.slice(0,42))
        if (walletAddress.slice(43, 45) === '0x') {
          let substring = walletAddress.slice(43);
          substring = substring.replace(/\s/g, '');
          setWalletAddress2(substring);
        }
      }
    }
  }

  async function getData() {
    //Balances
    if (walletAddress1 && !balance1){
      let resp = await getBalance(walletAddress1)
      setBalance1(resp)
    }
    if (walletAddress2 && !balance2) {
      let resp = await getBalance(walletAddress2)
      setBalance2(resp)
    }
    //Reverse Lookup
    if (walletAddress1 && !ensName1 ) {
      let resp = await reverseLookup(walletAddress1)
      setEnsName1(resp)
    }
    if (walletAddress2 && !ensName2 ) {
      let resp = await reverseLookup(walletAddress2)
      setEnsName2(resp)
    }
    //Get Resolver Instance
    if (ensName1 && !resolver1){
      let resp = await getResolver(ensName1)
      setResolver1(resp)
    }
    if (ensName2 && !resolver2){
      let resp = await getResolver(ensName2)
      setResolver2(resp)
    }
    //Get Transactions
    if (walletAddress1){
      await getTransactionData(walletAddress1)
    }
  }


  //On-Page-Load
  useEffect(() => {
    parseAddress()
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress1, walletAddress2]);


  return (
    <div className="justify-center rounded-1 bg-gray-200 w-10/12 p-3 min-w-fit">

      <div className="flex">

        <div className="grid-flex rounded-sm bg-white drop-shadow w-6/12 mr-2 p-4 ">
          <div className="font-medium">Wallet 1</div>
          <div className="font-light mb-0">{walletAddress1}</div>
          <div className="text-md mb-1">{ensName1 ? ensName1 : 'No Record'}</div>
          <div className="flex border-b p-1"> <div className="grow">ETH Balance: </div> <div>{balance1 ? balance1 +' ETH' : "Loading..." } </div> </div>
          <div className="flex border-b p-1"> <div className="grow">USD Est. Value: </div> <div>{balance1 ? "$"+(Math.round((balance1 * currentEthPrice) * 100) / 100).toFixed(2) : "Loading..."}</div></div>
          <div className="flex border-b p-1"> <div className="grow">Wallet Type</div> <div>Unknown</div> </div>
        </div>

        <div className="grid-flex rounded-sm bg-white drop-shadow w-6/12 ml-2 p-4 ">
          <div className="mb font-medium">Wallet 2</div>
          <div className="font-light mb-0">{walletAddress2}</div>
          <div className="text-md mb-1">{ensName2 ? ensName2 : 'No Record'}</div>
          <div className="flex border-b p-1"> <div className="grow">ETH Balance: </div> <div>{balance2 ? balance2 +' ETH' : "Loading..." }</div> </div>
          <div className="flex border-b p-1"> <div className="grow">USD Est. Value: </div> <div>{balance2 ? "$"+(Math.round((balance2 * currentEthPrice) * 100) / 100).toFixed(2) : "Loading..."}</div></div>
          <div className="flex border-b p-1"> <div className="grow">Wallet Type</div> <div>Unknown</div> </div>
        </div>

      </div>

      <div className="rounded-sm bg-white drop-shadow w-full mt-3 p-4 ">
        <div className="mb-2 border-b text-medium font-semibold ">Transactions</div>
        <div>
          <table className="w-full">
            <thead>
              <tr className="font-semibold m-1 " ><td>Tx Hash</td><td>Date</td><td>Wallet 1</td><td className="pl-4">Ether</td><td>Wallet 2</td></tr>
            </thead>
            <tbody className="justify-items-center">
              { stateTransactions ? Object.entries(stateTransactions).map(item => {
                if( (walletAddress2.toLowerCase() === item[1].to || walletAddress2.toLowerCase() === item[1].from) ){
                  return (
                  <tr className="border-b p-2 m-2">
                    <td>{ item[1].hash}</td>              {/*Transaction Hash*/}
                    <td>{ (new Date(item[1].timeStamp * 1000).toString().substring(3,16)) }</td> {/*Date/Timestamp*/}
                    <td>{ ensName1 ? ensName1 : walletAddress1.substring(0,22) + "..." }</td>    {/* First wallet*/}
                    <div className="inline-flex items-baseline"> 
                      { (walletAddress2.toLowerCase() === item[1].from) ? <AiOutlineArrowLeft className="pt-1"/> : null }
                      <td>{ (Math.round((item[1].value) ) / 1000000000000000000 ).toFixed(2) } Eth </td> {/*Ether Value of transaction*/}
                      { (walletAddress2.toLowerCase() === item[1].to) ?  <AiOutlineArrowRight className="pt-1"/> : null }
                    </div>
                    <td>{ ensName2 ? ensName2 : walletAddress2.substring(0,22)  + "..." }</td>
                  </tr> )
                }
            }) : null }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
