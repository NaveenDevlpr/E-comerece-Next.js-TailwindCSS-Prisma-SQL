import React from 'react'
import {AiOutlineHeart} from 'react-icons/ai'
import Link from 'next/link'
import prisma from '@/app/prismadb'


interface Props {
    
}

const Item=async(props:Props)=>{
    const products= await prisma.product.findMany({})
    if(products.length===0){
        return(
            <div>
                Empty
            </div>
        )
    }
    return(
        <div>
            <h1 className='py-3 text-2xl font-semibold'>Clothing</h1>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12'>
                {
                    products.map((product)=>{
                        return(
                            <div key={product.id}>
                                <Link href={`/dashboard/${product.id}`}>
                                    <div className='relative rounded-lg'>
                                        <img src={product.images.split(',')[0]}
                                        className='w-[250px] h-[250px] object-cover object-top rounded-lg ' alt=''
                                        ></img>
                                    </div>
                                    <div className='flex items-center justify-between mt-4'>
                                        <div>
                                            <h1
                                             className='text-[14px] font-semibold max-w-[150px] whitespace-nowrap overflow-hidden'
                                            >{product.title}</h1>

                                            <p className='text-[13px] opcaity-60'>
                                                {product.store}
                                            </p>
                                        </div>
                                        <span
                                        className='px-2 font-medium bg-gray-100 rounded-lg'
                                        >Rs. {product.price}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Item
