import React from 'react'
import prisma from '@/app/prismadb'
import Edit from '../Edit'



interface Props {
    
}

const page = async({params}: {params:{slug:string}}) => {

    const productId=parseInt(params.slug,10)

    if(isNaN(productId)){
        return(
            <div>
                Invalid Product ID
            </div>
        )
    }

    try{
        const product=await prisma.product.findUnique({
            where:{
                id:productId
            }
        })

        if(!product){
            return(
                <div>
                    Product is not found
                </div>
            )
        }
        return(
            <div>
                <Edit {...product}/>
            </div>
        )
    }
    catch(error){
        console.log(error)
        return <div>Error fetching Product</div>
    }
}

export default page
