// This component is called by the "Log In" Button and allows the user to post to an account to the database and save the cookie as session

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LogInForm({ setCurrentUser }) {

  //Local State
  const initialFormState = { username: "", password: "" }
  const [formState, setFormState] = useState(initialFormState)

  const [stateErrors, setStateErrors] = useState([])


  //Hooks Assignment
  const navigate = useNavigate();


  //Handler Assignments
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState(formState => ({ ...formState, [name]: value }))
  }
  const logInHandler = (e) => {
    e.preventDefault()
    logInFetch()
  }


  //Fetch Assignment
  const logInFetch = () => {
    fetch('/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formState.username,
        password: formState.password,
      }),
    }).then(res => {
      if (res.ok) {
        navigate('/')
        setFormState(initialFormState)
        res.json().then(setCurrentUser)
      } else {
        res.json().then(setStateErrors)

      }
    })
  }


  return (
    <div className="drop-shadow w-1/5 min-w-min min-h-min bg-white m-3 rounded z-20 object-center w-96">

      <form className="w-96" onSubmit={logInHandler}>
        <div className="p-3 w-96 bg-blue-700 rounded">
          <p className="text-2xl mb-6 font-semibold text-white">Log in</p>
        </div>

        <div className=" mt-4">
          <input className="m-2 rounded bg-gray-100 drop-shadow"
            type="text"
            value={formState.username}
            placeholder=" username"
            name="username"
            onChange={handleInput}
          />

          <input
            className="m-2 mt-4 rounded bg-gray-100 drop-shadow"
            type="password"
            value={formState.password}
            placeholder=" Password"
            name="password"
            onChange={handleInput}
          />
          {stateErrors.errors ? <div className="text-red">{stateErrors.errors[0]}</div> : null}
          <button className="rounded-sm mt-4 m-2 outline-2 text-lg w-48 outline outline-1 font-medium text-blue-600" type="submit">Continue</button>
        </div>
      </form>

    </div>
  )
}