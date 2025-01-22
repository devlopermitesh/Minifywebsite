import Header from '@/components/Header'
import React from 'react'
import SearchInput from './SearchInput'

const Search = () => {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <Header className='from-bg-neutral-900'>
            <h1 className="text-white font-bold text-2xl ">Search</h1>
            </Header>
      <SearchInput/>
        </div>
  )
}

export default Search