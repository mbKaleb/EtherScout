// React Imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


// Page Components
import ParentPage from "./pages/ParentPage";
import Home from "./pages/Home";
import WatchedWallets from "./pages/WatchedWallets";
import WalletFinder from "./pages/WalletFinder"
import Whales from "./pages/Whales";
import AddressQuery from "./dynamic-pages/AddressQuery";
import Technologies from "./pages/Technologies";

import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

import PageNotFound from "./pages/PageNotFound";


// Style Sheet
import './App.css';

//Development Keys
import { ETHERSCANKEY } from "./keys";


export default function App() {

  //State Assignment
  const [currentUser, setCurrentUser] = useState()
  const [currentEthPrice, setCurrentEthPrice] = useState(1)

  //Fetch Assignments
  const getMeFetch = () => {
    fetch('/me')
      .then(res => {
        if (res.ok) {
          res.json().then(user => setCurrentUser(user))
        } else {
          setCurrentUser(null)
        }
      })
  }
  // const getNewestWhaleTransaction = () => {
  //   fetch('https://cors-anywhere.herokuapp.com/https://api.whale-alert.io/v1/status', {
  //     headers: {
  //       'Origin': 'http://localhost:4000', //Need to be changed for deployment
  //       'Content-Type': 'application/json',
  //       'X-WA-API-KEY': WhaleWatcherApiKey
  //     }
  //   }).then(r => r.json()).then(console.log)
  // }
  const getLatestEthPrice = () => {
    fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCANKEY}`).then(res => res.json()).then(res => setCurrentEthPrice(res.result.ethusd))
  }

  //On-page-load:
  useEffect(() => {
    getMeFetch()
    // getNewestWhaleTransaction()
    getLatestEthPrice()
  }, [])


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParentPage currentUser={currentUser} setCurrentUser={setCurrentUser} currentEthPrice={currentEthPrice} />}> {/*Parent Route/Source */}
          <Route path="" element={<Home />} />                          {/*Home Page*/}
          <Route path="watched-wallets" element={<WatchedWallets />} /> {/*Watched Wallets*/}
          <Route path="technologies" element={<Technologies />} />      {/*Technologies*/}

          <Route path="wallet-finder" element={<WalletFinder />} >      {/*Wallet Finder, Not Completed Yet*/}
            <Route path=':walletAddress' element={<AddressQuery currentEthPrice={currentEthPrice}/>} />
          </Route>
          <Route path="whales" element={<Whales />} >
            {/* Whale user data  */}
          </Route>
          
          <Route path="login" element={<LogIn setCurrentUser={setCurrentUser} />} />    {/*login Wallets*/}
          <Route path="/signup" element={<SignUp setCurrentUser={setCurrentUser} />} /> {/*sign up Wallets*/}

          <Route path="*" element={<PageNotFound />} /> {/*Page-not-found display/redirect*/}
        </Route>
      </Routes>
    </Router>
  );
}