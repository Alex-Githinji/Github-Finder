import React from 'react'
import { CiLocationOn } from "react-icons/ci";


function Location({location}) {
  return (
    <div>
        <p><CiLocationOn /> {location} </p>
    </div>
  )
}

export default Location