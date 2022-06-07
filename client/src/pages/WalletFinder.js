//The Home component houses 

//React Imports
import { useState } from "react";
import { Outlet } from "react-router-dom";


function Home() {

  //Form State
  const [formState, setFormState] = useState()
  const initialFormState = { 'wallet-address': "" }
  
  //Ethers Assignment
  const network = "homestead";
  const { ethers } = require("ethers");
  const provider = ethers.getDefaultProvider(network, {
    etherscan: '5JJTINSZ38FFRH9VRUDJXHTNW6W8SF3TFC',
  })


  //Fetch Assignments
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState(formState => ({ ...formState, [name]: value }))
  }


  //Handler Assignments
  const searchHandler = (e) => {
    e.preventDefault();console.log('ran search handler');console.log(formState)
  }


  return (
    <div className="flex justify-center rounded-1 bg-gray-100 p-2 place-items-center outline outline-1 ">
      <form className="Large Wallets bg-gray-400 rounded min-w-min w-96 m-4 p-1" onSubmit={searchHandler}>

        <div className="bg-white outline rounded outline-1 m-1 flex">
          <label className="font-semibold m-1">Search for wallet by: </label>
          <select className="outline outline-1 m-1">
            <option> Hexidecimal Address</option>
          </select>
        </div>

        <input className="m-2 mt-4 rounded bg-gray-100 w-96 drop-shadow"
          type="text"
          value={null}
          placeholder=" Wallet Address"
          name="wallet-address"
          onChange={handleInput}
        />
        <button className="outline outline-1 font-semibold bg-blue-500 rounded p-1 place-self-center" type='submit'>Coming Soon</button>
        
      </form>
        <Outlet />
    </div>
  )
}

export default Home