import prisma from '@/app/prismadb'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request:Request){

    const body=await request.json()
    const {
        title,
        description,category,
        style,
        size,
        inventory,
        color,
        price,
        images,
        userId,
        store,
    }=body
    try{
      const product=await prisma.product.create({
        data:{
            title,
            description,
            category,
            style,
            size,
            inventory,
            color,
            price,
            images,
            userId,
            store,
        }
      })
      return NextResponse.json(product)
    }
    catch(error){
        return NextResponse.error()
    }

} 