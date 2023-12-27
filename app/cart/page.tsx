import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import Navbar from '../components/Navbar'
import AllCartProduct from '../components/AllCartProduct'
import AllPurchased from '../components/AllPurchased'

interface Props {
    
}

const page = async(props: Props) => {

    const session=await getServerSession(options)
    return (
        <>
            <div className='max-w-[1280px] mx-auto px-5'>
                <Navbar/>
                <AllCartProduct userId={session?.user?.id}/>
                <hr className='mt-10 mb-10'/>
            </div>   
        </>
    )
}

export default page
