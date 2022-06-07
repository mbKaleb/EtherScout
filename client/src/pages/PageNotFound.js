import { PageStyles } from "../hooks/Styles"

export default function PageNotFound() {
  return (
    <div className={PageStyles+" text-bold"} >
        <h1 className="m-1">Error: 404</h1>
        <h2 className="m-1">Page Not Found</h2>
    </div>
  )
}