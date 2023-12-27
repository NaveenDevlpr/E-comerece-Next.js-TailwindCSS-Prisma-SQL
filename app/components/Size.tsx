'use client'

import React,{useState} from 'react'


interface PararProps{
    setFormData:React.Dispatch<React.SetStateAction<any>>
}
const Size:React.FC<PararProps> = ({setFormData}) => {

    const [selectedSizes,setSelectedSizes]=useState<string[]>([])
    const sizes=["XS","S","M","L","XL","2XL","3XL"]

    const handleSizeButtonClick=(size:string)=>{
        setSelectedSizes((prevSelectedSizes)=>{
            
            if(prevSelectedSizes.includes(size)){
                return prevSelectedSizes.filter((s)=>s!==size)
            }
            else{
                return [...prevSelectedSizes,size]
            }
        })
    }

    const HandleSubmit=()=>{
        setFormData((prevFormData:FormData)=>({
            ...prevFormData,
            size:selectedSizes.join(',')
        }))
    }
  return (
    <div>
        {
            sizes.map((size: string)=>{
                return(
                    <button key={size}
                    className={`border-[0.5px] rounded-lg text-center text-[14px] py-[6px] border-gray-300 cursor-pointer px-3 mt-4 mr-5 ${Array.isArray(selectedSizes)&&selectedSizes.includes(size) ? 'bg-purple-600 text-white':''}`}
                    onClick={()=>handleSizeButtonClick(size)}
                    >
                        {size}
                    </button>
                )
            })
        }
        <button type='submit' className='bg-gray-800 py-[6px] px-4  rounded-lg text-white text-[14px]' onClick={()=>HandleSubmit()}>submit</button>
    </div>
  )
}

export default Size