import React from 'react'
import AddHotel from './AddHotel'
import AddPark from './AddPark'
import AddRanger from './AddRanger'

function Dashboard({addPark, addHotel, addRanger}) {
  return (
    <>
    <AddHotel addHotel={addHotel}/>
    <AddPark addPark={addPark}/>
    <AddRanger addRanger={addRanger}/>
    </>
  )
}

export default Dashboard