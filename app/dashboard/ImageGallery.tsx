'use client'
import React, { useState } from 'react'

interface Props {
    imageUrls:string
}

const ImageGallery = ({imageUrls}:Props) => {
    const [selectImage,setSelectedImage]=useState<number>(0)
    const urlArray=imageUrls.split(',')
    return (
        <div className='images grid grid-cols-7'>
            <div className='all-images flex flex-col col-span-2 justify-center'>
                {
                    urlArray.map((url,index)=>{
                        return(
                            <div key={index} className='image relative rounded-lg '>
                                <img src={url} onClick={()=>setSelectedImage(index)}
                                className={`w-[70px] h-[70px] rounded-lg mb-3  p-1 object-cover object-top ${selectImage===index?"border-[10px] border-purple-500":"border-[1px] border-purple-200"}`}
                                alt=''
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className='selected-image col-span-5'>
                <img src={urlArray[selectImage]} alt='' className='h-[600px] w-auto object-cover object-top'></img>
            </div>
        </div>
    )
}

export default ImageGallery
