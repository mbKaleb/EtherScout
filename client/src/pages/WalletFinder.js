//The Home component houses 

//React Imports
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";


function Home() {

  //Hook Assignment
  const navigate = useNavigate();

  //Form State
  const initialFormState = { walletaddress: "" }
  const [formState, setFormState] = useState(initialFormState)
  const [isSearchbox, setIsSearchbox] = useState(true)

  //Ethers Assignment
  const network = "homestead";
  const { ethers } = require("ethers");
  const provider = ethers.getDefaultProvider(network, {
    etherscan: '5JJTINSZ38FFRH9VRUDJXHTNW6W8SF3TFC',
  })

  //Fetch Assignments
  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormState(formState => ({ ...formState, [name]: value }))
    console.log(formState)
  }


  //Handler Assignments
  const searchHandler = (e) => {
    e.preventDefault();console.log('ran search handler');
    navigate(`/wallet-finder/${formState.walletaddress}`)
    setIsSearchbox(false)
    setFormState(formState)
  }


  return (
    <div className="flex justify-center rounded-1 bg-gray-300 p-2">

    {isSearchbox ? (
      <form className="bg-white rounded-sm outline outline-1 min-w-min w-96 m-4 p-1" onSubmit={searchHandler}>
        <div className="Drop-Down bg-white rounded m-1 flex">
          <label className="font-semibold m-1 mr-14">Search for wallet by: </label>
          <select className="outline outline-1 rounded-sm m-1">
            <option> Hexidecimal Address</option>
          </select>
        </div>
        <input className="Search-Bar m-2 my-4 rounded-sm outline outline-1 bg-gray-100 w-96 drop-shadow"
          value={formState.walletaddress}
          placeholder=" Wallet Address"
          name="walletaddress"
          onChange={handleInput}
        />
      </form>
    ) : (
      <Outlet />
    ) }

    </div>
  )
}

export default Home