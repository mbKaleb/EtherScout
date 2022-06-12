import { PageStyles } from "../hooks/Styles"



export default function Technologies() {

  const containerStyles = "p-4 w-fit"
  const titleStyles = "text-lg border-b font-medium"
  const h3Styles = "mb-1 font-light"
  const textContent = "mb-6 ml-4"

  return (
    <div className='flex justify-center -z-50 -top-4 bg-gray-200 h-screen'>
      <div className="bg-white outline outline-1 rounded-sm min-w-md w-8/12 m-4 p-8 h-custom ">

        <div className=" border-b text-xl  ">Technologies</div>
        <div className="mb-4 ml-1" >The libraries, frameworks and APIs utilzied in this project. </div>

        <div className={containerStyles} >
          <h2 className={titleStyles} >Ethers.js</h2>
          <h3 className={h3Styles} > React v17+, React Router 6, React-icons </h3>
          <p className={textContent} >
            
          </p>
        </div>

        <div className={containerStyles} >
          <h2 className={titleStyles} >React</h2>
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