'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Size from '../components/Size'
import Color from '../components/Color'
import Para from '../components/Para'
import ImageUpload from '../components/ImageUpload'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation'

interface Props {
    id:number
    title:string
    description:string
    category:string
    style:string
    store:string
    size:string
    inventory:number
    color:string
    price:number
    images:string
    userId:number
}

const Edit = ({id,title,description,category,style,inventory,price,color,size,userId,store,images}: Props) => {
    
    const Id=userId
    const router=useRouter()
    const [formData,setFormData]=useState({
        id:id,
        title:title,
        description:description,
        category:category,
        style:style,
        store:store,
        size:size,
        inventory:inventory,
        color:color,
        price:price,
        images:images,
        userId:userId
    })

    const [Description,setDescription]=useState<string>('')

    const [info,updateInfo]=useState<any>()
    const [imageUrl,setImageUrl]=useState<string[]>([])


    useEffect(()=>{
        if(formData.images){
            const imageUrlArray=formData.images.split(',')
            setImageUrl(imageUrlArray)
        }
    },[])

    const HandleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target

        setFormData({...formData,[name]:value})
    }


    const handleImageChange=()=>{
        const stringImages=JSON.stringify(imageUrl)
        setFormData({
            ...formData,
            images:stringImages,
            description:description,
            userId:id
        })
    }

    const HandlePriceChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.name==='price'?parseInt(e.target.value):parseInt(e.target.value)
        const inventory=e.target.name==='inventory'?parseInt(e.target.value):parseInt(e.target.value)
       

        setFormData({...formData,[e.target.name]:value,[e.target.name]:inventory})
    }

    useEffect(()=>{
        setFormData((prevFormData)=>({
            ...prevFormData,
            description:description,
            images:imageUrl.toString(),
            userId:id
        }))
    },[imageUrl])

    const updateData=async()=>{
        handleImageChange()
        try{
            const response=await axios.patch('/api/updateproduct',formData)
            router.push('/')
        }
        catch(error){
        console.log(error)
        }
    }
    

    return (
        <div className='px-5 max-w-6xl mx-auto mb-10'>
        <div>
             <Navbar/>
        </div>
        <h1 className='text-3xl font-semibold py-6'>Add your product</h1>
         <div className='text-black mt-4'>
             <div className='grid md:grid-cols-2 grid-col-1 gap-5'>
                 <div>
                     <label htmlFor='title' className='font-semibold'>Title</label>
                     <input
                     type='text'
                     className='w-full h-[50px] border-[1px] border-gray-300 rounded-lg focus:border-violet-500 px-3 focus:border-2 outline-none'
                     name='title'
                     value={formData.title}
                     onChange={(e)=>HandleChange(e)}
                     />
                 </div>
 
                 <div>
                     <label htmlFor='category' className='font-semibold'>Category</label>
                     <input
                     type='text'
                     className='w-full h-[50px] border-[1px] border-gray-300  rounded-lg focus:border-violet-500 px-3 focus:border-2 outline-none'
                     name='category'
                     value={formData.category}
                     onChange={(e)=>HandleChange(e)}
                     />
                 </div>
 
                 <div>
                     <label htmlFor='style' className='font-semibold'>Style</label>
                     <input
                     type='text'
                     className='w-full h-[50px] border-[1px] border-gray-300 rounded-lg focus:border-violet-500 px-3 focus:border-2 outline-none'
                     name='style'
                     value={formData.style}
                     onChange={(e)=>HandleChange(e)}
                     />
                 </div>
 
                 <div>
                     <label htmlFor='store' className='font-semibold'>Store</label>
                     <input
                     type='text'
                     className='w-full h-[50px] border-[1px] border-gray-300  rounded-lg focus:border-violet-500 px-3 focus:border-2 outline-none'
                     name='store'
                     value={formData.store}
                     onChange={(e)=>HandleChange(e)}
                     />
                 </div>
 
 
                 <div>
                     <label htmlFor='size' className='font-semibold'>Size</label>
                     <input
                     type='text'
                     className='w-full h-[50px] border-[1px] border-gray-300  rounded-lg focus:border-violet-500 px-3 focus:border-2 outline-none'
                     name='size'
                     value={formData.size}
                     onChange={(e)=>HandleChange(e)}
                     />
                     <Size setFormData={setFormData}/>
                 </div>
                 <div>
                     <label htmlFor='inventory' className='font-semibold'>Inventory</label>
                     <input
                     type='number'
                     className='w-full h-[50px] border-[1px] border-gray-300  rounded-lg focus:border-violet-500 px-3 focus:border-2 outline-none'
                     name='inventory'
                     value={formData.inventory}
                     onChange={(e)=>HandlePriceChange(e)}
                     />
                 </div>
 
                 <div>
                     <label htmlFor='price' className='font-semibold'>Price</label>
                     <input
                     type='number'
                     className='w-full h-[50px] border-[1px] border-gray-300  rounded-lg focus:border-violet-500 px-3 focus:border-2 outline-none'
                     name='price'
                     value={formData.price}
                     onChange={(e)=>HandlePriceChange(e)}
                     />
                 </div>
 
                 <div>
                     <div>
                         <label htmlFor='color' className='font-semibold'>Color</label>
                         <input
                         type='text'
                         className='w-full h-[50px] border-[1px] border-gray-300  rounded-lg focus:border-violet-500 px-3 focus:border-2 outline-none'
                         name='color'
                         value={formData.color}
                         onChange={(e)=>HandleChange(e)}
                         />
                     </div>
                     <Color setFormData={setFormData} Color={formData.color}/>
                 </div>
 
             </div>
             <label htmlFor='' className='mt-30 inline-block font-medium '>Description about your product</label>
             <Para setDescription={setDescription} description={formData.description}/>
             <label htmlFor='' className='mt-4 inline-block font-medium '>Upload Images</label>
             <ImageUpload info={info} updateInfo={updateInfo} imageUrls={imageUrl} setImageUrls={setImageUrl}
             handleImageChange={handleImageChange}
             />
 
             <button
             className='bg-purple-600 text-white p-2 px-4 rounded-lg mt-5'
             onClick={()=>updateData()}
             >Upload Product</button>
         </div>
     </div>
    )
}

export default Edit
