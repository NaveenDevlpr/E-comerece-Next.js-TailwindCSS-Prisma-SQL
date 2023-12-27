'use client'

import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { signIn,signOut,useSession } from 'next-auth/react'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation'
import { ReactLoadableManifest } from 'next/dist/server/load-components'
import Size from '../components/Size'
import Color from '../components/Color'
import Para from '../components/Para'
import ImageUpload from '../components/ImageUpload'
const ProductForm = () => {

    const {data:session}=useSession()
    const id=session?.user.id
    const router=useRouter()

    const[formData,setFormData]=useState({
        title:'',
        description:`<div>
        <p>Enter your text here.....</p>
        </div>`,
        category:'',
        style:'',
        size:'',
        inventory:0,
        color:'#fe345e',
        price:0,
        images:'',
        userId:id,
        store:''

    })

    const [description,setDescription]=useState<string>('')

    const [info,updateInfo]=useState<any>()
    const [imageUrl,setImageUrl]=useState<string[]>([])

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

   /* useEffect(()=>{
        console.log(formData.images)
        console.log(formData)
    },[formData])*/

    useEffect(()=>{
        setFormData((prevFormData)=>({
            ...prevFormData,
            description:description,
            images:imageUrl.toString(),
            userId:id
        }))
    },[imageUrl])


    const postData=async()=>{
        handleImageChange()
        try{
            const response=await fetch('/api/addproduct',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            router.push('/')
            console.log(response)
        }
        catch(error){
            
            console.log(error)
        }
    }

    const HandlePriceChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.name==='price'?parseInt(e.target.value):parseInt(e.target.value)
        const inventory=e.target.name==='inventory'?parseInt(e.target.value):parseInt(e.target.value)
       

        setFormData({...formData,[e.target.name]:value,[e.target.name]:inventory})
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
            onClick={()=>postData()}
            >Upload Product</button>
        </div>
    </div>
  )
}

export default ProductForm