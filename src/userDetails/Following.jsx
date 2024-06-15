import React from 'react'
import { IoIosPeople } from "react-icons/io";

function Following({Following}) {
  return (
    <div>
        <p><IoIosPeople /> {Following} following</p>
    </div>
  )
}

export default Following