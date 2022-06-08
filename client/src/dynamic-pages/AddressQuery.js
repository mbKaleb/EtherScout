import { useParams } from "react-router-dom"



export default function AddressQuery() {

  const { walletAddress } = useParams();
  console.log(walletAddress)


  return (
    <div className="">{walletAddress} Test</div>
  )
}



































