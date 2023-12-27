import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request:Request){
const body=await request.json()
const {id,title,description,category,style,size,inventory,store,color,price,images,userId}=body


try{
    const updateProduct=await prisma.product.update({
        where:{
            id:id
        },
        data:{
            id,
            title,
            description,
            category,
            style,
            size,
            inventory,
            store,
            color,
            price,
            images,
            userId
        }
    })

    return NextResponse.json(updateProduct)
}catch(error){
    return NextResponse.error()
}
}