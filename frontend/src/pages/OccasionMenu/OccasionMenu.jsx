import React, { useState } from 'react'
import './OccasionMenu.css'
import Occasions from '../../component/Occasions/Occasions'
import OccasionsDisplay from '../../component/OccasionsDisplay/OccasionsDisplay'
const OccasionMenu = () => {
    const [category,setCategory]=useState("birthday")
  return (
    <div className='this'>
        <Occasions category={category} setCategory={setCategory}/>
        <OccasionsDisplay category={category}/>
      
    </div>
  )
}

export default OccasionMenu
