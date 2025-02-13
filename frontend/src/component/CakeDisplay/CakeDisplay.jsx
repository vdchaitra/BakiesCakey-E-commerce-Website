import React, { useContext } from 'react'
import './CakeDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import CakeItem from '../CakeItem/CakeItem'

const CakeDisplay = ({category}) => {
    const {cake_list}= useContext(StoreContext)
  return (
    <div className='cake_display' id='cake_display'>
      <div className='show'>
      <h2>Sweet Cakes</h2>
      </div>
      <div className="cake_display_list">
        {cake_list.map((item,index)=>{
          if(category==="All" || category===item.category){
            return <CakeItem key={index} id={item._id} name={item.name} kg={item.kg} description={item.description} price={item.price} image={item.image}/>
          }})}
      </div>
    </div>
  )
}

export default CakeDisplay