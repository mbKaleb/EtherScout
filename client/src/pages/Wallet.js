import { useParams } from "react-router-dom"

function Wallet() {

    //Hook Assignment
    let params = useParams()

  return (
    <div>{params}</div>
  )
}

export default Wallet