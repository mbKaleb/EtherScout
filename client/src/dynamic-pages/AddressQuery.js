//React Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

//Ethers Imports
import { ethers } from "ethers";

export default function AddressQuery({currentEthPrice}) {

  //Hook Assignment
  const { walletAddress } = useParams();

  
  
  //State Assignment
  //Basic Address Data
  const [ethBalance, setEthBalance] = useState(0);
  //ENS & controller data
  const [ensName, setEnsName] = useState(null);
  const [resolverInstance, setResolverInstance] = useState(null); //ie: Controller Contract
  //Text* key-value data
  const [email, setEmail] = useState(null);
  
  //Ether Network and key
  const network = 'homestead';
  const provider = ethers.getDefaultProvider(network, {
    etherscan: '5JJTINSZ38FFRH9VRUDJXHTNW6W8SF3TFC',
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
    console.log(email)
    return email
  }

  // const findEmailFromResolver = () => {
  //   resolveByName(walletAddress).then(resp => {
  //     if(resp === 'OK'){
  //       resp.getText('email').then(resp =>{
  //         setEthAddressData({...ethAddressData, 'email': resp})
  //       })
  //     } else {
  //       setEthAddressData({...ethAddressData, 'email': 'No Record Found'})
  //     }
  //   })
  // }

  async function getData() {
    
    //Get ENS name from hexidecimal
    let resp0 = await getEthNamespace(walletAddress)
    setEnsName(resp0)

    //Get balance of wallet
    let resp1 = await getBalance(walletAddress)
    setEthBalance(resp1)

    // get email 
    if (resolverInstance) { //exp
      let resp = await getEmailByResolver(resolverInstance)
      // console.log(resp)
      console.log(resp.address)
      setEmail(resp.address)
    }

    if (ensName) {
      let resp = await resolveByName(ensName)
      console.log(resp)
      setResolverInstance(resp)
    }
  }

  //On-Page-Load
  useEffect(() => {
    getData()
  }, [ensName]);

  return (
    <div className="justify-center rounded-1 bg-gray-400 p-2 w-screen min-w-max ">
      <div className="Address rounded-sm mx-12 font- bg-white drop-shadow p-2">{" Address: "+ walletAddress}</div>
      <div className="flex m-2 mx-12">
        <div className="grid-flex rounded-sm bg-white drop-shadow w-6/12 mr-2 p-4 ">
          <div className="mb-2 font-medium">Overview</div>
          <div className="flex border-b p-1"> <div className="grow">ETH Balance: </div>   <div >{walletAddress ? ethBalance +' ETH' : "Loading..."}</div> </div>
          <div className="flex border-b p-1"> <div className="grow">USD Est. Value: </div>   <div >{ethBalance ? "$"+(Math.round((ethBalance*currentEthPrice) * 100) / 100).toFixed(2) : "Loading..."}</div></div>
          <div className="flex border-b p-1"> <div className="grow">Wallet Type</div>   <div>Unknown</div> </div>
        </div>
        <div className="[ENS Section]  grid-flex rounded-sm bg-white drop-shadow w-6/12 ml-2 p-4">
          <div className="[TITLE] mb-2 font-medium min-w-fit">Ethereum Naming Service (ENS)</div>
          <div className="[LEFT SECTION] flex">
            <div className="w-6/12 m-1">
              <div className="border-b font-medium">Controller (contract)</div>
              <div>{resolverInstance?.address || null}</div>
              <div className="border-b font-medium">Email</div>
              <div>{[email] || 'No Record Found'}</div>
            </div>
            <div className="w-6/12 m-1">
              <div className="border-b font-medium">Name</div>
              <div>{ensName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// let response = await lookupAddress(walletAddress)
// let namesp = await response
// setEthAddressData({...ethAddressData, 'ens': namesp})

// let response2 = await getBalance(walletAddress)
// let balance = await response2
// await setEthAddressData({...ethAddressData, 'ethBalance': balance})

// let response3 = await resolveByName(ethAddressData.ens)
// console.log(response3)
// setEthAddressData({...ethAddressData, 'resolver': response3?.address})
// .then(resp => {
//   setEthAddressData({...ethAddressData, 'ens' : resp})})
// await getBalance(walletAddress).then(resp => {
//   setEthAddressData({...ethAddressData, 'ethBalance' : resp})})
// await resolveByName(ethAddressData.ens).then(resp => {
//   setEthAddressData({...ethAddressData, 'resolver' : resp.address})})
