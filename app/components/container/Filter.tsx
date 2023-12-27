'use client'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { BsChevronUp, BsSliders2Vertical } from 'react-icons/bs'


interface Props {
    
}

const Filter = (props: Props) => {

    const [showFilter , setShowFilter]=useState<boolean>(false)
    const [selectedCategories,setSlectedCategories]=useState<string[]>([])
    const [selectedSize,setSelectedSize]=useState<string[]>([])
    const [allHexValues,sethexValues]=useState<string[]>([])
    const [selectedHexValues,setSelectedHexValues]=useState<string[]>([])
    const [price,setPrice]=useState({min:0,max:100})


    const HandleMinChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value==="min"?parseInt(e.target.value):e.target.value;
        setPrice({...price,[e.target.name]:value})
    }

    const HandleMaxChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value==="max"?parseInt(e.target.value):e.target.value;
        setPrice({...price,[e.target.name]:value})
    }

    const toggleCategory=(category:string)=>{
        setSlectedCategories((prevCategories)=>
            prevCategories.includes(category)?
            prevCategories.filter((c)=>c!==category):[...prevCategories,category]
        )
    }

    const toggleSize=(size:string)=>{
        setSelectedSize((prevCategories)=>
            prevCategories.includes(size)?
            prevCategories.filter((c)=>c!==size):[...prevCategories,size]
        )
    }

    const toggleColor=(color:string)=>{
        setSelectedHexValues((prevCategories)=>
            prevCategories.includes(color)?
            prevCategories.filter((c)=>c!==color):[...prevCategories,color]
       )
    }


    const getAllColors=async()=>{
        try{
            const response=await axios.get('/api/color')
            return response.data
        }   
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllColors().then((allColors)=>{
            if(allColors){
                const hexSet=new Set<string>()
                allColors.forEach((element:any) => {
                    const colors=element.color.split(',')
                    colors.forEach((color:string) => {
                        const hexValue=color.replace("#","")
                        hexSet.add(hexValue)
                    });
                });

                const uniquehexValues:string []=Array.from(hexSet)
                sethexValues(uniquehexValues)
            }
        })
    },[])

    const allHexValue=allHexValues


    useEffect(() => {
     axios.get('/api/filterproduct',{
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
     })
     .catch((error)=>{
        console.log(error)
     })

    }, [])
    return (
        <div className='relative'>
            <div className={`md:w-[250px] border-l-[0.5px] ${showFilter? 'max-md:w-[250px]':'w-0 max-md:invisible'}`}>
                <div className='flex items justify-between px-5 py-4 border-b-[0.5px]'>
                    <h1 className='text-neutral-800'>Filters</h1>
                    <BsSliders2Vertical size={20} className='text-neutral-800'/>

                </div>
                <div className='flex flex-col py-3 text-sm text-neutral-600 border-b-[0.5px]'>
                    <span className={`py-3 px-5 ${selectedCategories.includes('Men')?"bg-purple-400":''}`} 
                    onClick={()=>toggleCategory('Men')}
                    >Men</span>

                    <span className={`py-3 px-5 ${selectedCategories.includes('Women')?"bg-purple-400":''}`} 
                    onClick={()=>toggleCategory('Women')}
                    >Women</span>
                </div>
                <div className='border-b-[0.5px] pb-10'>
                    <div className='flex justify-between items-center px-5 py-4 border-b-[0.5px] mb-5'>
                        <h1 className='text-neutral-800'>Prices</h1>
                        <BsChevronUp size={18}/>
                    </div>
                    <div className='grid grid-cols-2 gap-5 px-5 overflow-hidden'>
                        <div className='flex flex-col justify-center items-center'>
                            <label htmlFor='' className='text-[15px] opacity-75'>Min</label>
                            <div className='relative'>
                                <span className='absolute left-3 top-1 '>$</span>
                                <input id="" type='number' name='min' onChange={()=>HandleMinChange} value={price.min} className='w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]'></input>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <label htmlFor='' className='text-[15px] opacity-75'>Max</label>
                            <div className='relative'>
                                <span className='absolute left-3 top-1 '>$</span>
                                <input id="" type='number' name='min' onChange={()=>HandleMaxChange} value={price.max} className='w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]'></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b-[0.5px]'>
                    <div className='flex items-center justify-between py-4 border-b-[0.5px] mb-5'>
                    <h1 className='text-neutral-800'>Colors</h1>
                    </div>
                    <ul className='grid grid-cols-4 px-5 gap-5 mb-5'>
                         {
                            allHexValue.map((hexValue,i)=>{
                                return(
                                    <li key={i}
                                    className={`w-[40px] h-[40px] rounded-full border-[0.5px] border-neutral-300 cursor-pointer ${selectedHexValues.includes(`#${hexValue}`)?'shadow-2xl opacity-25':''}`}
                                    style={{backgroundColor:`#${hexValue}`}}
                                    onClick={()=>toggleColor(`#${hexValue}`)}
                                    >
                        
                                    </li>
                                )
                            })
                         }   
                    </ul>
                </div>
                <div className='sizes'>
                    <div className='flex items-center justify-between py-4 border-b-[0.5px] mb-5'>
                         <h1 className='text-neutral-800'>Sizes</h1>
                    </div>
                    <ul className='grid grid-cols-4 px-5 gap-5'>
                         <li
                         className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('S')?"bg-neutral-900 text-white":""}`}
                         onClick={()=>toggleSize('S')}
                         >
                            S
                         </li>
                         <li
                         className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('M')?"bg-neutral-900 text-white":""}`}
                         onClick={()=>toggleSize('M')}
                         >
                            M
                         </li>
                         <li
                         className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('L')?"bg-neutral-900 text-white":""}`}
                         onClick={()=>toggleSize('L')}
                         >
                            L
                         </li>
                         <li
                         className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('XL')?"bg-neutral-900 text-white":""}`}
                         onClick={()=>toggleSize('XL')}
                         >
                            XL
                         </li>
                         <li
                         className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('2XL')?"bg-neutral-900 text-white":""}`}
                         onClick={()=>toggleSize('2XL')}
                         >
                            2XL
                         </li>
                         <li
                         className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('3XL')?"bg-neutral-900 text-white":""}`}
                         onClick={()=>toggleSize('3XL')}
                         >
                            3XL
                         </li>
                    </ul>
                </div>
            </div>
            <div onClick={()=>setShowFilter(!showFilter)}
            className='absolute md:hidden top-[20px] right-[-42px] rotate-90 bg-gray-100 px-2 rounded-t-sm cursor-pointer'
            >Filters</div>
        </div>
    )
}

export default Filter
