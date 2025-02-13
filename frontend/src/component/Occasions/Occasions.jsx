import React from 'react'
import './Occasions.css'
import { Occasion_list } from '../../assets/assets'
const Occasions = ({category,setCategory}) => {
  return (
    <div className='occasions_menu' id='occasions_menu'>
        <h1>Cakes For Everyday Occasions</h1>
        <div className="occasion_menu_list">
        {Occasion_list.map((item,index)=>{
          return(
            <div  onClick={()=>setCategory(prev=>prev===item.occasion_name||"birthday"===item.occasion_name?"birthday":item.occasion_name)} key={index} className="explore_menu_list_item">
              
              <img className={category===item.occasion_name?"active":""} src={item.occasion_image} alt="menu" />
              <p>{item.occasion_name}</p>

            </div>
          )
        })}
        </div>
      
    </div>
  )
}

export default Occasions
