import React from 'react'
import Avatar from './Avatar'

const Users = () => {
  return (
    <div className='my-5 flex justify-between items-center'>
        <div className='flex justify-center items-center gap-4'>
            <Avatar />
            <p className="mb-0 text-2xl font-semibold">User 1</p>
        </div>
        <button className="border-solid border border-black bg-black  text-white px-4 py-2 rounded-lg text-xl font-bold ">
            Send Money
        </button>
    </div>
  )
}

export default Users