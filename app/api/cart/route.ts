import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const body=await request.json()
    const {productId,userId}=body

    try{
        const existingCart=await prisma.cart.findFirst({
            where:{
                productId:productId,
                userId:userId
            }
        })
        console.log("Existing Cart details:"+existingCart)
        if(existingCart)
        {
            await prisma.cart.delete({
                where:{
                    id:existingCart.id
                }
            })
        }
        const product=await prisma.cart.create({
            data:{
                productId,
                userId
            }
        })
        return NextResponse.json(product)
    }
    catch(error){
        console.log('error adding to the cart',error)
        return NextResponse.error()
    }
}


export async function DELETE(request:Request){
    const body=await request.json()
    const {productId,userId}=body

    try{
        const deleteCart=await prisma.cart.deleteMany({
            where:{
                productId:productId,
                userId:userId
            }
        })

        return NextResponse.json(deleteCart)
    }catch(error){
        console.log(error)
    }
}