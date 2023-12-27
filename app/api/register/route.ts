import prisma from '../../prismadb'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req:Request){
    const body= await req.json()

    const {email,password,name}=body

    const hashedPassword=await bcrypt.hash(password,12)

    try{

        const user=await prisma.user.create({
            data:{
                name,email,password:hashedPassword
            }
        })
        return NextResponse.json(user)
    }
    catch{
        return NextResponse.error()
    }
}