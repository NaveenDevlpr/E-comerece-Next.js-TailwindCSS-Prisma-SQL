'use client'
import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Link from 'next/link'
import Filter from './Filter'

interface Props {
    
}

const Page = (props: Props) => {

   
    const [selectedCategories,setSlectedCategories]=useState<string[]>([])
    const [selectedSize,setSelectedSize]=useState<string[]>([])
    const [allHexValues,setAllhexValues]=useState<string[]>([])
    const [selectedHexValues,setSelectedHexValues]=useState<string[]>([])
    const [price,setPrice]=useState({min:0,max:100})

    const [response ,setResponse]=useState<any[]>()

    useEffect(() => {
        const fetchData=async()=>{
            try{
                const response=await axios.get('/api/filterproduct',{
                    params:{
                        categories:selectedCategories,
                        size: selectedSize,
                        price:{
                            min:price.min,
                            max:price.max
                        },
                        colors:selectedHexValues
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                 }).then((response)=>{
                    console.log(response)
                    setResponse(response.data)
                 })
                 .catch((error)=>{
                    console.log(error)
                 })
            }
            catch(error){
                console.log(error)
            }
            
        }
        fetchData()
    }, [selectedCategories,selectedHexValues,selectedSize,price])
    return (
        <div className='px-5 max-w-[1280px] mx-auto'>
            <div>
                <Navbar/>
            </div>
            <hr/>
            <div className='flex'>
                <div>
                    <Filter
                    
                    selectedCategories={selectedCategories}
                    setSlectedCategories={setSlectedCategories}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    allHexValues={allHexValues}
                    setAllHexValues={setAllhexValues}
                    selectedAllHexValues={selectedHexValues}
                    setSelectedAllHexValues={setSelectedHexValues}
                    price={price}
                    setPrice={setPrice}
                    />
                </div>
                <div className='px-10'>
                    <h1 className='py-3 text-4xl font-medium'>Filtered Clothings</h1>
                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12 mt-5'>
                        {
                            response?.map((product)=>{
                                return(
                                    <div key={product.id}>
                                        <Link href={`dashboard/${product.id}`}>
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
            </div>
        </div>
    )
}
export default Page
