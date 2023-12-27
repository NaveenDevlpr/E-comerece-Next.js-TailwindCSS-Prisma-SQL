'use client'
import React,{useState,useEffect} from 'react'
import ColorPicker from 'react-pick-color'
import {GrAdd} from 'react-icons/gr'

interface Props {
    setFormData:React.Dispatch<React.SetStateAction<any>>
    Color:string
}

const Color:React.FC<Props>=({setFormData,Color}) => {

    const [color,setColor]=useState('#fff')
    const [open,setOpen]=useState<boolean>()
    const colorArray:string[]=Color.split(',')
    const [selectedColors,setSelectedColors]=useState<string[]>(colorArray)

    if(colorArray.length<0){
        setSelectedColors([])
    }

    const handleColorButton=()=>{
        setSelectedColors((prevSelectedColors)=>[...prevSelectedColors,color])
        setOpen(false)
    }

    useEffect(() => {
        const handleSelectedColors=()=>{
            setFormData((prevFormData:FormData)=>({
                ...prevFormData,
                color:selectedColors.join(',')
            }))
        }
        handleSelectedColors()
})

    const handleDeleteColor=(indexToDelete:number)=>{
        setSelectedColors((prevSelectedColor)=>{
            const updateColor=[...prevSelectedColor];
            updateColor.splice(indexToDelete,1)
            return updateColor
        })
    }
    return (
        <div>
            <div className='flex items-center justify-between mt-3'>
                <button className='block border-[1px] rounded-lg px-3 p-2 bg-gray-800 text-white text-[14px]'
                onClick={()=>setOpen(!open)}
                >
                    Choose Color
                </button>
                {
                    open &&(
                        <ColorPicker color={color}
                        onChange={(color)=>setColor(color.hex)}
                        />
                    )
                }
                <button className='flex items-center space-x-1 border-[1px] rounded-lg p-2 bg-gray-800 text-white px-3 text-[14px]'
                onClick={()=>handleColorButton()}
                >
                    Add<GrAdd className='ml-2' size={16}/>
                </button>
            </div>
            <div className='mt-5'>
                    {
                        selectedColors.map((color,index)=>{
                            return(
                                <div key={index} className='flex items-center space-x-4 mb-2'>
                                    <div style={{
                                        width:'40px',
                                        height:'40px',
                                        borderRadius:'100%',
                                        backgroundColor:color,
                                        display:'inline-block'
                                    }}>
                                    </div>
                                    <span className='border-[1px] rounded-lg p-1 px-3 text-[14px]'>{color}</span>
                                    <button className='border-[1px] rounded-lg p-1 px-3 text-[14px] bg-gray-800 text-white'
                                    onClick={()=>handleDeleteColor(index)}
                                    >Delete</button>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default Color
