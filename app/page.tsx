import Image from 'next/image'
import Navbar from './components/Navbar'
import { getCurrentUser } from './lib/session'
import Container from './components/container/Container'
export default async function Home() {
  const user=await getCurrentUser()
  return (
    <div className='px-4 max-w-6xl mx-auto'>
        <Navbar/>
        <hr/>
        <Container/>
    </div>
  )
}
