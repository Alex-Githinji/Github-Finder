import React from 'react'
import { IoIosPeople } from "react-icons/io";

function Followers({Followers}) {
  return (
    <div >
        <p> <IoIosPeople/> {Followers} followers</p>
    </div>
  )
}

export default Followers