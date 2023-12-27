'use client'
import React from 'react'
import axios from 'axios'
import { GrFormTrash } from 'react-icons/gr'
import { useRouter } from 'next/navigation'

interface Props {
    productId?:number
    userId?:number
}

const DeleteCart = (props: Props) => {
    const router=useRouter()
    const handleDelete=async()=>{
        try{
            await axios.delete('/api/cart',{
                data:{
                    productId:props.productId,
                    userId:props.userId
                }
            })

            router.refresh()
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='cursor-pointer' onClick={handleDelete}>
                <GrFormTrash className='text-red-500' size={20}/>
        </div>
    )
}

export default DeleteCart
