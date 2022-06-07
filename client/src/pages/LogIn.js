import LogInForm from "../components/LogInForm"

//Styles 
import { PageStyles } from "../hooks/Styles"

export default function LogIn({setCurrentUser}) {
  return (
    <div className={PageStyles}>
        <LogInForm setCurrentUser={setCurrentUser}/>
    </div>
  )
}