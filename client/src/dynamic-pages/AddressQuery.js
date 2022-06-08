import { useParams } from "react-router-dom"




export default function AddressQuery() {

  const { walletAddress } = useParams();



  return (
    <div className="justify-center rounded-1 bg-gray-400 p-2 w-screen min-w-max ">
      <div className="Address rounded-sm mx-12 font- bg-white drop-shadow p-2">{" Address: "+ walletAddress}</div>
      <div className="flex m-2 mx-12">

        <div className="grid-flex rounded-sm bg-white drop-shadow w-6/12 mr-2 p-4 ">
          <div className="mb-2 font-medium">Overview</div>
          <div className="flex border-b p-1"> <div className="grow">ETH Balance: </div>   <div >0.412 Ether</div> </div>
          <div className="flex border-b p-1"> <div className="grow">USD Est. Value: </div>   <div >$450.26 </div> </div>
          <div className="flex border-b p-1"> <div className="grow">Wallet Type</div>   <div >0.41235123 Ether</div> </div>
        </div>

        <div className="grid-flex rounded-sm bg-white drop-shadow w-6/12 ml-2 p-4">
          <div className="mb-2 font-medium min-w-fit">Ethereum Naming Service (ENS)</div>


          <div className="flex">

            <div className="w-6/12 m-1">
              <div className="border-b font-medium">Registrant</div>
              <div>Test</div>
            </div>

            <div className="w-6/12 m-1">
              <div className="border-b font-medium">Controller</div>
              <div>Test</div>
            </div>

          </div>
    
        </div>

      </div>
    </div>
  )
}














<div className='relative flex py-1 items-center'>
  <div className='flex-grow border-t border-gray-400'></div>
</div>




















