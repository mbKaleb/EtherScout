
//The sidebar component is a hideable set of buttons on the side to navigate to different pages//

import { useNavigate } from "react-router-dom"


export default function Sidebar({ isSidebarActive, currentUser, toggleSidebar }) {

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
  const purpleButtonStyles = 'Computed:( m-1 w-56 h-8 ) Styles:( rounded outline outline-1 outline-gray-600 drop-shadow-lg bg-purple-600 text-lg  text-white )'
  const blueButtonStyles =   'Computed:( m-1 w-56 h-8 ) Styles:( rounded outline outline-1 outline-gray-600 drop-shadow-lg bg-blue-500   text-lg  text-white )'

  const newStyles = 'Computed:( m-1 ml-2 w-11/12 h-8 ) Styles:( rounded-sm outline outline-1 outline-gray-300 drop-shadow-lg bg-blue-800 text-xl font-light  text-white text-left pl-3 )'
  const filterStyles = null;


    if (isSidebarActive) {
      return (
      <div className='(Sidebar Parent) Computed:( h-fit p-1 z-40   ) Style:( w-52 bg-gray-100 ) absolute ( top-1 left-24 outline outline-1 p-2 rounded-sm ) ' >
        <button className={isLoggedIn() ? newStyles : newStyles } name={'/'} onClick={navigateHandler} > Home </button>
        <button className={isLoggedIn() ? newStyles : newStyles } name={'/'} onClick={navigateHandler} > Home </button>
        <button className={newStyles} name={'/technologies'} onClick={navigateHandler} > Techologies </button>


        {isLoggedIn() ? <button className={newStyles} name={'/watched-wallets'} onClick={navigateAuthorizedUser} > Watched Wallets </button> : null}

        <input
        className="outline outline-2 rounded-sm text-lg font-light outline-gray-600 m-2 w-11/12 pl-1 ml-2.5"
        placeholder="Filter"
        />

        <div className="border  m-1" />
        <button className={newStyles} name={'/wallet-finder'} onClick={navigateHandler} > Wallet Finder </button>
        <button className={newStyles} name={'/wallet-finder'} onClick={navigateHandler} > Address Analyzer </button>
        <button className={newStyles} name={'/whales'} onClick={navigateHandler} > About </button>
      </div>)
    } else {
      return (
        <></>
      )
    }
}