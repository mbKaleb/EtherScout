//React Imports
import { useOutletContext } from "react-router-dom"

//Component Imports

//Styles
import { PageStyles } from "../hooks/Styles"


export default function Home() {

  //Local State
  const [currentUser, currentEthPrice] = useOutletContext();
  console.log(currentUser)
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
          <div className="bg-white outline outline-1 rounded-sm w-2/3 m-2 p-4 h-custom" >Hello {currentUser ? currentUser.username : 'annon'}
        <div>Test</div>
        </div>
        </div>
        <div className="bg-white outline outline-1 rounded-sm min-w-md w-8/12 m-4 float-left jjustify-self-start p-8 h-custom"></div>
      </div>
    </div>
  )
}