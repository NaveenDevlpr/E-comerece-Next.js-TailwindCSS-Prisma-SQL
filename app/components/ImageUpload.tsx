'use client'

import { CldUploadWidget } from 'next-cloudinary'
import React,{useState,useEffect} from 'react'

interface Props {
    info:any,
    updateInfo:React.Dispatch<React.SetStateAction<any>>,
    imageUrls:string[],
    setImageUrls:React.Dispatch<React.SetStateAction<string[]>>
    handleImageChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
}

const ImageUpload:React.FC<Props> = ({info,updateInfo,imageUrls,setImageUrls,handleImageChange}) => {

    const upload=(result:any)=>{
        updateInfo(result.info.secure_url)
        const newImageUrl=result.info.secure_url
        setImageUrls(preImageUrls=>[...preImageUrls,newImageUrl])
        handleImageChange(result)

    }

    const handleDeleteImage=(index:number)=>{
        setImageUrls((prevImageUrls)=>{
            const updateImageUrls=[...prevImageUrls]
            updateImageUrls.splice(index,1)
            return updateImageUrls
        })
    }
    return (
        <div>
            <div className='mb-10 '>
                <CldUploadWidget uploadPreset='gwzzks01' onUpload={upload}>
                {({open}:any)=>{
                        function handleOnClicked(e:React.MouseEvent<HTMLButtonElement>){
                            e.preventDefault()
                            open()
                        }
                        return (
                            <button className='border-[1px] rounded-lg p-2 bg-gray-800 text-white px-4 text-[14px] mt-4'
                            onClick={handleOnClicked}
                            >
                                Upload
                            </button>
                        )
                    }}
                </CldUploadWidget>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                    {
                        imageUrls.map((e,index)=>{
                            return(
                                <div key={index} className='flex flex-col justify-center'>
                                    <img src={e}
                                    className='w-[250px] h-[250px] object-center object-top'
                                    alt='uploaded images'
                                    ></img>
                                    <button className='border-[1px] rounded-lg px-2 p-2 mt-5 text-[14px] bg-gray-800 text-white'
                                    onClick={()=>handleDeleteImage(index)}
                                    >delete</button>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default ImageUpload
