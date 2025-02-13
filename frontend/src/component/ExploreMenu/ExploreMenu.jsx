import react from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='exploremenu' id='exploremenu'>
      <h1>our menu</h1>
      <div className="explore_menu_list">
        {menu_list.map((item,index)=>{
          return(
            <div  onClick={()=>setCategory(prev=>prev===item.menu_name||"all cakes"===item.menu_name?"All":item.menu_name)} key={index} className="explore_menu_list_item">
              
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="menu" />
              <p>{item.menu_name}</p>

            </div>
          )
        })}
      </div>
      <hr/>
    </div>
  )
}

export default ExploreMenu
