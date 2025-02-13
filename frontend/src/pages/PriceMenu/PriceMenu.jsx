import React, { useState } from 'react'
import './PriceMenu.css'
import PriceDisplay from '../../component/PriceDisplay/PriceDisplay'
import Price from '../../component/Price/Price'

const PriceMenu = () => {
    const [category,setCategory]=useState(600)
    console.log(category)
  return (
    
    <div className='this'>

        <Price category={category} setCategory={setCategory}/>
        <PriceDisplay category={category} setCategory={setCategory}/>
        
      
    </div>
  )
}

export default PriceMenu
