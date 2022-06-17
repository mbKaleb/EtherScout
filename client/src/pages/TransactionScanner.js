//The Home component houses

//React Imports
import { useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";

import { PageStyles } from "../hooks/Styles";


export default function TransactionScanner() {

  //Hook Assignment
  const navigate = useNavigate();
  const { transactionHash  } = useParams();

  //Form State
  const initialFormState = { transactionHash: null }
  const [formState, setFormState] = useState(initialFormState) //change to item, not an object
  const [isSearchbox, setIsSearchbox] = useState(true)

  const [errorDisplay, setErrorDisplay] = useState([])

  //Onchange handlers
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState(formState => ({ ...formState, [name]: value }))
  }

  //Handler Assignments
  const searchHandler = (e) => {
    e.preventDefault()
    navigate(`/transaction-scanner/${formState.transactionHash}`)
    setIsSearchbox(false)
    setFormState(initialFormState)
  }

  //Query Validatiors
  const hexidecimalSearchValidator = (e) => {
    e.preventDefault();
    console.log(formState?.transactionHash)
    if (formState?.transactionHash.length !== 66 ){
      setErrorDisplay("-Invalid Hash")
    } else {
        setErrorDisplay("")
      searchHandler(e)
    }
  }
  const queryCotroller = (e) => {
    e.preventDefault()
    hexidecimalSearchValidator(e)
    console.log(e)
  }


  return (
    <div className={PageStyles}>
      {!transactionHash ? (
      <form className="bg-white rounded-sm outline outline-1 min-w-min h-42 w-96 m-4 p-2" onSubmit={queryCotroller}>
        <div className="Drop-Down bg-white rounded m-1 mt-2 flex">
          <label className="font-semibold m-1 border-b">Search for transaction via 44 character hash</label>
        </div>
        <input className="Search-Bar m-2 mt-4 rounded-sm outline outline-1 bg-gray-100 w-96 drop-shadow pl-1"
          value={formState?.transactionHash}
          placeholder="Transaction Hash"
          name="transactionHash"
          onChange={handleInput}
        />
        <button className="outline outline-1 rounded-sm mb-1 px-0.5 ml-2 text-lg font-light">Search</button>
        <div className="text-red-600 ml-1">{errorDisplay}</div>
      </form> ) : (
      <Outlet />
    ) }
  </div>
  )
}