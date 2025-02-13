import React, { useContext } from 'react'
import './OccasionsDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import CakeItem from '../CakeItem/CakeItem'
const OccasionsDisplay = ({category}) => {
    const {cake_list}=useContext(StoreContext)
  return (
    <div className='occasion_display' id='occasion_display'>
        <div className="view">
            <h2>Occasion cakes</h2>
        </div>
        <div className="cake_display_list">
            {cake_list.map((item,index)=>{
                if(category===item.occasion)
                    {
                        return < CakeItem key={index} id={item._id} name={item.name} kg={item.kg} description={item.description} price={item.price} image={item.image} />
                    }
            })}
        </div>
      
    </div>
  )
}

export default OccasionsDisplay
