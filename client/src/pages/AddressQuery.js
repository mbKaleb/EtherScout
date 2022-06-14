//The Home component houses 

//React Imports
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { PageStyles } from "../hooks/Styles";




export default function AddressQuery() {

  //Hook Assignment
  const navigate = useNavigate();

  //Form State
  const initialFormState = { walletaddress: "" }
  const [formState, setFormState] = useState(initialFormState) //change to item, not an object
  const [isSearchbox, setIsSearchbox] = useState(true)

  const [optionSelector, setOptionSelector] = useState("hexidecimal");

  const [errorDisplay, setErrorDisplay] = useState([])


  //Onchange handlers
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState(formState => ({ ...formState, [name]: value }))
  }
  const handleOptionChange = (e) => {
    setOptionSelector(e.target.value)
  }


  //Handler Assignments
  const searchHandler = (e) => {
    e.preventDefault()
    navigate(`/address-query/${formState.walletaddress}`)
    setIsSearchbox(false)
    setFormState(formState)
  }

  //Query Validatiors
  const hexidecimalSearchValidator = (e) => {
    e.preventDefault();
    if (formState.walletaddress.length !== 42 ){
      setErrorDisplay("-Invalid Address")
    } else {  
      searchHandler(e)
    }
  }

  //Quesry Controller
  const queryCotroller = (e) => {
    //Hexidecimal Validator
    if (optionSelector === "hexidecimal") {
      hexidecimalSearchValidator(e)
    }
  }


  return (
    <div className={PageStyles}>
      {isSearchbox ? (
      <form className="bg-white rounded-sm outline outline-1 min-w-min h-32 w-96 m-4 p-1" onSubmit={queryCotroller}>
        <div className="Drop-Down bg-white rounded m-1 mt-2 flex">
          <label className="font-semibold m-1 mr-14">Search for wallet by: </label>
          <select className="outline outline-1 rounded-sm m-0.5" onChange={handleOptionChange} value={this}>
            <option value="hexidecimal"> Hexidecimal Address</option>
          </select>
        </div>
        <input className="Search-Bar m-2 mt-4 rounded-sm outline outline-1 bg-gray-100 w-96 drop-shadow pl-1"
          value={formState.walletaddress}
          placeholder="Wallet Address"
          name="walletaddress"
          onChange={handleInput}
        />
        <div className="text-red-600 ml-2">{errorDisplay}</div>
      </form> ) : (
      <Outlet />
    ) }
  </div>
  )
}