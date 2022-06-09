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
  const [ethAddressData, setEthAddressData] = useState({
    "walletAddress": walletAddress
  })

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


  //Async Hook Assignment

    //Returns the name associated with a hexidecimal address if reverse lookup is enabled
  async function lookupAddress(hexidecimalAddress) { 
    const nameString = await provider.lookupAddress(hexidecimalAddress);
    return nameString;
  }

    //Takes an ENS and returns an unformatted eth balance
  async function getBalance(nameString) { //
    const balance = await provider.getBalance(nameString)
    const finalBalance = await ethers.utils.formatUnits(balance, 'ether')
    return finalBalance;
  }

    //Get resolver ens contract resolver by name
  async function resolveByName(address) {
    try {
      const resolver = await provider.getResolver(address)
      return resolver
    } catch (error) {
      return null
    }
  }

  const findEmailFromResolver = () => {
    resolveByName(walletAddress).then(resp => {
      if(resp === 'OK'){
        resp.getText('email').then(resp =>{
          console.log(resp)
          setEthAddressData({...ethAddressData, 'email': resp})
        })
      } else {
        setEthAddressData({...ethAddressData, 'email': 'No Record Found'})
      }
    })
  }



  //On-Page-Load
  useEffect(() => {
    walletFetch();

    //Get Wallet Name
    lookupAddress(walletAddress).then(resp => {
      setEthAddressData({...ethAddressData, 'ens': resp})
    }).then(
      getBalance(walletAddress).then(resp => {
        setEthAddressData({...ethAddressData, 'ethBalance':resp})
      })
    ).then(
      findEmailFromResolver()
      ).then(
        console.log(ethAddressData)
      )
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

        <div className="[ENS Section]  grid-flex rounded-sm bg-white drop-shadow w-6/12 ml-2 p-4">
          <div className="[TITLE] mb-2 font-medium min-w-fit">Ethereum Naming Service (ENS)</div>
          <div className="[LEFT SECTION] flex">
            <div className="w-6/12 m-1">

              <div className="border-b font-medium">Controller (contract)</div>
              <div>Test</div>

              <div className="border-b font-medium">Email</div>
              <div>{ethAddressData?.email}</div>

            </div>
            <div className="w-6/12 m-1">
              <div className="border-b font-medium">Name</div>
              <div>Test</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}