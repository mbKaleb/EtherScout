import { PageStyles } from "../hooks/Styles"

import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Correlate() {

  //Hook Assignment
  const navigate = useNavigate();

   // Page State
  const initialForm1State = {wallet: 1}
  const initialForm2State = {wallet: 2}

  const [isFormVisible, setisFormVisible] = useState(true)

    // Explicit Form State
  const [form1State, setForm1State] = useState(initialForm1State)
  const [optionSelector1, setOptionSelector1] = useState("hexidecimal");
  
  const [form2State, setForm2State] = useState(initialForm2State)
  const [optionSelector2, setOptionSelector2] = useState("hexidecimal")

  const [errorDisplay1, setErrorDisplay1] = useState([])
  const [errorDisplay2, setErrorDisplay2] = useState([])

  const handleInput1 = (e) => {
    const { name, value } = e.target;
    console.log(e)
    setForm1State(formState => ({ ...formState, [name]: value }))
  }
  const handleInput2 = (e) => {
    const { name, value } = e.target;
    setForm2State(formState => ({ ...formState, [name]: value }))
  }

  const handleOptionChange1 = (e) => {
    setOptionSelector1(e.target.value)
  }
  const handleOptionChange2 = (e) => {
    setOptionSelector2(e.target.value)
  }

  // const searchHandler = (e) => {
  //   e.preventDefault()
  //   navigate(`/address-query/${formState.walletaddress}`)
  //   setIsSearchbox(false)
  //   setFormState(formState)
  // }
  // const hexidecimalSearchValidator = (e) => {
  //   e.preventDefault();
  //   if (formState.walletaddress.length !== 42 ){
  //     setErrorDisplay("-Invalid Address")
  //   } else {  
  //     searchHandler(e)
  //   }
  // }

  const queryCotroller = (e) => {
    e.preventDefault()
    console.log('ran')
    //Hexidecimal Validator
    // if (optionSelector === "hexidecimal") {
    //   hexidecimalSearchValidator(e)
    // }
  }

  const isSearchValid = (input, searchType) => {
    if (searchType == 'hexidecimal') {
      if (input.length == 42) {
        return true
      } else {
        if (input.wallet == 1) {
          setErrorDisplay1('Invalid Address')
        } else if (input.wallet == 2) {
          setErrorDisplay2("Invalid Address")
        } else {
          throw("Error from isSearchValid")
        }
        return false;
      }
    }
  }

  const noEvent = (e) => {
    e.preventDefault()
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if ( isSearchValid(form1State, optionSelector1) && isSearchValid(form2State, optionSelector2) ) {
      navigate(`/correlate:${form1State}&${form2State}`);
    }
  }

  return (
    <div className="justify-content-center center rounded-1 bg-gray-300 w-screen p-3 min-w-fit">

      <div className="flex justify-center ">
        <div className="flex justify-center w-6/12 border rounded-sm bg-white drop-shadow p-2 font-medium ml-2 pl-4">Correlate and analyze relationships between two wallets</div>
      </div>

      <div className="flex justify-center mt-2">

        <div className="grid-flex drop-shadow ml-2 min-w-fit w-3/12">
          <form className="bg-white rounded-sm outline outline-1 min-w-min h-32 m-4 p-2" onSubmit={noEvent}>
            <div className="bg-white rounded m-1 mt-2 flex">
            <label className="font-semibold m-1 mx-2">Wallet 1</label>
            <div className="grow"/>
            <select className="outline outline-1 rounded-sm m-0.5" onChange={handleOptionChange1} value={this}>
              <option value="hexidecimal">Hexidecimal Address</option>
            </select>
            </div>
            <input className="Search-Bar m-2 mt-4 rounded-sm outline outline-1 bg-gray-100 w-96 drop-shadow pl-1"
              value={form1State?.walletaddress1}
              placeholder="Wallet Address"
              name="walletaddress"
              onChange={handleInput1}
            />
            <div className="text-red-600 ml-2">{errorDisplay1}</div>
          </form>
        </div>

        <div className="grid-flex drop-shadow ml-2 min-w-fit w-3/12">
          <form className="bg-white rounded-sm outline outline-1 min-w-min h-32 m-4 p-2" onSubmit={noEvent}>
            <div className="bg-white rounded m-1 mt-2 flex">
            <label className="font-semibold m-1 mx-2">Wallet 2</label>
            <div className="grow"/>
            <select className="outline outline-1 rounded-sm m-0.5" onChange={handleOptionChange2} value={this}>
              <option value="hexidecimal">Hexidecimal Address</option>
            </select>
            </div>
            <input className="Search-Bar m-2 mt-4 rounded-sm outline outline-1 bg-gray-100 w-96 drop-shadow pl-1"
              value={form2State?.walletaddress2}
              placeholder="Wallet Address"
              name="walletaddress"
              onChange={handleInput2}
            />
            <div className="text-red-600 ml-2">{errorDisplay2}</div>
          </form>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="outline outline-1 rounded bg-white justify-center w-fit m-1 p-1 px-2 self-center  text-lg" onClick={submitHandler}>Submit</button>
      </div>

    </div>
  )
}
