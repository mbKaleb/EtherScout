
//The sidebar component is a hideable set of buttons on the side to navigate to different pages//

import { useNavigate } from "react-router-dom"


export default function Sidebar({ isSidebarActive, currentUser }) {

  //UseNavigate hook assignment
  const navigate = useNavigate();

  //Basic Variable Assignment
  const isLoggedIn = () => {
    if (currentUser) {
      return (true)
    } else {
      return (false)
    }
  }

  //Navigate to endpoint based on the button 'name' data
  const navigateHandler = (e) => {
    navigate(e.target.name)
  }
  const navigateAuthorizedUser = (e) => {
    if (isLoggedIn) {
      navigate(e.target.name)
    }
  }

  //Styles Assignment
  const purpleButtonStyles = 'Computed:( m-1 w-56 h-8) Styles:( rounded outline outline-1 outline-gray-600 drop-shadow-lg bg-purple-600 text-lg  text-white )'
  const blueButtonStyles = 'Computed:( m-1 w-56 h-8 ) Styles:( rounded outline outline-1 outline-gray-600 drop-shadow-lg bg-blue-500   text-lg  text-white )'


    if (isSidebarActive) {
      return (
        <div className='(Sidebar Parent) Computed:( h-64 p-1 z-40  left-0 ) Style:( w-60 bg-gray-100 ) absolute top-10 ' >
          <button className={isLoggedIn() ? blueButtonStyles : purpleButtonStyles } name={'/'} onClick={navigateHandler} > Home </button>
          {isLoggedIn() ? <button className={purpleButtonStyles} name={'/watched-wallets'} onClick={navigateAuthorizedUser} > Watched Wallets </button> : null}
          <button className={blueButtonStyles} name={'/wallet-finder'} onClick={navigateHandler} > Wallet-Finder </button>
          <button className={purpleButtonStyles} name={'/whales'} onClick={navigateHandler} > About </button>
        </div>)
    } else {
      return (
        <></>
      )
    }
}