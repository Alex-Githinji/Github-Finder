import React from 'react'
import { RiGitRepositoryFill } from "react-icons/ri";

function repository({repository}) {
  return (
    <div>
        <p> <RiGitRepositoryFill /> {repository}  repository</p>
    </div>
  )
}

export default repository