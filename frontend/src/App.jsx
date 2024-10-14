import { Fragment } from "react"
import Avatar from "./components/Avatar"
import Users from "./components/Users"

function App() {

  return (
    <Fragment>
    <div className="mx-16">
      <div className="flex justify-between items-center mt-4">
        <div>
          <h1 className="text-4xl font-bold">Payments APP</h1>
        </div>
        <div className="flex items-center justify-center gap-4 ">
          <p className="mb-0 text-2xl font-semibold">Hello, User</p>
          <Avatar/>
        </div>
      </div>
    </div>
      <hr className="my-6"/>
      <div className="mx-16">

          <h1 className="text-3xl font-bold">Balance $5000</h1>
          <div className="user-container">
          <h1 className="text-3xl font-bold mt-7 mb-5">Users</h1>
          <input type="text" placeholder="Search users..." className="mb-6 block w-full rounded-md border-0 px-5 lg:text-xl outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xl h-14 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
 />
          <Users/>
          <Users/>
          <Users/>
          <Users/>
          </div>
      </div>
    </Fragment>
  )
}

export default App
