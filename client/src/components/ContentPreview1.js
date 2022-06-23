import { useState, useEffect } from "react";

import WalletCard from "./WalletCard";
import WhaleCard from "./WhaleCard";

export default function ContentPreview1({ currentUser, currentEthPrice }) {

  const [whaleData, setWhaleData] = useState([])

  const isLoggedIn = () => {
    if (currentUser) {
      return (true)
    } else {
      return (false)
    }
  }

  const whalesFetch = (e) => {
    fetch('/whale_wallets', {
      method: 'GET'
    }).then(r => r.json()).then(r => (setWhaleData(r)))
  }

  const walletCard = (UserObject) => {
    return (<WalletCard wallet={UserObject} currentEthPrice={currentEthPrice}/>)
  }
  const whaleCard = (whaleObject) => {
    return (<WhaleCard wallet={whaleObject} currentEthPrice={currentEthPrice} />)
  }


  //Page Load
  useEffect(() => {
    whalesFetch()
  }, [])


  return (

    <div className="rounded-sm left flex">
      <div className="bg-gray-100 rounded min-w-min w-64 m-4 p-1 ">
        <div className="rounded flex bg-white outline outline-1 place-content-center m-1 font-bold"><div className="left-5 text-violet-800 m-1 ">Whale</div> <div className="m-1">Wallets</div>  </div>
        {whaleData ? whaleData.map((whaleObject) => (whaleCard(whaleObject))) : null}
      </div>
      {isLoggedIn() ? <div className="( Your-Wallets ) bg-gray-100 rounded min-w-min w-64 m-4 p-1">
        <div className="rounded bg-white outline outline-1 text-center p-1 m-1 text-blue-800 font-semibold"> Your Watched Wallets </div>
        {currentUser ? currentUser.custom_wallets.map((userdata) => (walletCard(userdata))) : null}
      </div>:
        null}
    </div>
  )
}