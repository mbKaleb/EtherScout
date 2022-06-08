//React Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

//Ethers Imports
import { ethers } from "ethers";
import { providers } from "ethers";

export default function AddressQuery({currentEthPrice}) {

  //Hook Assignment
  const { walletAddress } = useParams();

  //State Assignment
  const [walletBalance, setWalletBalance] = useState(0);

  //Ethers Assignemnt/Fetch
  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=5JJTINSZ38FFRH9VRUDJXHTNW6W8SF3TFC`
  const formatedEthBalance = () => { return ethers.utils.formatUnits(walletBalance, 'ether')}

  const network = 'homestead';
  const provider = ethers.getDefaultProvider(network, {
    etherscan: '5JJTINSZ38FFRH9VRUDJXHTNW6W8SF3TFC',
  });


  const walletFetch = (e) => {
    fetch(url).then(r => r.json()).then(r => {
      if (r.message === "OK") {
        setWalletBalance(r.result)
      } else {
        setTimeout(() => walletFetch(), 500)
      }})
  }

  async function test() {
    var x = await provider.lookupAddress("0xA4cb937Bc5eC481fc2674794d4146206ecC71b15");
    return x
  }

  async function resolver() {
    const resolver = await provider.getResolver("ricmoo.eth");
    return resolver
  }

  async function test3(resolver) {
    await resolver.getAddress();
  }

  resolver().then( resp => console.log(resp))

  //On-Page-Load
  useEffect(() => {
    walletFetch();
    console.log(walletAddress)
    console.log(formatedEthBalance())
  }, [])


  return (
    <div className="justify-center rounded-1 bg-gray-400 p-2 w-screen min-w-max ">
      <div className="Address rounded-sm mx-12 font- bg-white drop-shadow p-2">{" Address: "+ walletAddress}</div>
      <div className="flex m-2 mx-12">
        <div className="grid-flex rounded-sm bg-white drop-shadow w-6/12 mr-2 p-4 ">
          <div className="mb-2 font-medium">Overview</div>
          <div className="flex border-b p-1"> <div className="grow">ETH Balance: </div>   <div >{walletAddress ? formatedEthBalance() +' ETH' : "Loading..."}</div> </div>
          <div className="flex border-b p-1"> <div className="grow">USD Est. Value: </div>   <div >{walletBalance ? "$"+(Math.round((formatedEthBalance()*currentEthPrice) * 100) / 100).toFixed(2) : "Loading..."}</div></div>
          <div className="flex border-b p-1"> <div className="grow">Wallet Type</div>   <div>Unknown</div> </div>
        </div>
        <div className="grid-flex rounded-sm bg-white drop-shadow w-6/12 ml-2 p-4">
          <div className="mb-2 font-medium min-w-fit">Ethereum Naming Service (ENS)</div>
          <div className="flex">
            <div className="w-6/12 m-1">
              <div className="border-b font-medium">Registrant</div>
              <div>Test</div>
            </div>
            <div className="w-6/12 m-1">
              <div className="border-b font-medium">Controller</div>
              <div>Test</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}