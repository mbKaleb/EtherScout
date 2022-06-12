
//React Imports
import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom'

//Icons
import { BsStack } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';
import { FaEthereum } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';

//Components
import Sidebar from '../components/Sidebar';


export default function ParentPage({ currentUser, setCurrentUser, currentEthPrice }) {

  //Sidebar State
  const [isSidebarActive, setIsSidebarActive] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarActive(isSidebarActive => !isSidebarActive)
  }

  //Hook Assignment
  const navigate = useNavigate();

  //Basic Variable Assignment
  const isLoggedIn = () => {
    if (currentUser) {
      return (true)
    } else {
      return (false)
    }
  }


  //Navigation assignment
  const callLogInForm = () => {
    navigate('/login')
  }
  const callSignUpForm = () => {
    navigate('/signup')
  }
  const logOutHandler = () => {
    logOutFetch()
    navigate('/')
  }


  //Fetch Assignments
  const logOutFetch = (e) => {
    fetch('/logout', {
      method: 'DELETE'
    }).then(() => setCurrentUser(null))
  }

  const navigateTailwind = () => {
    window.location.replace('https://tailwindcss.com')
  }
  const navigateEthersJs = () => {
    window.location.replace('https://docs.ethers.io/v5/')
  }
  const navigateReact = () => {
    window.location.replace('https://reactjs.org/')
  }


  //Styles
  const logoStyles = 'Computed:(  ml-2 w-36 h-8 px-2 ) Styles:( rounded-sm outline outline-1 outline-gray-300 drop-shadow-lg bg-blue-800 text-xl font-light text-white text-center m-0 )'


  return (

    <div className='bg-gray-300 relative h-screen'>

      <div className='bg-gray-100 p-2 top-11 w-full sticky top-0 outline outline-blue-500 z-50 h-12 flex'>

        <p className={logoStyles} > EtherScout </p> {/* test */}

        <button className='outline outline-2 bg-white text-center w-36 rounded p-1 justify-left mr-12' onClick={toggleSidebar}> <BsStack style={{ color: "black", fontSize: "1.2em" }} /> </button>
        <div className='grow'></div>
        <div className='h-max float-right justify-self-right mt-1 ml-8 z-50 w-42'>
          {!isLoggedIn() ? (<>
            <button className='rounded-sm outline outline-2 outline-blue-600 bg-white font-bold text-blue-600 mr-2 w-32' onClick={callLogInForm}>Log In</button>
            <button className='rounded-sm outline outline-2 outline-blue-700 bg-blue-700 font-semibold text-white w-32' onClick={callSignUpForm}>Sign Up</button>
          </>)
            :
            (<div className='flex'>
              <div className='mr-4 text-blue text-bold'>Weclome, {currentUser.username}</div>
              <button className='rounded outline outline-1 outline-black bg-purple-600 font-semibold text-white w-24' onClick={logOutHandler}>Logout</button>
            </div>)
          }
        </div>
        <Sidebar isSidebarActive={isSidebarActive} currentUser={currentUser} toggleSidebar={toggleSidebar} />
      </div>

      <Outlet context={[currentUser, currentEthPrice]} />

    </div>
  )
}


{/* Saved for later
<button className='flex text-justify  w-fit' onClick={navigateReact}>{<FaReact className='m-1' style={{ color: "blue" }} />}React{<FaReact className='m-1' style={{ color: "blue" }} />}</button>
<button className='flex text-justify  w-fit' onClick={navigateEthersJs}>{<FaEthereum className='m-1' />}EthersJS{<FaEthereum className='m-1' />}</button>
<button className='flex text-justify  w-fit' onClick={navigateTailwind}>{<SiTailwindcss className='m-1' style={{ color: ' #57bfff' }} />}Tailwind{<SiTailwindcss className='m-1' style={{ color: ' #57bfff' }} />}</button> */}
