// This component is called by the "Sign Up" Button and allows the user to post an account to the database and automatically login

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SignUpForm({ setUser }) {

  //Local State
  const initialFormState = { username: "", password: "", password_confirmation: "" }
  const [formState, setFormState] = useState(initialFormState)

  const [stateErrors, setStateErrors] = useState([])


  //Hook Assignment
  const navigate = useNavigate();


  //Handler Assignments
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState(formState => ({ ...formState, [name]: value }))
  }
  const signUpHandler = (e) => {
    e.preventDefault()
    signUpFetch()
  }


  //Fetch Assignment
  const signUpFetch = () => {
    fetch('/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formState.username,
        password: formState.password,
        password_confirmation: formState.password_confirmation
      }),
    }).then(res => {if(res.ok){
      navigate('/')
      setFormState(initialFormState)

    } else{
      res.json().then(setStateErrors)
    }})
  }

  console.log(stateErrors.error)

  return (
    <div className="drop-shadow-lg w-1/5 min-w-min min-h-min bg-white m-3 rounded outline outline-0 z-20 object-center w-96">

      <form className="w-96 " onSubmit={signUpHandler}>
        <div className="p-3 bg-violet-700 w-full rounded">
          <p className="text-2xl mb-6 font-semibold text-white">Sign Up</p>
        </div>
        <div className="mt-4">
          <input className="m-2 rounded bg-gray-100 drop-shadow"
            type="text"
            value={formState.username}
            placeholder=" username"
            name="username"
            onChange={handleInput}
          />
          <input
            className="m-2 mt-4 rounded bg-gray-100 drop-shadow"
            type="text"
            value={formState.password}
            placeholder=" Password"
            name="password"
            onChange={handleInput}
          />  {/*return to change to password*/}
          <input
            className="m-2 mt-4 rounded bg-gray-100 drop-shadow"
            type="text"
            value={formState.password_confirmation}
            placeholder=" Confirm Password"
            name="password_confirmation"
            onChange={handleInput}
          />
          <div>{stateErrors.error ? stateErrors.error.map((error)=> { return <div className="m-1 ">{error}</div>}) : null }</div>
          <button className="rounded-sm mt-4 m-2 outline-2 text-lg w-48 outline outline-1 font-medium text-purple-600" type="submit">Continue</button>
        </div>
      </form>

    </div>
  )
}