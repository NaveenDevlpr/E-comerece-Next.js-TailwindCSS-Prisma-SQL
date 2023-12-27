'use client'

import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CiShoppingCart,CiCreditCard1 } from 'react-icons/ci'

interface Props {
    productId:number
}

const AddCart = ({productId}: Props) => {
    const {data:session}=useSession()
    const id=session?.user.id
    const router=useRouter()


    const handleCart=async()=>{
        if(session?.user){
        try{
            const response=await axios.post('/api/cart',{
                productId:productId,
                userId:id
            })
            .then((response)=>{
                console.log(response.data)
                router.push('/cart')
            })
        }
        catch(error){
            console.log("error"+':'+error)
        }
    }
    else{
        router.push('/signin')
    }
    }
   
        return(
            <div className='flex items-center space-x-4 bg-purple-600 text-white px-6 rounded-full p-2 cursor-pointer'
            onClick={handleCart}
            >
                <span>
                    <CiShoppingCart size={24}/>
                </span>
                <span className='text-sm'>
                    Add to Cart
                </span>
            </div>
        )
    

  
}

export default AddCart
