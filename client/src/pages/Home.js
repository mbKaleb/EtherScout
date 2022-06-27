//React Imports
import { useOutletContext } from "react-router-dom"
import { useState, useEffect } from "react"

//Component Imports
import ContentPreview1 from "../components/ContentPreview1"
import WhaleCard from "../components/WhaleCard";

//Hooks
import { gasOracle, ether2Supply, etherNodeSize } from "../hooks/endpoints";

import { ETHERSCANKEY } from "../keys";

//Styles
import { PageStyles } from "../hooks/Styles"


//Ethers Imports
import { ethers } from "ethers";


export default function Home({ currentEthPrice }) {

  //State
  const [ethValue, setEthValue] = useState(0);
  const [ethSupply, setEthSupply] = useState(0);
  const [oracleIns, setOracleIns] = useState()

  const [whales, setWhales] = useState([]);

  //Ether Network and key
  const network = 'homestead';
  const provider = ethers.getDefaultProvider(network, {
    etherscan: ETHERSCANKEY,
  });



  //Fetch assignemtn
  async function getOracle() {
    const res = await (await fetch(gasOracle(ETHERSCANKEY))).json()
    return res.result 
  }

  async function getEtherSupply() {
    const res = await (await fetch(ether2Supply(ETHERSCANKEY))).json()
    return(ethers.utils.formatUnits(res.result, 'ether'))
  }

  async function getNodeSize() {
    const res = await (await fetch(etherNodeSize(ETHERSCANKEY))).json()
    return res
  }

  async function getWhales() {
    const resp = await fetch('whale_wallets')
    const whales = await resp.json()
    return whales
  }


  //Effects
  useEffect(() => {
    setEthValue(Math.round((currentEthPrice) * 100) / 100);
  }, [currentEthPrice])


  useEffect(() => {
    getOracle().then(setOracleIns)
    getEtherSupply().then(setEthSupply)
    getNodeSize()
    getWhales().then(setWhales)
  }, [])

  //Local State
  // const [currentUser] = useOutletContext();

  return (
    <div className='-z-50 -top-4 bg-gray-300 min-w-fit outline outline-1'>
      <div className="flex justify-center w-screen h-44 bg-blue-800">
        <div className="bg-white outline outline-1 outline-gray-800 rounded h-1/2 mt-8 w-1/3 min-w-fit pt-3 pl-3 p-2 text-lg font-light">
          <div>Welcome to EtherScout, understanding the EVM state and it users.</div>
          <div>To get started, click the toolbar in the top left, and select a tool.</div>
        </div>
      </div>

      <div className="w-screen -mt-8">
        <div className="flex justify-center">
          <div className="bg-white outline outline-1 rounded-sm w-2/3 m-2 p-4 h-custom grid-flex">
            <table className="w-full ml-12">
              <tr className="font-light text-sm">
                <td>Ether Price      </td>
                <td>Gas Price        </td>
                <td>Market Cap       </td>
              </tr>
              <tr>
                <td>${ethValue?ethValue:null} </td>
                <td>{oracleIns? oracleIns?.SafeGasPrice-1 + '-' + oracleIns?.FastGasPrice : null} Gwei</td>
                <td>{ethSupply?('$' +(Math.floor(ethSupply) * Math.floor(currentEthPrice)).toLocaleString("en-US").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ):null}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="w-screen flex justify-center">
          <div className="w-5/6 bg-white outline outline-1 outline-gray-600 p-2 mt-10 rounded-sm">
            <div className="rounded-sm border-b font-semibold">Large Wallets</div>
            <div className="rounded-sm text-sm">These wallets are big players in the crypto space, keeping tabs on them can <a href="https://www.xtb.com/int/market-analysis/news-and-research/the-fall-of-the-terra-luna" className="text-blue-600 underline">seriously</a> mean the difference when it comes to your portfolio. </div>
          </div>
        </div>
        <div className="w-screen flex justify-center">
          <div className="w-5/6 h-fit grid grid-cols-2 gap-3  min-w-fit mt-2">
            {whales.map(whale => {
              return (<WhaleCard wallet={whale} currentEthPrice={currentEthPrice} />)
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
