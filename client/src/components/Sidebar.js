
//The sidebar component is a hideable set of buttons on the side to navigate to different pages//

import { useNavigate } from "react-router-dom"


export default function Sidebar({ isSidebarActive, currentUser, toggleSidebar, textContentHandler, buttonTextContent }) {

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
    toggleSidebar()
    textContentHandler(e.target.textContent)
    // textContentHandler(e.target.textCont)
    
  }
  const navigateAuthorizedUser = (e) => {
    if (isLoggedIn) {
      navigate(e.target.name)
    }
  }

  //Styles Assignment
  const blueButton = 'Computed:( w-full h-8 my-1 pl-2 ) Styles:( rounded-sm outline outline-1 outline-gray-300 bg-blue-800 ) text/font: ( text-xl font-light text-white text-left )';

    if (isSidebarActive) {
      return (
      <div className='computed:( h-fit z-40 absolute top-1 left-44 w-48 ) style:( bg-gray-100 outline outline-2 outline-gray-100 rounded-sm drop-shadow-xl )'>
        <button className={blueButton} name={'/'} onClick={toggleSidebar} >{buttonTextContent}</button>
        { (buttonTextContent === 'Technologies') ? null : (<button className={blueButton} name={'/technologies'} onClick={navigateHandler} >Technologies</button>) }
        <input className="border border-black rounded-sm text-lg font-light outline-gray-600 ml-2 w-11/12 my-1 " placeholder="Filter Tools" />
        <div className="border m-1" />
        { (buttonTextContent === 'Address Query' ) ? null : (<button className={blueButton} name={'/address-query'} onClick={navigateHandler} >Address Query</button>) }
        { (buttonTextContent === 'Address Query' ) ? null : (<button className={blueButton} name={'/transaction-scanner'} onClick={navigateHandler} >Transaction Scanner</button>) }
        { (buttonTextContent === 'Correlate' ) ? null : (<button className={blueButton} name={'/correlate'} onClick={navigateHandler} >Correlate</button>) }
      </div> )
    } else {
      return (
        <></>
        )
      }
    }

    {/* <button className={isLoggedIn() ? newStyles : newStyles } name={'/'} onClick={navigateHandler} > Home </button> */}
    {/* {isLoggedIn() ? <button className={newStyles} name={'/watched-wallets'} onClick={navigateAuthorizedUser} > Watched Wallets </button> : null} */}
    {/* <button className={newStyles} name={'/whales'} onClick={navigateHandler} > About </button> */}