
//React Imports
import { useState, useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"

//Components
import EditWalletCard from "../components/EditWalletCard"
import NewWalletCard from "../components/NewWalletCard"
import WalletCard from "../components/WalletCard"


//Styles
import { PageStyles } from "../hooks/Styles"


export default function WatchedWallets() {

  //New Wallet State
  const [isHidden, setIsHidden] = useState(true)
  const toggleFormHandler = () => {
    setIsHidden(!isHidden)
  }
  
  //Hook Assignment
  const [currentUser] = useOutletContext();
  const navigate = useNavigate();

  //Basic Variable Assignment
  const isLoggedIn = () => {
    if (currentUser) {
      return (true)
    } else {
      return (false)
    }
  }

  //On page load:
  // useEffect(() => {
  //   if (!isLoggedIn()) { 
  //     navigate('/whoops') //Bug where if you go back with google (previous page) button the cookie loads after the redirect happens, meaning a logged in user will be improperly redirected to the whoops page
  //   }
  // }, [])


  return (
    (<div className={PageStyles}>
      <NewWalletCard currentUser={currentUser} toggleFormHandler={toggleFormHandler} isHidden={isHidden} />
      <div className="( Your-Wallets ) bg-gray-100 outline outline-1 outline-blue-300 rounded min-w-min w-64 m-4">
        <>
        <div className="rounded bg-white  p-4 text-blue-800 font-semibold"> <button className="text-purple-600 outline outline-2 outline-purple-400 p-1 rounded mr-16" onClick={toggleFormHandler}>New Wallet</button> Your Watched Wallets  </div> 
        
        </>
        {isLoggedIn() ? currentUser.custom_wallets.map((userWallet) => { return <EditWalletCard wallet={userWallet} /> }) : null} {/* Monitor the isLoggedIn logic, could cause bugs later*/}
      </div>
    </div>)
  )
}