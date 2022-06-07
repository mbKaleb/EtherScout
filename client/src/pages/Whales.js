import { PageStyles } from "../hooks/Styles"

export default function Whales() {
  return (
    <div className={PageStyles}>
      <div className='bg-white justify-center m-2 w-2/6 p-3 outline outline-1 rounded '>
        <h1 className='font-semibold p-2'>Whales and why you should Care</h1>
        <p>If you think about it they are just big bank accounts, so why track them? Because we can.
          When information becomes free to access it is our responsibility to asses its value and
          act accordingly. In the case of Ethereum all transactions on the mainnet are public are recorded.
           Currently the Kraken 13 wallet has ~$3,855,751,496 (usd), yes billion with a big B. The speed
           at which these funds can move with VERY LITTLE regulation contributes to cryptocurriencies volatility.
          While crypto is powerfull tool, it is equally dangerous.
        </p>
      </div>
    </div>
  )
}