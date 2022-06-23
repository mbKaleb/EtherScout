//React Imports
import { useOutletContext } from "react-router-dom"
import { useState, useEffect } from "react"

//Component Imports

//Hooks
import { gasOracle } from "../hooks/endpoints";

import { ETHERSCANKEY } from "../keys";

//Styles
import { PageStyles } from "../hooks/Styles"


export default function Home({ currentEthPrice }) {

  //State
  const [ethValue, setEthValue] = useState(0);
  const [oracleIns, setOracleIns] = useState()


  //Fetch assignemtn
  async function getOracle() {
    const res = await (await fetch(gasOracle(ETHERSCANKEY))).json()
    return res.result 
  }


  //Effects
  useEffect(() => {
    setEthValue(Math.round((currentEthPrice) * 100) / 100);
  }, [currentEthPrice])


  useEffect(() => {
    getOracle().then(setOracleIns)
  }, [])
  console.log(oracleIns)

  //Local State
  // const [currentUser] = useOutletContext();

  return (
    <div className='-z-50 -top-4 bg-gray-300 min-w-fit'>
      <div className="flex justify-center w-screen h-44 bg-blue-800">
        <div className="bg-white border rounded h-1/2 mt-8 w-1/3 min-w-fit pt-3 pl-3 p-2 text-lg font-light">
          <div>Welcome to EtherScout, understanding the EVM state and it users.</div>
          <div>To get started, click the toolbar in the top left, and select a tool.</div>
        </div>
      </div>

      <div className="w-screen bg-">
        <div className="flex justify-center">
          <div className="bg-white outline outline-1 rounded-sm w-2/3 m-2 p-4 h-custom grid-flex" >
            <table className="w-full bg-">
              <tr className="font-light text-sm">
                <td>Ether Price      </td>
                <td>Gas Price        </td>
                <td>Market Cap       </td>
                <td>Transactions     </td>
                <td>Mining Difficulty</td>
              </tr>
              <tr>
                <td>${ethValue?ethValue:null} </td>
                {/* <td>{oracleIns?oracleIns:null}</td> */}

              </tr>
            </table>
          </div>
        </div>
        <div className="bg-white outline outline-1 rounded-sm min-w-md w-8/12 m-4 float-left p-8 h-custom"></div>
      </div>
    
    </div>
  )
}
