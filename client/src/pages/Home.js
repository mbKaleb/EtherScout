
//React Imports
import { useOutletContext } from "react-router-dom"

//Component Imports
import ContentPreview1 from "../components/ContentPreview1"

//Styles
import { PageStyles } from "../hooks/Styles"


export default function Home() {

  //Local State
  const [currentUser, currentEthPrice] = useOutletContext();


  return (
    <div className={PageStyles}>
      <ContentPreview1 currentUser={currentUser} currentEthPrice={currentEthPrice}/>
    </div>
  )
}