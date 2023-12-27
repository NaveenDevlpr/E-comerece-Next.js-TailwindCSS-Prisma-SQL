import React from 'react'
import {BiSearch} from 'react-icons/bi'
const SearchBar = () => {
  return (
    <div>
        <div className='flex items-center bg-zinc-200 p-[9px] rounded-full max-md:hidden gap-2'>
            <button><BiSearch size={20} className='opacity-40'/></button>
            <input type='text' className='outline-none bg-transparent caret-blue-400 placeholder:font-light placeholder:text-gray-600 text-[12px]'
            placeholder='search'
            autoComplete='false'
            ></input>
        </div>
    </div>
  )
}

export default SearchBar