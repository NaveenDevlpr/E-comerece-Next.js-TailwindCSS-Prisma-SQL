import type { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import prisma from '../../../prismadb'
import bcrypt from 'bcrypt'


export const options:NextAuthOptions={
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{
                    label:'email',
                    type:'email',
                    palceholder:'your email'
                },
                password:{
                    label:'password',
                    type:'password',
                    palceholder:'your password'
                }

            },
            async authorize(credentials){
               
                if(!credentials?.email || !credentials.password){
                    throw new Error('invalid credentials')
                }

                const user=await prisma.user.findUnique({where:{
                    email:credentials.email
                }})
                if(!user || !user.password){
                    throw new Error('User Not Found')
                }
                const isCorrectPassword=await bcrypt.compare(credentials.password,user.password)
                if(!isCorrectPassword){
                    throw new Error('Invalid Password')
                }

                return user
            }
        })
    ],
    pages:{
       signIn:'/signin',
       //error:'/signin'
    },
    callbacks:{
        session:async({session,token,user})=>{
                if(session.user){
                   session.user.id=token.uid
                }
                return session
        },
        jwt: async({user,token})=>{
            if(user){
                token.uid=user.id
            }
            return token
        }
    },
    session:{
        strategy:'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET,
    debug:process.env.NODE_ENV==='development'
}