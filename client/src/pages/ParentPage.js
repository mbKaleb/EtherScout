
//React Imports
import { useState } from 'react';
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
  const [buttonTextContent, setButtonTextContent] = useState('Home')
  const textContentHandler = (text) => {
    setButtonTextContent(text);
  }

  //Basic Variable Assignment
  const isLoggedIn = () => {
    if (currentUser) {
      return (true)
    } else {
      return (false)
    }
  }

  //Hook Assignment
  const navigate = useNavigate();

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
  const navigateHome = () => {
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
  const logoStyles = 'Computed:(  ml-2 w-36 h-8 px-2 ) Styles:( rounded-sm bg-blue-600 text-2xl font-light text-white text-center )'
  const dropDownButtonStyles = 'computed:( ml-4 w-48 h-8 pl-2 )  styles:( rounded-sm outline outline-1 outline-gray-300 bg-blue-800 text-xl font-light text-white text-left )'

  const logInBttnStyles = 'rounded-sm outline outline-2 outline-blue-600 bg-white text-blue-600  text-xl mr-2 w-32 font-medium'
  const signUpBtnStyles = 'rounded-sm outline outline-2 outline-blue-700 bg-blue-700  text-white text-xl mr-2 w-32'


  return (
    <div className='bg-gray-200 h-screen'>
      <div className='bg-gray-100 p-2 top-11 w-full sticky top-0 outline outline-blue-700 z-50 h-12 flex'>
        <button className={logoStyles} onClick={navigateHome} > EtherScout </button>
        <button className={dropDownButtonStyles} onClick={toggleSidebar}>{buttonTextContent}</button>
        <div className='grow'></div>
        <div className='h-max mt-1 ml-8 z-50 w-42'>
          {!isLoggedIn() ? (<>
          <button className={logInBttnStyles} onClick={callLogInForm}>Log In</button>
          <button className={signUpBtnStyles} onClick={callSignUpForm}>Sign Up</button>
          </>)
          :
          (
          <div className='flex'>
            <div className='mr-4 text-blue text-bold'>Weclome, {currentUser.username}</div>
            <button className='rounded outline outline-1 outline-black bg-purple-600 font-semibold text-white w-24' onClick={logOutHandler}>Logout</button>
          </div> )}
        </div>
        <Sidebar isSidebarActive={isSidebarActive} currentUser={currentUser} toggleSidebar={toggleSidebar} textContentHandler={textContentHandler} />
      </div>
      <Outlet context={[currentUser, currentEthPrice]} />
    </div>
  )
}


{/* Saved for later
<button className='flex text-justify  w-fit' onClick={navigateReact}>{<FaReact className='m-1' style={{ color: "blue" }} />}React{<FaReact className='m-1' style={{ color: "blue" }} />}</button>
<button className='flex text-justify  w-fit' onClick={navigateEthersJs}>{<FaEthereum className='m-1' />}EthersJS{<FaEthereum className='m-1' />}</button>
<button className='flex text-justify  w-fit' onClick={navigateTailwind}>{<SiTailwindcss className='m-1' style={{ color: ' #57bfff' }} />}Tailwind{<SiTailwindcss className='m-1' style={{ color: ' #57bfff' }} />}</button> */}
