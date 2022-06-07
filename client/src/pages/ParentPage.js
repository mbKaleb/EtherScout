
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


  return (
    <div className='bg-gray-300 relative h-screen outline outline-1 '>

      <div className='bg-gray-100 p-2 top-11 w-full sticky top-0 outline outline-blue-500 z-50 flex grid grid-rows-1 grid-flow-col gap-12 '>

        <button className='outline outline-1 bg-purple-700 text-center w-7 rounded p-1' onClick={toggleSidebar}><BsStack style={{ color: "white", fontSize: "1.2em" }} /></button>
        <button className='flex text-justify  w-fit' onClick={navigateReact}>{<FaReact className='m-1' style={{ color: "blue" }} />}React-v17.1, React-Router-v6.3{<FaReact className='m-1' style={{ color: "blue" }} />}</button>
        <button className='flex text-justify  w-fit' onClick={navigateEthersJs}>{<FaEthereum className='m-1' />}EtherscanAPI with EthersJS{<FaEthereum className='m-1' />}</button>
        <button className='flex text-justify  w-fit' onClick={navigateTailwind}>{<SiTailwindcss className='m-1' style={{ color: ' #57bfff' }} />}Tailwind{<SiTailwindcss className='m-1' style={{ color: ' #57bfff' }} />}</button>

        <div className='max-w-lg float-right ml-8 justify-self-right'>
          {!isLoggedIn() ? (<>
            <button className='rounded outline outline-1 outline-black bg-blue-600 font-semibold text-white -mr-4 w-40' onClick={callLogInForm}>Log In</button>
            <button className='rounded outline outline-1 outline-black bg-purple-600 font-semibold text-white w-32' onClick={callSignUpForm}>Sign Up</button>
          </>)
            :
            (<div className='flex'>
              <div className='mr-4 text-blue text-bold'>Weclome, {currentUser.username}</div>
              <button className='rounded outline outline-1 outline-black bg-purple-600 font-semibold text-white w-24' onClick={logOutHandler}>Logout</button>
            </div>)
          }
        </div>
        <Sidebar isSidebarActive={isSidebarActive} currentUser={currentUser} />
      </div>

      <Outlet context={[currentUser, currentEthPrice]} />

    </div>
  )
}