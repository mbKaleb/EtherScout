export default function Technologies() {

  const containerStyles = "p-4 w-fit"
  const titleStyles = "text-lg border-b font-medium"
  const h3Styles = "mb-1 font-light"
  const textContent = "ml-4"

  return (
    <div className='flex justify-center -z-50 -top-4 bg-gray-200 h-fit'>
      <div className="bg-white outline outline-1 rounded-sm min-w-md w-8/12 m-4 p-8 h-custom ">

        <div className="border-b text-xl  ">Technologies</div>
        <div className="mb-4 ml-1" >The libraries, frameworks and APIs utilzied in this project. </div>

        <div className={containerStyles} >
          <h2 className={titleStyles} >Ethers.js</h2>
          <h3 className={h3Styles} >Key managment, connect to nodes, develop on blockchain</h3>
          <p className={textContent} >
            Ethers is a library that "...aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem."
            -ether docs. Why Ethers? Ethers solves many issues, in the same way a terminal translates english to the binary cpu/ components, 
            the ethers library normalizes data from Ethereum API calls and DAPP RPCs, ENS resolvers, and much more.
          </p>
        </div>

        <div className={containerStyles} >
          <h2 className={titleStyles} >Etherscan API</h2>
          <h3 className={h3Styles} > Scan blockchain data, Read transactions, Track movement </h3>
          <p className={textContent} >
            The Etherscan API is very broad and primarily focuses on addresses and transactions, but my also read data from DAPPS (Decentralized Apps) like the ENS (Ethereum Name Service).
          </p>
        </div>

        <div className={containerStyles} >
          <h2 className={titleStyles} > Tailwind CSS, library  </h2>
          <h3 className={h3Styles} >"A utility-first" CSS framework" -tailwindcss docs.</h3>
          <p className={textContent} >
            The Tailwind css framework and methodology is makes developing attractive sites not only easy but also enjoyable. The ease of writing inline styles is great, and making custom styles for special cases is very easy. 
          </p>
        </div>

        <div className={containerStyles} >
          <h2 className={titleStyles} >React, library</h2>
          <h3 className={h3Styles} > React v17+, React Router 6, React-icons </h3>
          <p className={textContent} >
            React is a library that gives us powerful state managment, with its flaws it is still a great tool for fast and professional development. 
            My experience with react has been a bumpy ride.
            Learning the flow of data through an app was difficult, now I can easily develop with React and its tools.
          </p>
        </div>

      </div>
    </div>
  )
}