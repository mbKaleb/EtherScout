import { useState, useEffect } from "react"
import { ethers } from "ethers";

import { ETHERSCANKEY } from "../keys";

export default function WalletCard({ wallet, currentEthPrice }) {
  const [walletBalance, setWalletBalance] = useState()

  //Styles 
  const boldFont = "font-semibold flex m-1"
  const normalFont = "font-normal flex mx-1"

  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${wallet.wallet_address}&tag=latest&apikey=${ETHERSCANKEY}`
  const formatedEthBalance = () => { return ethers.utils.formatUnits(walletBalance, 'ether')}

  const userWalletFetch = (e) => {
    fetch(url).then(r => r.json()).then(r => {
      // console.log(r)
      if (r.message === "OK") {
        setWalletBalance(r.result)
      } else {
        setTimeout(() => userWalletFetch(), 500)
      }
    })
  }

  useEffect(() => {
    userWalletFetch()
  }, [])

  return (
    <div className="bg-white outline outline-1 outline-blue-600 rounded m-1 p-2">
      <div className={boldFont} >Alias:   <div className={normalFont} >{wallet ? wallet.alias : null}</div> </div>
      <div className={boldFont} >Address: <div className={normalFont} >{wallet ? wallet.wallet_address : null}</div> </div>
      <div className={boldFont} >Balance: <div className={normalFont} >{walletBalance ? Math.floor(formatedEthBalance()) + " ETH" : "Loading..."}</div> </div>
      <div className={boldFont} >Approx USD Value: <div className={normalFont} >{walletBalance? "$" + (Math.floor((formatedEthBalance()*currentEthPrice))).toLocaleString('en-US') : "Loading..."}</div> </div>
    </div>
  )

}
