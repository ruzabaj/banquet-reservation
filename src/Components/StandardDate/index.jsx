import React from 'react'

const StandardDate = ({date}) => {
    const standardFormat= new Date(date).toISOString().substring(0,10)
  return (
    <p>{standardFormat}</p>
  )
}

export default StandardDate