//The Home component houses 

//React Imports
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";


function Home() {

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
    navigate(`/wallet-finder/${formState.walletaddress}`)
    setIsSearchbox(false)
    setFormState(formState)
  }

  //Query Validatiors
  const hexidecimalSearchValidator = (e) => {
    e.preventDefault();
  }

  //Quesry Controller
  const queryCotroller = () => {
    if (optionSelector === "hexidecimal") {
      if (formState.walletaddress.length !== 16){
        setErrorDisplay("Invalid Hex-Address")
      }
    }
  }

  return (
    <div className="flex justify-center rounded-1 bg-gray-300 p-2">

    {isSearchbox ? (
      <form className="bg-white rounded-sm outline outline-1 min-w-min h-32 w-96 m-4 p-1" onSubmit={hexidecimalSearchValidator}>
        <div className="Drop-Down bg-white rounded m-1 mt-2 flex">
          <label className="font-semibold m-1 mr-14">Search for wallet by: </label>
          <select className="outline outline-1 rounded-sm m-0.5" onChange={handleOptionChange} value={this}>
            <option value="hexidecimal"> Hexidecimal Address</option>
          </select>
        </div>
        <input className="Search-Bar m-2 mt-4 rounded-sm outline outline-1 bg-gray-100 w-96 drop-shadow"
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