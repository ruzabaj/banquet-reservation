import React from 'react'

const Error = ({messageName, errorMessage}) => {
  return (
    <p className={messageName}>{errorMessage}</p>
  )
}

export default Error