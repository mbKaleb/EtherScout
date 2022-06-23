import { PageStyles } from "../hooks/Styles"

export default function PageNotFound() {
  return (
    <div className='flex justify-center -z-50 -top-4 bg-gray-200 h-fit' >
      <div className="bg-white outline outline-1 rounded-sm min-w-md w-8/12 m-4 p-8 h-custom">
        <h1 className="m-1 text-lg">Error: 404</h1>
        <h2 className="m-1 text-md">Sorry!</h2>
        <h3>The page you were looking for does not exist or was moved.</h3>
      </div>
    </div>
  )
}