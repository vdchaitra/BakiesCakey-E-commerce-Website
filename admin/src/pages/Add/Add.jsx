import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {
    
    const [image,setImage] = useState(false)
    const [data,setData] =useState({
        name:"",
        kg:"",
        price:"",
        description:"",
        category:"chocolate",
        occasion:"birthday",

    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const onSubmitHandler =async(event) =>{
        event.preventDefault();
        const formData=new FormData();
        formData.append("name",data.name)
        formData.append("kg",data.kg)
        formData.append("price",Number(data.price))
        formData.append("description",data.description)
        formData.append("category",data.category)
        formData.append("occasion",data.occasion)
        formData.append("image",image)
        const response = await axios.post(`${url}/api/cake/add`,formData)
        if(response.data.success)
            {
                setData({
                    name:"",
                    kg:"",
                    price:"",
                    description:"",
                    category:"chocolate",
                    occasion:"birthday",
                })
                setImage(false)
                toast.success(response.data.message)
            }
        else{
            toast.error(response.data.message)
            }
            
    }

 
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
    
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='type here' />

            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here' id=""></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler}  name="category" >
                        <option value="chocolate">chocolate</option>
                        <option value="vanilla">vanilla</option>
                        <option value="butterscotch">butterscotch</option>
                        <option value="strawberry">strawberry</option>
                        <option value="pineapple">pineapple</option>
                        <option value="red velvet">red velvet</option>
                        <option value="truffle">truffle</option>
                        <option value="choco delight">choco delight</option>
                        <option value="darkforest">darkforest</option>
                        <option value="whiteforest">whiteforest</option>
                        <option value="blueberry">blueberry</option>
                    </select>
                </div>
                <div className="add-occasion flex-col">
                    <p>Product Occasion</p>
                    <select onChange={onChangeHandler}  name="occasion" >
                        <option value="birthday">birthday</option>
                        <option value="anniversary">anniversary</option>
                        <option value="housewarming">housewarming</option>
                        <option value="engagement">engagement</option>
                        <option value="wedding">wedding</option>
                        <option value="baby show">baby show</option>
                    </select>
                </div>
                <div className="add-kg flex-col">
                    <p>Product kg</p>
                    <input onChange={onChangeHandler} value={data.kg} type="text" name='kg' placeholder='half kg' />
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number"  name='price' placeholder='00' />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
      
    </div>
  )
}

export default Add
